import { Exercise } from './content'
export type Result = {
  status: string
  passed: boolean
  actual: string
  feedback: string
}
const normalize = (s: string) =>
  s
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/'([^'"\\\n]*)'/g, '"$1"')
    .replace(/[ \t]+$/gm, '')
export function evaluate(e: Exercise, answer: string): Result {
  const code = e.engine === 'python-pattern'
  const passed = code
    ? normalize(answer) === normalize(e.answer)
    : answer.trim() === e.answer
  if (passed)
    return {
      status: 'Accepted',
      passed,
      actual: e.tests[0].output,
      feedback: code
        ? 'Your code matches the reference pattern for this simulated case.'
        : 'Your answer matches the expected response.',
    }
  const patterns: [RegExp, string][] = [
    [/while True:/, 'Time Limit Exceeded'],
    [/raise (ValueError|Exception)|\/ 0\b/, 'Runtime Error'],
    [/___|print\([^)]*$/, 'Syntax Error'],
  ]
  const status = code
    ? patterns.find(([r]) => r.test(answer))?.[1] || 'Wrong Answer'
    : 'Wrong Answer'
  return {
    status,
    passed: false,
    actual: code ? 'No simulated output' : answer || '(empty)',
    feedback: code
      ? 'The demo checks a reference pattern. Compare your code with the hint or reference solution. Equivalent Python programs may differ.'
      : e.hint,
  }
}
