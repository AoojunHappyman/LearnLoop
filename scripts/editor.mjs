import { cpSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
const source = 'node_modules/monaco-editor/min/vs',
  dest = 'public/monaco/vs'
mkdirSync(dest, { recursive: true })
for (const name of ['loader.js', 'editor', 'base', 'basic-languages/python'])
  cpSync(join(source, name), join(dest, name), { recursive: true })
