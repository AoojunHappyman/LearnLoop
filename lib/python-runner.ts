import type { Exercise } from './content'
import type { Result } from './evaluation'

export function runPython(exercise: Exercise, code: string): Promise<Result> {
  return new Promise(resolve => {
    const worker = new Worker('/python-worker.js')
    function finish(result: Result) {
      clearTimeout(timer)
      worker.terminate()
      resolve(result)
    }
    const timer = setTimeout(() => finish({
      status: 'ใช้เวลาเกินกำหนด', passed: false, actual: '',
      feedback: 'หยุดการทำงานหลัง 60 วินาที ตรวจลูปหรือการเชื่อมต่อสำหรับโหลด Python แล้วลองอีกครั้ง',
    }), 60_000)
    worker.onerror = () => finish({
      status: 'เปิด Python ไม่สำเร็จ', passed: false, actual: '',
      feedback: 'ตรวจการเชื่อมต่ออินเทอร์เน็ตแล้วลองใหม่',
    })
    worker.onmessage = ({ data }) => {
      if (data.error) {
        finish({status: 'รันไม่สำเร็จ', passed: false, actual: data.error, feedback: 'ตรวจข้อความผิดพลาดแล้วลองใหม่'})
        return
      }
      const results = data.results as {passed: boolean; actual: string}[]
      const passed = results.length === exercise.tests.length && results.every(r => r.passed)
      finish({
        status: passed ? 'ผ่านกรณีทดสอบ' : 'ยังไม่ผ่านกรณีทดสอบ',
        passed,
        actual: results.map((r,i) => 'กรณีที่ ' + (i + 1) + '\n' + r.actual).join('\n\n'),
        feedback: 'ผ่าน ' + results.filter(r => r.passed).length + '/' + exercise.tests.length + ' กรณีทดสอบ',
      })
    }
    worker.postMessage({code, tests: exercise.tests})
  })
}
