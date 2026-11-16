export type ExerciseType =
  | 'CODING'
  | 'DEBUGGING'
  | 'OUTPUT_PREDICTION'
  | 'CODE_COMPLETION'
  | 'MULTIPLE_CHOICE'
  | 'SQL'
  | 'WEB'
export interface TestCase {
  input: string
  output: string
}
export interface Exercise {
  id: string
  courseId: string
  engine: 'python-pattern' | 'answer-key' | 'sql' | 'web'
  module: number
  title: string
  type: ExerciseType
  prompt: string
  starter: string
  answer: string
  tests: TestCase[]
  hint: string
  choices?: string[]
  xp: number
  difficulty: string
}
export interface Course {
  id: string
  title: string
  category: string
  description: string
  available: boolean
}
export interface Module {
  id: number
  title: string
  summary: string
}
export interface Lesson {
  module: number
  objectives: string[]
}
export interface User {
  name: string
}
export interface Submission {
  exerciseId: string
  date: string
  xp: number
}
export interface UserProgress {
  user: User | null
  submissions: Submission[]
}
export interface Achievement {
  title: string
  description: string
  earned: boolean
}
export interface Exam {
  id: string
  minutes: number
  topics: string[]
}
export interface ExamAttempt {
  answers: number[]
  deadline: number
  finished: boolean
}
export const courses: Course[] = [
  {
    id: 'itds120',
    title: 'Fundamentals of Programming',
    category: 'การเขียนโปรแกรม',
    description: 'ปูพื้นฐาน Python ด้วยการลงมือทำโจทย์ทีละข้อ',
    available: true,
  },
  {
    id: 'databases',
    title: 'Database Systems',
    category: 'การจัดการข้อมูล',
    description: 'รู้จักฐานข้อมูลเชิงสัมพันธ์ ออกแบบโครงสร้างข้อมูล และเขียนคำสั่ง SQL',
    available: false,
  },
  {
    id: 'web',
    title: 'Web Technologies',
    category: 'การพัฒนาเว็บ',
    description: 'สร้างหน้าเว็บที่โต้ตอบได้ด้วย HTML, CSS และ JavaScript',
    available: false,
  },
  {
    id: 'structures',
    title: 'Data Structures',
    category: 'วิทยาการคอมพิวเตอร์',
    description: 'ฝึกจัดเก็บข้อมูลด้วยต้นไม้ สแตก คิว และกราฟ',
    available: false,
  },
  {
    id: 'networking',
    title: 'Networking',
    category: 'โครงสร้างพื้นฐาน',
    description: 'เรียนรู้วิธีที่อุปกรณ์รับส่งแพ็กเก็ตผ่านเครือข่าย',
    available: false,
  },
]
export const modules: Module[] = [
  [
    'เริ่มต้นเขียนโปรแกรม',
    'ใช้ print() แสดงข้อความในคอนโซล และสังเกตว่า Python ทำงานตามลำดับจากบนลงล่าง',
  ],
  [
    'ตัวแปรและชนิดข้อมูล',
    'กำหนดค่าให้ตัวแปร และแยกความแตกต่างระหว่างจำนวนเต็ม สตริง และจำนวนทศนิยม',
  ],
  ['การรับข้อมูลและแสดงผล', 'รับข้อความด้วย input() แล้วจัดรูปแบบค่าที่ต้องการแสดง'],
  ['ตัวดำเนินการและนิพจน์', 'คำนวณค่าด้วยตัวดำเนินการทางคณิตศาสตร์ และฝึกใช้การหารปัดเศษลง'],
  ['คำสั่งเงื่อนไข', 'เปรียบเทียบค่าแล้วใช้ if และ else เพื่อเลือกคำสั่งที่จะทำงาน'],
  ['การวนซ้ำ', 'ใช้ for ทำคำสั่งซ้ำ และใช้ range() สร้างลำดับจำนวนเต็ม'],
  ['ฟังก์ชัน', 'เขียนชุดคำสั่งที่เรียกใช้ซ้ำได้ โดยกำหนดพารามิเตอร์และค่าที่ส่งกลับ'],
  ['ลิสต์และทูเพิล', 'เก็บข้อมูลตามลำดับและเข้าถึงสมาชิกด้วยดัชนีที่เริ่มจากศูนย์'],
  ['ดิกชันนารีและเซต', 'ค้นค่าด้วยคีย์ในดิกชันนารี และใช้เซตเก็บสมาชิกที่ไม่ซ้ำกัน'],
  ['สตริง', 'แปลงข้อความและตัดส่วนที่ต้องการออกจากสตริง'],
  ['การจัดการไฟล์', 'อ่านไฟล์ข้อความด้วยออบเจ็กต์ไฟล์ และใช้ with เพื่อปิดไฟล์อัตโนมัติ'],
  ['โจทย์ประยุกต์', 'ผสานเงื่อนไข การวนซ้ำ และการหาผลรวมเพื่อแก้โจทย์หนึ่งข้อให้ครบทุกขั้นตอน'],
].map(([title, summary], i) => ({ id: i + 1, title, summary }))
function problem(
  id: string,
  module: number,
  title: string,
  type: ExerciseType,
  prompt: string,
  starter: string,
  answer: string,
  input: string,
  output: string,
  hint: string,
  choices?: string[],
): Exercise {
  return {
    id,
    courseId: 'itds120',
    engine: ['CODING', 'DEBUGGING', 'CODE_COMPLETION'].includes(type)
      ? 'python-pattern'
      : 'answer-key',
    module,
    title,
    type,
    prompt,
    starter,
    answer,
    tests: [{ input, output }],
    hint,
    choices,
    xp: module > 6 ? 50 : 25,
    difficulty: module > 6 ? 'ระดับกลาง' : 'ระดับต้น',
  }
}
export const exercises = [
  problem(
    'numeric-score',
    2,
    'แก้โค้ดบวกคะแนน',
    'DEBUGGING',
    'แปลงคะแนนที่เก็บเป็นสตริงให้เป็นจำนวนเต็มก่อนบวกคะแนนพิเศษ',
    'print("8" + 2)',
    'print(int("8") + 2)',
    'None',
    '10',
    'ใช้ int() ครอบค่าที่เป็นสตริง',
  ),
  problem(
    'output-spacing',
    3,
    'แสดงรหัสวิชาให้ถูกต้อง',
    'DEBUGGING',
    'แสดง ITDS120 โดยไม่เว้นวรรคระหว่างตัวอักษรกับตัวเลข',
    'print("ITDS", 120)',
    'print("ITDS", 120, sep="")',
    'None',
    'ITDS120',
    'กำหนดอาร์กิวเมนต์ sep ให้เป็นสตริงว่าง',
  ),
  problem(
    'area-expression',
    4,
    'แก้สูตรหาพื้นที่',
    'DEBUGGING',
    'สี่เหลี่ยมผืนผ้ากว้าง 3 หน่วย สูง 4 หน่วย แก้โค้ดให้คำนวณพื้นที่ได้ถูกต้อง',
    'print(3 + 4)',
    'print(3 * 4)',
    'None',
    '12',
    'พื้นที่สี่เหลี่ยมผืนผ้าเท่ากับความกว้างคูณความสูง',
  ),
  problem(
    'include-boundary',
    5,
    'เช็กอายุให้ครอบคลุมค่าขอบ',
    'DEBUGGING',
    'แก้เงื่อนไขให้ผู้ที่อายุครบ 18 ปีผ่านเกณฑ์อายุขั้นต่ำ 18 ปี',
    'age = 18\nprint(age > 18)',
    'age = 18\nprint(age >= 18)',
    'None',
    'True',
    'เลือกตัวดำเนินการที่นับค่าขั้นต่ำรวมด้วย',
  ),
  problem(
    'return-total',
    7,
    'คืนค่าผลรวม',
    'DEBUGGING',
    'แก้ฟังก์ชัน add ให้ส่งผลรวมกลับไปยังจุดที่เรียกใช้',
    'def add(a, b):\n    print(a + b)',
    'def add(a, b):\n    return a + b',
    'add(2, 5)',
    '7',
    'เปลี่ยนจากการแสดงผลด้วย print เป็นการคืนค่าด้วย return',
  ),
  problem(
    'last-item',
    8,
    'เข้าถึงสมาชิกตัวสุดท้าย',
    'DEBUGGING',
    'แก้ดัชนีให้อ่านสมาชิกตัวสุดท้ายได้โดยไม่เกินขอบเขตของลิสต์',
    'items = [4, 8]\nprint(items[2])',
    'items = [4, 8]\nprint(items[-1])',
    'None',
    '8',
    'ใช้ดัชนีติดลบเพื่อนับจากท้ายลิสต์',
  ),
  problem(
    'dict-key',
    9,
    'ค้นค่าด้วยคีย์ที่ถูกต้อง',
    'DEBUGGING',
    'อ่านคะแนนโดยใช้คีย์ให้ตรงกับที่เก็บไว้ในดิกชันนารี',
    'record = {"score": 9}\nprint(record["Score"])',
    'record = {"score": 9}\nprint(record["score"])',
    'None',
    '9',
    'คีย์ที่เป็นสตริงแยกตัวพิมพ์เล็กและตัวพิมพ์ใหญ่',
  ),
  problem(
    'trim-text',
    10,
    'ตัดช่องว่างในชื่อผู้ใช้',
    'DEBUGGING',
    'ลบช่องว่างทั้งด้านหน้าและด้านหลังของชื่อผู้ใช้ที่กำหนด',
    'name = " Kai "\nprint(name.lstrip())',
    'name = " Kai "\nprint(name.strip())',
    'None',
    'Kai',
    'strip() ลบช่องว่างได้ทั้งสองด้าน',
  ),
  problem(
    'hello-loop',
    1,
    'ทักทาย LearnLoop',
    'CODING',
    'เขียนโปรแกรมให้แสดงข้อความ Hello, LearnLoop! หนึ่งครั้ง โดยใช้ตัวพิมพ์และเครื่องหมายวรรคตอนให้ตรงตามตัวอย่าง',
    '# เขียนคำสั่งแสดงข้อความทักทาย\n',
    'print("Hello, LearnLoop!")',
    'None',
    'Hello, LearnLoop!',
    'ใส่ข้อความทักทายในเครื่องหมายคำพูด แล้วส่งให้ print()',
  ),
  problem(
    'missing-quote',
    1,
    'แก้ข้อความทักทาย',
    'DEBUGGING',
    'แก้เครื่องหมายคำพูดที่ไม่เข้าคู่กัน เพื่อให้โปรแกรมแสดงคำว่า Ready',
    'print("Ready\')',
    'print("Ready")',
    'None',
    'Ready',
    'ใช้เครื่องหมายคำพูดชนิดเดียวกันที่ต้นและท้ายสตริง',
  ),
  problem(
    'score-update',
    2,
    'อัปเดตคะแนน',
    'OUTPUT_PREDICTION',
    'โปรแกรมจะแสดงค่าใดหลังจากปรับคะแนนแล้ว?',
    'score = 7\nscore += 5\nprint(score)',
    '12',
    'None',
    '12',
    'เริ่มจาก 7 แล้วบวกเพิ่มอีก 5',
  ),
  problem(
    'type-check',
    2,
    'ระบุชนิดข้อมูล',
    'MULTIPLE_CHOICE',
    'ค่า 3.14 มีชนิดข้อมูลใดใน Python?',
    '',
    'float',
    '3.14',
    'float',
    'ตัวเลขที่มีส่วนทศนิยมเก็บได้ด้วยชนิดข้อมูลแบบจุดลอยตัว',
    ['int', 'str', 'float', 'bool'],
  ),
  problem(
    'campus-welcome',
    3,
    'กล่าวต้อนรับนักศึกษา',
    'CODING',
    'รับชื่อหนึ่งชื่อ แล้วแสดงคำว่า Welcome, ตามด้วยช่องว่างหนึ่งช่องและชื่อที่รับมา',
    'name = input()\n',
    'name = input()\nprint("Welcome,", name)',
    'Alex',
    'Welcome, Alex',
    'ตามค่าเริ่มต้น print() จะคั่นค่าที่รับเข้ามาแต่ละค่าด้วยช่องว่าง',
  ),
  problem(
    'ticket-packs',
    4,
    'นับจำนวนชุดเต็ม',
    'CODE_COMPLETION',
    'เติมตัวดำเนินการหารปัดเศษลงในช่องว่าง',
    'print(17 ___ 4)',
    'print(17 // 4)',
    'None',
    '4',
    'ใช้เครื่องหมายทับติดกันสองตัว',
  ),
  problem(
    'pass-mark',
    5,
    'ตรวจคะแนนผ่านเกณฑ์',
    'CODING',
    'รับคะแนนเป็นจำนวนเต็มตั้งแต่ 0 ถึง 100 หากได้อย่างน้อย 50 ให้แสดง Pass ถ้าต่ำกว่านั้นให้แสดง Retry',
    'score = int(input())\n',
    'score = int(input())\nif score >= 50:\n    print("Pass")\nelse:\n    print("Retry")',
    '50',
    'Pass',
    'ใช้ >= เพื่อรวมกรณีที่คะแนนเท่ากับเกณฑ์',
  ),
  problem(
    'branch-trace',
    5,
    'ไล่การทำงานของเงื่อนไข',
    'OUTPUT_PREDICTION',
    'เมื่ออุณหภูมิมีค่าตามที่กำหนด โปรแกรมจะแสดงคำใด?',
    'temp = 18\nif temp > 20:\n    print("Warm")\nelse:\n    print("Cool")',
    'Cool',
    'None',
    'Cool',
    'เมื่ออุณหภูมิเป็น 18 โปรแกรมจะทำคำสั่งในส่วน else',
  ),
  problem(
    'loop-count',
    6,
    'หาผลรวมหลังจบลูป',
    'OUTPUT_PREDICTION',
    'ระบุผลรวมที่โปรแกรมแสดงหลังจบลูป',
    'total = 0\nfor i in range(4):\n    total += i\nprint(total)',
    '6',
    'None',
    '6',
    'range(4) ให้ค่าตามลำดับคือ 0, 1, 2 และ 3',
  ),
  problem(
    'repair-range',
    6,
    'แก้ลูปให้ครบรอบ',
    'DEBUGGING',
    'แก้ลูปให้แสดงตัวเลข 1 ถึง 3 โดยแสดงบรรทัดละหนึ่งตัว',
    'for i in range(1, 3):\n    print(i)',
    'for i in range(1, 4):\n    print(i)',
    'None',
    '1\n2\n3',
    'range() ไม่นับค่าปลายช่วง',
  ),
  problem(
    'double-value',
    7,
    'เพิ่มค่าเป็นสองเท่า',
    'CODE_COMPLETION',
    'เติมฟังก์ชันให้คืนค่าเป็นสองเท่าของอาร์กิวเมนต์ที่รับมา',
    'def double(n):\n    return ___',
    'def double(n):\n    return n * 2',
    'double(5)',
    '10',
    'นำค่าพารามิเตอร์มาคูณด้วยสอง',
  ),
  problem(
    'index-list',
    8,
    'หาสมาชิกตรงกลาง',
    'OUTPUT_PREDICTION',
    'โปรแกรมจะเลือกสมาชิกใดจากดัชนีที่กำหนด?',
    'colors = ["mint", "lilac", "gold"]\nprint(colors[1])',
    'lilac',
    'None',
    'lilac',
    'ดัชนีของสมาชิกตัวแรกคือศูนย์',
  ),
  problem(
    'unique-items',
    9,
    'จัดเก็บค่าไม่ซ้ำ',
    'MULTIPLE_CHOICE',
    'โครงสร้างข้อมูลใดเก็บสมาชิกโดยไม่มีค่าซ้ำและใช้ตรวจสอบว่ามีค่าที่ต้องการอยู่หรือไม่?',
    '',
    'set',
    '[2, 2, 5]',
    '{2, 5}',
    'โครงสร้างข้อมูลชนิดนี้เก็บค่าแต่ละค่าได้เพียงครั้งเดียว',
    ['list', 'tuple', 'set', 'str'],
  ),
  problem(
    'slice-text',
    10,
    'ตัดบางส่วนของรหัสวิชา',
    'OUTPUT_PREDICTION',
    'ระบุข้อความที่แสดงหลังจากตัดสตริงตามช่วงที่กำหนด',
    'print("ITDS120"[4:])',
    '120',
    'None',
    '120',
    'เมื่อนับจากศูนย์ ดัชนี 4 คือตำแหน่งของตัวเลขตัวแรก',
  ),
  problem(
    'safe-file',
    11,
    'ปิดไฟล์อย่างปลอดภัย',
    'MULTIPLE_CHOICE',
    'คำสั่งใดทำให้ไฟล์ปิดอัตโนมัติเมื่อสิ้นสุดบล็อก?',
    '',
    'with open("notes.txt") as f:',
    'notes.txt',
    'ปิดไฟล์อัตโนมัติ',
    'มองหาคำสั่งที่ใช้ตัวจัดการบริบท',
    [
      'f = open("notes.txt")',
      'with open("notes.txt") as f:',
      'f.read()',
      'print(f)',
    ],
  ),
  problem(
    'sum-even',
    12,
    'หาผลรวมของคะแนนคู่',
    'CODING',
    'รวมเฉพาะคะแนนที่เป็นเลขคู่ในลิสต์ scores ที่กำหนด แล้วแสดงผลรวม',
    'scores = [2, 3, 4, 7]\n',
    'scores = [2, 3, 4, 7]\nprint(sum(n for n in scores if n % 2 == 0))',
    '[2, 3, 4, 7]',
    '6',
    'ใช้ตัวดำเนินการหารเอาเศษเพื่อตรวจว่าเป็นเลขคู่หรือไม่',
  ),
]
exercises.sort((a, b) => a.module - b.module)
export const typeLabel: Record<ExerciseType, string> = {
  CODING: 'เขียนโปรแกรม',
  DEBUGGING: 'หาข้อผิดพลาด',
  OUTPUT_PREDICTION: 'ทำนายผลลัพธ์',
  CODE_COMPLETION: 'เติมโค้ด',
  MULTIPLE_CHOICE: 'เลือกคำตอบ',
  SQL: 'SQL',
  WEB: 'เว็บ',
}
export const programmingCourse = courses.find(course => course.id === 'itds120')!
export const coursePath = '/courses/itds120'
export const modulePath = (id: number) => coursePath + '/modules/' + id
export const practicePath = (id: string) => '/practice/' + id
export const featured = exercises[0]
