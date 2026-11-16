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
      status: 'คำตอบถูกต้อง',
      passed,
      actual: e.tests[0].output,
      feedback: code
        ? 'โค้ดของคุณตรงกับรูปแบบเฉลยสำหรับกรณีทดสอบจำลองนี้'
        : 'คำตอบของคุณตรงกับเฉลย',
    }
  const patterns: [RegExp, string][] = [
    [/while True:/, 'ใช้เวลาเกินกำหนด'],
    [/raise (ValueError|Exception)|\/ 0\b/, 'เกิดข้อผิดพลาดขณะทำงาน'],
    [/___|print\([^)]*$/, 'ไวยากรณ์ไม่ถูกต้อง'],
  ]
  const status = code
    ? patterns.find(([r]) => r.test(answer))?.[1] || 'คำตอบยังไม่ถูกต้อง'
    : 'คำตอบยังไม่ถูกต้อง'
  return {
    status,
    passed: false,
    actual: code ? 'ไม่มีผลลัพธ์จากการจำลอง' : answer || '(ว่าง)',
    feedback: code
      ? 'ลองเทียบโค้ดกับคำใบ้หรือตัวอย่างเฉลย ตัวจำลองตรวจตามรูปแบบเฉลย โค้ดที่เขียนต่างกันแต่อาจให้ผลเท่ากันจึงอาจไม่ผ่าน'
      : e.hint,
  }
}
