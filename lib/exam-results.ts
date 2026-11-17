import { examCatalog } from './exam'
import type { ExamAttempt } from './content'

type Exam = (typeof examCatalog)[number]

export function attemptKey(id: string) {
  return 'learnloop:exam:' + (id === 'itds120-mock' ? 'itds120-final' : id) + ':v1'
}

export function saveFinishedScore(exam: Exam, attempt: ExamAttempt) {
  if (!attempt.finished || attempt.answers.length !== exam.questions.length) return
  const score = exam.questions.filter((q, i) => q.correct === attempt.answers[i]).length
  const key = attemptKey(exam.id) + ':best'
  if (score > (Number(localStorage.getItem(key)) || 0)) {
    localStorage.setItem(key, String(score))
  }
}

export function readBestScore(exam: Exam) {
  const key = attemptKey(exam.id)
  try {
    const attempt = JSON.parse(localStorage.getItem(key) || 'null')
    if (attempt?.finished === true && Array.isArray(attempt.answers)) {
      saveFinishedScore(exam, attempt)
    }
    return Number(localStorage.getItem(key + ':best')) || 0
  } catch {
    return 0
  }
}
