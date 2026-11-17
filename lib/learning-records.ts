import { exercises, type Submission } from './content'
import { allExams } from './exam'
import { attemptKey } from './exam-results'

export type Records = Record<string, string>
export const guestPrefix = 'learnloop:guest:record:'

export function readPrefix(prefix: string): Records {
  const rows: Records = {}
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith(prefix)) rows[key.slice(prefix.length)] = localStorage.getItem(key)!
  }
  return rows
}

export function readGuest(): Records {
  const rows: Records = {}
  const advanced = localStorage.getItem('learnloop:advanced:v1')
  try {
    const old = JSON.parse(advanced ?? localStorage.getItem('learnloop:v1') ?? '{}')
    for (const s of old.submissions ?? []) {
      if (typeof s.exerciseId !== 'string' || !Number.isFinite(s.xp) || !Number.isFinite(Date.parse(s.date))) continue
      const exerciseId = advanced ? s.exerciseId : 'legacy:' + s.exerciseId
      rows['passed:' + exerciseId] = JSON.stringify({ ...s, exerciseId } satisfies Submission)
    }
  } catch {}
  for (const e of exercises) {
    const code = localStorage.getItem('learnloop:advanced-draft:' + e.id)
    if (code !== null) rows['draft:' + e.id] = code
  }
  for (const exam of allExams) {
    const key = attemptKey(exam.id)
    const raw = localStorage.getItem(key)
    let best = Number(localStorage.getItem(key + ':best')) || 0
    try {
      const a = JSON.parse(raw ?? 'null')
      if (a && Array.isArray(a.answers) && a.answers.length === exam.questions.length && Number.isFinite(a.deadline) && typeof a.finished === 'boolean') {
        rows[key] = raw!
        if (a.finished) best = Math.max(best, exam.questions.filter((q,i) => q.correct === a.answers[i]).length)
      }
    } catch {}
    if (best > 0 && best <= exam.questions.length) rows[key + ':score:' + best] = String(best)
  }
  return { ...rows, ...readPrefix(guestPrefix) }
}
