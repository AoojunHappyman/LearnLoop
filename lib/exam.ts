import { Exam } from './content'
export const exam: Exam = {
  id: 'itds120-mock',
  minutes: 60,
  topics: ['ตัวแปร', 'เงื่อนไข', 'การวนซ้ำ', 'ฟังก์ชัน', 'ลิสต์'],
}
export const questions = [
  ['เมื่อทำคำสั่ง x = 3 แล้วตามด้วย x += 4 ตัวแปร x จะมีค่าเท่าไร?', '7', '34', '3', '4'],
  ['นิพจน์ใดให้ผลลัพธ์เป็นชนิด float?', '5 / 2', '5 // 2', '5 % 2', 'int(2.5)'],
  [
    'ชื่อใดใช้เป็นชื่อตัวแปรใน Python ได้?',
    'course_score',
    'course-score',
    '2score',
    'class',
  ],
  ['type("42").__name__ คืนค่าอะไร?', 'str', 'int', 'float', 'bool'],
  ['ตัวดำเนินการใดใช้ตรวจสอบว่าค่าสองค่าเท่ากัน?', '==', '=', '!=', ':='],
  [
    'เมื่อ score = 50 นิพจน์ใดให้ค่า True?',
    'score >= 50',
    'score > 50',
    'score < 50',
    'score != 50',
  ],
  ['bool([]) ให้ค่าอะไร?', 'False', 'True', 'None', '0.0'],
  ['คำใดใช้เพิ่มเงื่อนไขถัดจาก if?', 'elif', 'else if', 'otherwise', 'then'],
  ['range(2, 8, 2) มีทั้งหมดกี่ค่า?', '3', '2', '4', '6'],
  ['คำสั่งใดข้ามไปทำลูปรอบถัดไป?', 'continue', 'break', 'return', 'pass'],
  ['sum(range(4)) มีค่าเท่าไร?', '6', '10', '4', '3'],
  [
    'คำสั่งใดใช้จบการทำงานของลูปชั้นในสุดที่กำลังทำงานอยู่?',
    'break',
    'continue',
    'stop',
    'yield',
  ],
  [
    'หากฟังก์ชันจบการทำงานโดยไม่มีคำสั่ง return จะคืนค่าอะไร?',
    'None',
    '0',
    'False',
    'สตริงว่าง',
  ],
  ['คำสำคัญใดใช้ประกาศฟังก์ชัน?', 'def', 'func', 'function', 'define'],
  [
    'เมื่อกำหนด def f(x=3): return x+2 การเรียก f() จะได้ค่าเท่าไร?',
    '5',
    '2',
    '3',
    'None',
  ],
  [
    'ข้อใดเรียกฟังก์ชันโดยระบุชื่ออาร์กิวเมนต์?',
    'round(2.345, ndigits=2)',
    'round(2.345, 2)',
    'round(2)',
    'round()',
  ],
  ['[4, 5, 6][-1] ให้ค่าอะไร?', '6', '4', '5', 'IndexError'],
  ['เมธอดใดเพิ่มสมาชิกหนึ่งตัวที่ท้ายลิสต์?', 'append', 'extendall', 'push', 'insertlast'],
  ['len([[], [1, 2]]) มีค่าเท่าไร?', '2', '3', '0', '1'],
  ['[1, 2, 3][0:2] ให้ผลลัพธ์ใด?', '[1, 2]', '[1, 2, 3]', '[2, 3]', '[1]'],
].map(([prompt, correct, ...others], i) => {
  const pos = (i * 3 + 1) % 4
  others.splice(pos, 0, correct)
  return {
    prompt,
    choices: others,
    correct: pos,
    topic: exam.topics[Math.floor(i / 4)],
  }
})
export const topicPractice = [
  'score-update',
  'pass-mark',
  'loop-count',
  'double-value',
  'index-list',
]
