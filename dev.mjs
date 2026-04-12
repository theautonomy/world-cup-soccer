#!/usr/bin/env node
/**
 * dev.mjs — local dev helper for world-cup-soccer
 *
 * Usage:
 *   node dev.mjs        copy JSON files + build + run React app (dev server)
 *   node dev.mjs prod   copy JSON files + production build + preview server
 */

import fs from 'fs'
import path from 'path'
import { execSync, spawn } from 'child_process'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const SRC  = path.join(__dir, 'data/teams')
const DEST = path.join(__dir, 'app/public/data/teams')
const APP  = path.join(__dir, 'app')

const mode = process.argv[2] === 'prod' ? 'prod' : 'dev'

// ── Step 1: Copy JSON files ──────────────────────────────────────────────────

fs.mkdirSync(DEST, { recursive: true })

const files = fs.existsSync(SRC)
  ? fs.readdirSync(SRC).filter(f => f.endsWith('.json'))
  : []

if (files.length === 0) {
  console.log('⚠  No JSON files found in data/teams/')
  console.log('   Run /world-cup team Brazil in Claude Code to generate one.\n')
} else {
  for (const f of files) {
    fs.copyFileSync(path.join(SRC, f), path.join(DEST, f))
  }
  console.log(`✓  Copied ${files.length} team JSON file(s) → app/public/data/teams/`)
}

// Build index.json from whatever is in DEST
const destFiles = fs.readdirSync(DEST).filter(f => f.endsWith('.json') && f !== 'index.json')
const index = destFiles.flatMap(f => {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(DEST, f), 'utf-8'))
    return [{ slug: d.meta.slug, name_zh: d.team.name_zh, name_en: d.team.name_en, flag_emoji: d.team.flag_emoji, fifa_rank: d.team.fifa_rank }]
  } catch {
    console.warn(`  ⚠  Skipped ${f} (invalid JSON)`)
    return []
  }
})
fs.writeFileSync(path.join(DEST, 'index.json'), JSON.stringify(index, null, 2))
console.log(`✓  index.json built (${index.length} team${index.length !== 1 ? 's' : ''})`)

// ── Step 2: Install deps if needed ──────────────────────────────────────────

if (!fs.existsSync(path.join(APP, 'node_modules'))) {
  console.log('\n⏳ Installing dependencies (first run)…')
  execSync('npm install', { cwd: APP, stdio: 'inherit' })
}

// ── Step 3: Build + run ──────────────────────────────────────────────────────

if (mode === 'prod') {
  console.log('\n⏳ Building production bundle…')
  execSync('npm run build', { cwd: APP, stdio: 'inherit' })
  console.log('\n✓  Build complete.')
  console.log('   → http://localhost:4173/world-cup-soccer/\n')
  spawn('npm', ['run', 'preview'], { cwd: APP, stdio: 'inherit', shell: true })
} else {
  console.log('\n   → http://localhost:5173/world-cup-soccer/\n')
  spawn('npm', ['run', 'dev'], { cwd: APP, stdio: 'inherit', shell: true })
}
