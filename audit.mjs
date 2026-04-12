#!/usr/bin/env node
/**
 * audit.mjs — validate all team JSON files in data/teams/
 *
 * Usage:
 *   node audit.mjs              audit all teams, print report
 *   node audit.mjs brazil       audit a single team
 *   node audit.mjs --json       output machine-readable JSON
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const TEAMS_DIR = path.join(__dir, 'data/teams')
const jsonMode = process.argv.includes('--json')
const targetSlug = process.argv.slice(2).find(a => !a.startsWith('-'))

// ── Rules ────────────────────────────────────────────────────────────────────

const REQUIRED_FIELDS = [
  'meta.slug',
  'meta.generated',
  'team.name_zh',
  'team.name_en',
  'team.flag_emoji',
  'team.federation',
  'team.fifa_rank',
  'team.colors.primary',
  'team.colors.secondary',
  'team.colors.accent',
  'country.capital',
  'country.population_zh',
  'country.population_en',
  'country.language_zh',
  'country.language_en',
  'country.continent_zh',
  'country.continent_en',
  'country.desc_zh',
  'country.desc_en',
  'country.football_desc_zh',
  'country.football_desc_en',
  'world_cup.titles',
  'world_cup.appearances',
  'world_cup.best_result_zh',
  'world_cup.best_result_en',
  'world_cup.history',
  'squad_2026.coach.name_zh',
  'squad_2026.coach.name_en',
  'squad_2026.players',
  'legends',
  'rivalries',
  'fun_facts',
]

const THRESHOLDS = {
  'squad_2026.players': { min: 20, label: 'players in squad' },
  'legends':            { min: 3,  label: 'legends' },
  'rivalries':          { min: 2,  label: 'rivalries' },
  'fun_facts':          { min: 3,  label: 'fun facts' },
  'world_cup.history':  { min: 1,  label: 'WC history entries' },
}

const MIN_TEXT_LENGTH = 40  // minimum chars for narrative fields

const NARRATIVE_FIELDS = [
  'country.desc_zh',
  'country.desc_en',
  'country.football_desc_zh',
  'country.football_desc_en',
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function get(obj, dotPath) {
  return dotPath.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
}

function hasCurlyQuotes(str) {
  return /[\u201c\u201d\u2018\u2019]/.test(str)
}

function checkCurlyQuotes(obj, path = '') {
  const issues = []
  if (typeof obj === 'string') {
    if (hasCurlyQuotes(obj)) issues.push(`curly quotes in field "${path}"`)
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => issues.push(...checkCurlyQuotes(v, `${path}[${i}]`)))
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      issues.push(...checkCurlyQuotes(v, path ? `${path}.${k}` : k))
    }
  }
  return issues
}

// ── Audit a single file ──────────────────────────────────────────────────────

function auditFile(filePath) {
  const filename = path.basename(filePath)
  const errors = []
  const warnings = []

  // Parse
  let data
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (e) {
    return { slug: filename.replace('.json', ''), errors: [`Invalid JSON: ${e.message}`], warnings: [], score: 0 }
  }

  // Required fields
  for (const field of REQUIRED_FIELDS) {
    const val = get(data, field)
    if (val == null || val === '') {
      errors.push(`Missing required field: ${field}`)
    }
  }

  // Array minimums
  for (const [field, rule] of Object.entries(THRESHOLDS)) {
    const val = get(data, field)
    if (Array.isArray(val) && val.length < rule.min) {
      warnings.push(`Only ${val.length} ${rule.label} (minimum ${rule.min})`)
    }
  }

  // Thin narrative text
  for (const field of NARRATIVE_FIELDS) {
    const val = get(data, field)
    if (typeof val === 'string' && val.length < MIN_TEXT_LENGTH) {
      warnings.push(`Thin text in ${field} (${val.length} chars, want ${MIN_TEXT_LENGTH}+)`)
    }
  }

  // Curly quotes
  const curlyIssues = checkCurlyQuotes(data)
  errors.push(...curlyIssues)

  // Player position coverage
  const players = get(data, 'squad_2026.players') || []
  const positions = new Set(players.map(p => p.position))
  for (const pos of ['GK', 'DEF', 'MID', 'FWD']) {
    if (!positions.has(pos)) warnings.push(`No ${pos} in squad`)
  }

  // Legend bios thin?
  const legends = data.legends || []
  legends.forEach((l, i) => {
    if ((l.bio_zh || '').length < MIN_TEXT_LENGTH) warnings.push(`Legend #${i + 1} bio_zh too short`)
    if ((l.bio_en || '').length < MIN_TEXT_LENGTH) warnings.push(`Legend #${i + 1} bio_en too short`)
  })

  // Slug matches filename
  if (data.meta?.slug && data.meta.slug !== filename.replace('.json', '')) {
    warnings.push(`meta.slug "${data.meta.slug}" doesn't match filename "${filename}"`)
  }

  const score = errors.length === 0 && warnings.length === 0 ? 100
    : Math.max(0, 100 - errors.length * 20 - warnings.length * 5)

  return {
    slug: data.meta?.slug || filename.replace('.json', ''),
    name_en: data.team?.name_en || filename,
    errors,
    warnings,
    score,
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

const files = fs.readdirSync(TEAMS_DIR)
  .filter(f => f.endsWith('.json') && f !== 'index.json')
  .filter(f => !targetSlug || f === `${targetSlug}.json`)
  .map(f => path.join(TEAMS_DIR, f))

if (files.length === 0) {
  console.log(targetSlug
    ? `No file found: data/teams/${targetSlug}.json`
    : 'No JSON files in data/teams/')
  process.exit(1)
}

const results = files.map(auditFile)

if (jsonMode) {
  console.log(JSON.stringify(results, null, 2))
  process.exit(0)
}

// ── Text report ──────────────────────────────────────────────────────────────

const pass = results.filter(r => r.errors.length === 0 && r.warnings.length === 0)
const warn = results.filter(r => r.errors.length === 0 && r.warnings.length > 0)
const fail = results.filter(r => r.errors.length > 0)

console.log('\n=== World Cup JSON Audit ===\n')
console.log(`Teams audited : ${results.length}`)
console.log(`  ✅ Clean    : ${pass.length}`)
console.log(`  ⚠️  Warnings : ${warn.length}`)
console.log(`  ❌ Errors   : ${fail.length}`)
console.log()

if (fail.length > 0) {
  console.log('── ERRORS (must fix) ──────────────────────────────')
  for (const r of fail) {
    console.log(`\n❌ ${r.name_en} (${r.slug}.json)`)
    r.errors.forEach(e => console.log(`   • ${e}`))
  }
  console.log()
}

if (warn.length > 0) {
  console.log('── WARNINGS (should fix) ──────────────────────────')
  for (const r of warn) {
    console.log(`\n⚠️  ${r.name_en} (${r.slug}.json)`)
    r.warnings.forEach(w => console.log(`   • ${w}`))
  }
  console.log()
}

if (pass.length > 0 && (fail.length > 0 || warn.length > 0)) {
  console.log('── CLEAN ──────────────────────────────────────────')
  pass.forEach(r => console.log(`✅ ${r.name_en}`))
  console.log()
}

const allClean = fail.length === 0 && warn.length === 0
console.log(allClean ? '✅ All files pass audit.\n' : `Run /world-cup audit {team} for details on a specific team.\n`)

process.exit(fail.length > 0 ? 1 : 0)
