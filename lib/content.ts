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
  lesson: string
  example: string
  output: string
  explanation: string
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
    description: 'ทบทวน Python ก่อนสอบไฟนอลผ่านตัวอย่างและโจทย์ฝึก 5 หัวข้อ',
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
  {
    id: 1,
    title: 'Dictionary',
    summary: 'อ่านและแก้ค่าด้วยคีย์ แล้วใช้ดิกชันนารีสะสมยอดหรือจัดกลุ่มข้อมูล',
    lesson:
      'เมื่อต้องสะสมยอดจากหลายแถว ให้เลือกสิ่งที่ใช้จำแนกกลุ่มเป็นคีย์ แล้วอัปเดตค่าของคีย์นั้นทีละรายการ การอ่านด้วย d[key] ต้องมีคีย์อยู่ก่อน ส่วน d.get(key, 0) ให้ค่าเริ่มต้นเมื่อยังไม่พบคีย์',
    example:
      "totals = {}\nfor room, seats in [('A', 2), ('B', 1), ('A', 3)]:\n    totals[room] = totals.get(room, 0) + seats\nprint(totals)",
    output: "{'A': 5, 'B': 1}",
    explanation:
      'เมื่อพบ A ครั้งที่สอง ยอดเดิมคือ 2 จึงเพิ่มเป็น 5 ระวังการกำหนดค่าใหม่โดยไม่อ่านยอดเดิม เพราะจะเหลือเฉพาะรายการล่าสุด',
  },
  {
    id: 2,
    title: 'Function',
    summary: 'ไล่ค่าพารามิเตอร์ แยกการแสดงผลออกจากการคืนค่า และติดตามขอบเขตตัวแปร',
    lesson:
      'เริ่มไล่โค้ดจากจุดที่เรียกฟังก์ชัน จับคู่อาร์กิวเมนต์กับพารามิเตอร์ แล้วตามการทำงานจนถึง return ซึ่งส่งค่ากลับและจบการเรียกครั้งนั้นทันที',
    example:
      'def remaining(total, used=1):\n    return total - used\n\nprint(remaining(10), remaining(10, used=4))',
    output: '9 6',
    explanation:
      'ครั้งแรก used ใช้ค่าเริ่มต้น 1 ครั้งถัดมาใช้ค่า 4 ตามที่ระบุ ถ้าเปลี่ยน return เป็น print ฟังก์ชันจะแสดงค่าแต่คืน None',
  },
  {
    id: 3,
    title: 'File I/O',
    summary: 'เลือกโหมดเปิดไฟล์ อ่านข้อมูลทีละบรรทัด และติดตามตำแหน่งอ่าน',
    lesson:
      'เปิดไฟล์ด้วย with เพื่อให้ปิดไฟล์เมื่อจบบล็อก ใช้ r เมื่อต้องการอ่าน ใช้ w เมื่อต้องการเขียนทับ และใช้ a เมื่อต้องการเขียนต่อท้าย การอ่านครั้งต่อไปจะเริ่มจากตำแหน่งที่อ่านค้างไว้',
    example:
      "# points.txt มีสองบรรทัด คือ 12 และ 18\nwith open('points.txt', encoding='utf-8') as f:\n    first = int(f.readline())\n    rest = sum(int(line) for line in f)\nprint(first, rest)",
    output: '12 18',
    explanation:
      'readline() อ่าน 12 ไปแล้ว การวนอ่านต่อจึงพบเพียง 18 หากต้องการอ่านใหม่ตั้งแต่ต้น ให้ใช้ f.seek(0) ก่อนอ่าน',
  },
  {
    id: 4,
    title: 'NumPy',
    summary: 'วิเคราะห์รูปร่างอาร์เรย์ เลือกแกนคำนวณ และกรองสมาชิกด้วยเงื่อนไข',
    lesson:
      'ก่อนคำนวณ ให้ระบุความหมายของแถวและคอลัมน์ ในอาร์เรย์สองมิติ sum(axis=0) รวมค่าข้ามแถว เหลือหนึ่งผลลัพธ์ต่อคอลัมน์ ส่วน sum(axis=1) รวมค่าภายในแต่ละแถว',
    example:
      'import numpy as np\nmarks = np.array([[2, 5, 4], [3, 6, 1]])\nprint(marks.sum(axis=0).tolist())\nprint(marks.sum(axis=1).tolist())',
    output: '[5, 11, 5]\n[11, 10]',
    explanation:
      'อาร์เรย์ขนาด (2, 3) จึงให้ผลรวมรายคอลัมน์ 3 ค่า และผลรวมรายแถว 2 ค่า ลองคาดจำนวนผลลัพธ์ก่อนคำนวณจริง',
  },
  {
    id: 5,
    title: 'Pandas',
    summary: 'เลือกแถวและคอลัมน์ จัดการค่าที่หายไป และสรุปข้อมูลแยกกลุ่ม',
    lesson:
      'มอง DataFrame เป็นตารางที่แต่ละคอลัมน์มีชื่อ ใช้ loc เลือกแถวด้วยเงื่อนไขและระบุคอลัมน์ที่ต้องการ เมื่อต้องการผลแยกตามกลุ่ม ให้ groupby ก่อนเลือกคอลัมน์และวิธีสรุป',
    example:
      "import pandas as pd\ndf = pd.DataFrame({'room': ['A', 'B', 'A'], 'mark': [6, 4, 8]})\nprint(df.groupby('room')['mark'].sum().to_dict())",
    output: "{'A': 14, 'B': 4}",
    explanation:
      'กลุ่ม A มี 2 แถว จึงรวมเป็น 6 + 8 ส่วนกลุ่ม B มีเพียงแถวเดียว ถ้าเปลี่ยน sum() เป็น mean() ผลของ A จะเป็น 7',
  },
]
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
    xp: 50,
    difficulty: 'ระดับกลาง',
  }
}
export const exercises = [
  problem(
    'dict-key',
    1,
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
    'dict-default',
    1,
    'สะสมแต้มจากคีย์ใหม่',
    'DEBUGGING',
    'แก้การอ่านแต้มเดิมให้รองรับคีย์ใหม่ที่ยังไม่มีในตาราง',
    "points = {}\npoints['A'] = points['A'] + 3\nprint(points['A'])",
    "points = {}\npoints['A'] = points.get('A', 0) + 3\nprint(points['A'])",
    'None',
    '3',
    'ใช้ get() และกำหนดแต้มเริ่มต้นเป็น 0',
  ),
  problem(
    'dict-update',
    1,
    'ติดตามคีย์หลังอัปเดต',
    'OUTPUT_PREDICTION',
    'หลังรวมข้อมูลสองชุด โปรแกรมแสดงค่าใด',
    "d = {'A': 1, 'B': 3}\nd.update({'A': 5, 'C': 2})\nprint(len(d), d['A'])",
    '3 5',
    'None',
    '3 5',
    'update เขียนทับค่าของคีย์เดิมและเพิ่มเฉพาะคีย์ที่ยังไม่มี',
  ),
  problem(
    'dict-count',
    1,
    'นับจำนวนคนต่อห้อง',
    'CODING',
    'ใช้ดิกชันนารี count นับสมาชิกของแต่ละห้อง แล้วแสดงจำนวนของห้อง B',
    "rooms = ['B', 'A', 'B']\ncount = {}\n",
    "rooms = ['B', 'A', 'B']\ncount = {}\nfor room in rooms:\n    count[room] = count.get(room, 0) + 1\nprint(count['B'])",
    'None',
    '2',
    'สะสมจำนวนใน count[room] แล้วอ่านค่าของ B หลังจบลูป',
  ),
  problem(
    'return-total',
    2,
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
    'double-value',
    2,
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
    'function-indent',
    2,
    'คืนค่าหลังวนครบ',
    'DEBUGGING',
    'แก้ตำแหน่ง return เพื่อรวมตัวเลขให้ครบทุกตัว',
    'def total(nums):\n    s = 0\n    for n in nums:\n        s += n\n        return s\nprint(total([2, 3]))',
    'def total(nums):\n    s = 0\n    for n in nums:\n        s += n\n    return s\nprint(total([2, 3]))',
    'None',
    '5',
    'ถอย return ออกมาหนึ่งระดับให้ทำงานหลังจบลูป',
  ),
  problem(
    'function-scope',
    2,
    'ตามค่าข้ามฟังก์ชัน',
    'OUTPUT_PREDICTION',
    'ตัวแปรที่ส่งเข้าไปและค่าที่คืนกลับมามีค่าเท่าไรเมื่อแสดงผล',
    'def adjust(x, bonus=4):\n    x += bonus\n    return x\nx = 6\nprint(adjust(x), x)',
    '10 6',
    'None',
    '10 6',
    'x ภายในฟังก์ชันเป็นชื่อในขอบเขตท้องถิ่น',
  ),
  problem(
    'safe-file',
    3,
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
    'file-mode',
    3,
    'เก็บประวัติบรรทัดเดิม',
    'DEBUGGING',
    'log.txt มีข้อความ A และขึ้นบรรทัดใหม่อยู่แล้ว แก้โหมดให้เขียน B ต่อท้ายโดยเก็บ A ไว้',
    "with open('log.txt', 'w') as f:\n    f.write('B\\n')",
    "with open('log.txt', 'a') as f:\n    f.write('B\\n')",
    'None',
    'A\nB',
    'ใช้โหมด append',
  ),
  problem(
    'file-numbers',
    3,
    'รวมตัวเลขจากไฟล์',
    'DEBUGGING',
    'points.txt มีสองบรรทัดคือ 7 และ 8 แก้โค้ดให้รวมเป็นจำนวนเต็ม',
    "with open('points.txt') as f:\n    print(sum(f))",
    "with open('points.txt') as f:\n    print(sum(int(line) for line in f))",
    'None',
    '15',
    'แต่ละบรรทัดเป็นสตริง ให้แปลงด้วย int ก่อนรวม',
  ),
  problem(
    'file-pointer',
    3,
    'อ่านต่อจากตำแหน่งเดิม',
    'OUTPUT_PREDICTION',
    'ถ้า word.txt มีข้อความ ABCDE เพียงอย่างเดียว โปรแกรมแสดงอะไร',
    "with open('word.txt') as f:\n    first = f.read(2)\n    print(first, f.read(2))",
    'AB CD',
    'None',
    'AB CD',
    'การอ่านครั้งที่สองเริ่มต่อจาก B',
  ),
  problem(
    'numpy-axis',
    4,
    'เลือกแกนเพื่อรวมรายแถว',
    'DEBUGGING',
    'แก้แกนคำนวณให้ได้ผลรวมของแต่ละแถว',
    'import numpy as np\na = np.array([[2, 3], [4, 6]])\nprint(a.sum(axis=0).tolist())',
    'import numpy as np\na = np.array([[2, 3], [4, 6]])\nprint(a.sum(axis=1).tolist())',
    'None',
    '[5, 10]',
    'การรวมคอลัมน์ภายในแถวใช้ axis=1',
  ),
  problem(
    'numpy-mask',
    4,
    'กรองด้วยสองเงื่อนไข',
    'DEBUGGING',
    'แก้ตัวเชื่อมให้เลือกสมาชิกที่มากกว่า 2 และน้อยกว่า 8 พร้อมกัน',
    'import numpy as np\na = np.array([1, 4, 9])\nprint(a[(a > 2) and (a < 8)].tolist())',
    'import numpy as np\na = np.array([1, 4, 9])\nprint(a[(a > 2) & (a < 8)].tolist())',
    'None',
    '[4]',
    'ใช้ & เชื่อมเงื่อนไขแบบรายสมาชิก',
  ),
  problem(
    'numpy-shape',
    4,
    'มองรูปทรงหลัง reshape',
    'OUTPUT_PREDICTION',
    'เมื่อกำหนดจำนวนแถวไว้ 2 แถว ขนาดที่เหลือเป็นเท่าไร ระบุผลของ print',
    'import numpy as np\na = np.arange(8).reshape(2, -1)\nprint(a.shape)',
    '(2, 4)',
    'None',
    '(2, 4)',
    'จำนวนสมาชิกต้องยังคงเป็น 8',
  ),
  problem(
    'numpy-bonus',
    4,
    'เพิ่มโบนัสรายคอลัมน์',
    'CODE_COMPLETION',
    'แทน ___ ด้วยการบวกอาร์เรย์ให้แต่ละคอลัมน์ได้รับโบนัสตามตำแหน่ง',
    'import numpy as np\na = np.array([[1, 2], [3, 4]])\nb = np.array([5, 10])\nprint((___).tolist())',
    'import numpy as np\na = np.array([[1, 2], [3, 4]])\nb = np.array([5, 10])\nprint((a + b).tolist())',
    'None',
    '[[6, 12], [8, 14]]',
    'มิติสุดท้ายของทั้งสองอาร์เรย์มีขนาดเท่ากันจึงใช้ a + b ได้',
  ),
  problem(
    'pandas-select',
    5,
    'เลือกรายชื่อจากคะแนน',
    'DEBUGGING',
    'แก้เงื่อนไขการเลือกแถวให้นักศึกษาที่ได้ 50 คะแนนผ่านด้วย',
    "import pandas as pd\nd = pd.DataFrame({'name': ['A', 'B'], 'score': [50, 40]})\nprint(d.loc[d['score'] > 50, 'name'].tolist())",
    "import pandas as pd\nd = pd.DataFrame({'name': ['A', 'B'], 'score': [50, 40]})\nprint(d.loc[d['score'] >= 50, 'name'].tolist())",
    'None',
    "['A']",
    'แก้ขอบเขตของเงื่อนไขใน loc ให้รวมค่า 50',
  ),
  problem(
    'pandas-fill',
    5,
    'เก็บข้อมูลหลังเติมค่าว่าง',
    'DEBUGGING',
    'แก้โปรแกรมให้ตัวแปร s เก็บผลที่เติมศูนย์แล้ว',
    'import pandas as pd\ns = pd.Series([2, None])\ns.fillna(0)\nprint(s.tolist())',
    'import pandas as pd\ns = pd.Series([2, None])\ns = s.fillna(0)\nprint(s.tolist())',
    'None',
    '[2.0, 0.0]',
    'fillna คืน Series ใหม่ ให้เก็บผลนั้นไว้',
  ),
  problem(
    'pandas-group',
    5,
    'อ่านยอดรวมรายกลุ่ม',
    'OUTPUT_PREDICTION',
    'ผลรวมของกลุ่ม x มีค่าเท่าไร',
    "import pandas as pd\nd = pd.DataFrame({'group': ['x', 'y', 'x'], 'n': [3, 8, 4]})\nprint(d.groupby('group')['n'].sum().loc['x'])",
    '7',
    'None',
    '7',
    'รวมเฉพาะ 3 และ 4 จากสองแถวของกลุ่ม x',
  ),
  problem(
    'pandas-join',
    5,
    'เก็บแถวของตารางหลัก',
    'MULTIPLE_CHOICE',
    'ต้องการเก็บนักศึกษาทุกคนจากตาราง students แม้บางคนไม่มีแถวใน marks ควรใช้ค่าใดแทน ___',
    "students.merge(marks, on='id', how=___)",
    "'left'",
    'None',
    "'left'",
    'ตาราง students อยู่ด้านซ้ายของการเชื่อม',
    ["'inner'", "'right'", "'left'", "'cross'"],
  ),
]
export const typeLabel: Record<ExerciseType, string> = {
  CODING: 'เขียนโปรแกรม',
  DEBUGGING: 'หาข้อผิดพลาด',
  OUTPUT_PREDICTION: 'ทำนายผลลัพธ์',
  CODE_COMPLETION: 'เติมโค้ด',
  MULTIPLE_CHOICE: 'เลือกคำตอบ',
  SQL: 'SQL',
  WEB: 'เว็บ',
}
export const programmingCourse = courses.find(
  (course) => course.id === 'itds120',
)!
export const coursePath = '/courses/itds120'
export const modulePath = (id: number) => coursePath + '/modules/' + id
export const practicePath = (id: string) => '/practice/' + id
const currentExerciseIds = new Set(exercises.map((e) => e.id))
export function currentSubmissions(submissions: Submission[]) {
  return submissions.filter((s) => currentExerciseIds.has(s.exerciseId))
}
export const featured = exercises[0]
