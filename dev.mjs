#!/usr/bin/env node
/**
 * dev.mjs — local dev helper for world-cup-soccer
 *
 * Usage:
 *   node dev.mjs          sync JSON + start Vite dev server
 *   node dev.mjs sync     sync JSON only (no server)
 *   node dev.mjs build    sync JSON + production build + preview server
 */

import fs from 'fs'
import path from 'path'
import { execSync, spawn } from 'child_process'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const SRC  = path.join(__dir, 'data/teams')
const DEST = path.join(__dir, 'app/public/data/teams')
const APP  = path.join(__dir, 'app')

const mode = process.argv[2] || 'dev'

// ── 1. Sync JSON ─────────────────────────────────────────────────────────────

function syncJSON() {
  fs.mkdirSync(DEST, { recursive: true })

  const files = fs.existsSync(SRC)
    ? fs.readdirSync(SRC).filter(f => f.endsWith('.json'))
    : []

  if (files.length === 0) {
    console.log('⚠  No JSON files in data/teams/ — run /world-cup team {name} first')
    console.log('   Starting dev server anyway so you can see the empty state.\n')
  } else {
    for (const f of files) {
      fs.copyFileSync(path.join(SRC, f), path.join(DEST, f))
    }
    console.log(`✓  Copied ${files.length} team JSON file(s) to app/public/data/teams/`)
  }

  // Build index.json
  const jsonFiles = fs.readdirSync(DEST).filter(f => f.endsWith('.json') && f !== 'index.json')
  const index = jsonFiles.flatMap(f => {
    try {
      const d = JSON.parse(fs.readFileSync(path.join(DEST, f), 'utf-8'))
      return [{
        slug:       d.meta.slug,
        name_zh:    d.team.name_zh,
        name_en:    d.team.name_en,
        flag_emoji: d.team.flag_emoji,
        fifa_rank:  d.team.fifa_rank,
      }]
    } catch {
      console.warn(`  ⚠  Skipped ${f} (parse error)`)
      return []
    }
  })

  fs.writeFileSync(path.join(DEST, 'index.json'), JSON.stringify(index, null, 2))
  console.log(`✓  index.json written (${index.length} team${index.length !== 1 ? 's' : ''})`)
}

// ── 2. Ensure node_modules ───────────────────────────────────────────────────

function ensureDeps() {
  const nm = path.join(APP, 'node_modules')
  if (!fs.existsSync(nm)) {
    console.log('⏳ Installing app dependencies (first run)…')
    execSync('npm install', { cwd: APP, stdio: 'inherit' })
  }
}

// ── 3. Run ───────────────────────────────────────────────────────────────────

syncJSON()

if (mode === 'sync') {
  process.exit(0)
}

ensureDeps()

if (mode === 'build') {
  console.log('\n⏳ Building production bundle…')
  execSync('npm run build', { cwd: APP, stdio: 'inherit' })
  console.log('\n✓  Build complete. Starting preview server…')
  console.log('   → http://localhost:4173/world-cup-soccer/\n')
  spawn('npm', ['run', 'preview'], { cwd: APP, stdio: 'inherit', shell: true })
} else {
  console.log('\n✓  Starting dev server…')
  console.log('   → http://localhost:5173/world-cup-soccer/\n')
  spawn('npm', ['run', 'dev'], { cwd: APP, stdio: 'inherit', shell: true })
}
