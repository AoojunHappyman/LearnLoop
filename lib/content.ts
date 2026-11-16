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
    difficulty: 'ระดับยาก',
  }
}
export const exercises = [
  problem(
    'dict-key',
    1,
    'ยอดสุทธิหลังตัดรายการซ้ำ',
    'CODING',
    'เขียนฟังก์ชัน ledger(rows) รับรายการ (รหัสธุรกรรม, บัญชี, จำนวนเงิน) นับเฉพาะครั้งแรกของแต่ละรหัส คืนยอดรายบัญชีโดยตัดบัญชีที่ยอดสุดท้ายเป็นศูนย์',
    'def ledger(rows):\n    # เขียนคำตอบที่นี่\n',
    'def ledger(rows):\n    seen, totals = set(), {}\n    for ref, account, amount in rows:\n        if ref not in seen:\n            seen.add(ref)\n            totals[account] = totals.get(account, 0) + amount\n    return {k: v for k, v in totals.items() if v != 0}',
    "print(ledger([(1,'A',5),(1,'A',5),(2,'A',-5),(3,'B',7)]))",
    "{'B': 7}",
    'แยกชุดรหัสที่เคยพบออกจากยอดสะสม',
  ),
  problem(
    'dict-default',
    1,
    'ดัชนีย้อนกลับ',
    'CODING',
    'เขียนฟังก์ชัน index_docs(docs) รับพจนานุกรมรหัสเอกสารกับข้อความ สร้างดัชนีจากคำตัวพิมพ์เล็กไปยังลิสต์รหัสเรียงน้อยไปมาก คั่นคำด้วยช่องว่างและนับคำซ้ำในเอกสารเดียวเพียงครั้งเดียว',
    'def index_docs(docs):\n    # เขียนคำตอบที่นี่\n',
    'def index_docs(docs):\n    index = {}\n    for doc in sorted(docs):\n        for word in sorted(set(docs[doc].lower().split())):\n            index.setdefault(word, []).append(doc)\n    return index',
    "print(index_docs({2:'Cat dog',1:'cat CAT'}))",
    "{'cat': [1, 2], 'dog': [2]}",
    'สร้างเซตคำต่อเอกสารก่อนเพิ่มรหัส',
  ),
  problem(
    'dict-update',
    1,
    'คะแนนดีที่สุดต่อวิชา',
    'CODING',
    'เขียนฟังก์ชัน best_total(rows) รับ (ชื่อ, วิชา, คะแนน) หลายครั้งต่อวิชา รวมเฉพาะคะแนนสูงสุดแต่ละวิชาของแต่ละคน คืนยอดรายคน',
    'def best_total(rows):\n    # เขียนคำตอบที่นี่\n',
    'def best_total(rows):\n    best = {}\n    for name, subject, score in rows:\n        key = (name, subject)\n        best[key] = max(best.get(key, score), score)\n    totals = {}\n    for (name, subject), score in best.items():\n        totals[name] = totals.get(name, 0) + score\n    return totals',
    "print(best_total([('A','x',5),('A','x',3),('A','y',8)]))",
    "{'A': 13}",
    'ใช้คีย์คู่เพื่อเก็บค่าสูงสุดก่อนรวม',
  ),
  problem(
    'dict-count',
    1,
    'จับคู่จำนวนที่รวมได้ตามเป้า',
    'CODING',
    'เขียนฟังก์ชัน pair_count(nums, target) คืนจำนวนคู่ดัชนี i < j ที่ผลรวมเท่ากับ target นับค่าซ้ำตามตำแหน่ง ห้ามใช้ลูปซ้อน',
    'def pair_count(nums, target):\n    # เขียนคำตอบที่นี่\n',
    'def pair_count(nums, target):\n    seen = {}\n    count = 0\n    for n in nums:\n        count += seen.get(target - n, 0)\n        seen[n] = seen.get(n, 0) + 1\n    return count',
    'print(pair_count([2,2,2,3,1],4))',
    '4',
    'นับคู่จากจำนวนที่พบก่อนหน้าแล้วค่อยบันทึกค่าปัจจุบัน',
  ),
  problem(
    'return-total',
    2,
    'รวมช่วงเวลาจองห้อง',
    'CODING',
    'เขียนฟังก์ชัน merge_slots(slots) รับลิสต์คู่เวลาเริ่มและจบที่ยังไม่เรียง คืนช่วงที่รวมกันแล้วตามเวลา รวมทั้งช่วงที่ปลายชนกัน โดยไม่แก้ไขลิสต์ต้นฉบับ',
    'def merge_slots(slots):\n    # เขียนคำตอบที่นี่\n',
    'def merge_slots(slots):\n    merged = []\n    for start, end in sorted(slots):\n        if merged and start <= merged[-1][1]:\n            merged[-1] = (merged[-1][0], max(end, merged[-1][1]))\n        else:\n            merged.append((start, end))\n    return merged',
    'print(merge_slots([(4,8),(1,4),(2,3),(10,12)]))',
    '[(1, 8), (10, 12)]',
    'เรียงช่วงก่อนเปรียบเทียบกับช่วงสุดท้าย',
  ),
  problem(
    'double-value',
    2,
    'ประกอบฟังก์ชัน',
    'CODING',
    'เขียนฟังก์ชัน pipeline(steps) คืนฟังก์ชันใหม่ที่นำค่าตั้งต้นผ่านฟังก์ชันใน steps จากซ้ายไปขวา ถ้าไม่มีขั้นตอนให้คืนค่าเดิม',
    'def pipeline(steps):\n    # เขียนคำตอบที่นี่\n',
    'def pipeline(steps):\n    def run(value):\n        for step in steps:\n            value = step(value)\n        return value\n    return run',
    'print(pipeline([lambda x: x+1, lambda x: x*x])(3))',
    '16',
    'ให้ฟังก์ชันชั้นในเข้าถึง steps จากขอบเขตภายนอก',
  ),
  problem(
    'function-indent',
    2,
    'รวมค่าจากลิสต์ซ้อน',
    'CODING',
    'เขียนฟังก์ชัน nested_sum(data) รับจำนวนเต็มหรือลิสต์ที่ซ้อนกันได้หลายชั้น ใช้ recursion คืนผลรวมจำนวนเต็มทั้งหมด ลิสต์ว่างให้ผลรวมศูนย์',
    'def nested_sum(data):\n    # เขียนคำตอบที่นี่\n',
    'def nested_sum(data):\n    if isinstance(data, int):\n        return data\n    return sum(nested_sum(item) for item in data)',
    'print(nested_sum([1,[2,[],[-4]],6]))',
    '5',
    'กำหนดกรณีฐานเมื่อพบจำนวนเต็ม',
  ),
  problem(
    'function-scope',
    2,
    'ค้นหาตำแหน่งแรก',
    'CODING',
    'เขียนฟังก์ชัน lower_bound(nums, target) รับลิสต์เรียงจากน้อยไปมาก ใช้ binary search คืนดัชนีแรกที่ค่าไม่น้อยกว่า target หากไม่มีให้คืนความยาวลิสต์ ต้องรองรับค่าซ้ำ',
    'def lower_bound(nums, target):\n    # เขียนคำตอบที่นี่\n',
    'def lower_bound(nums, target):\n    lo, hi = 0, len(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo',
    'print(lower_bound([1,3,3,7],3))',
    '1',
    'เมื่อตรงเป้ายังต้องค้นฝั่งซ้ายต่อ',
  ),
  problem(
    'safe-file',
    3,
    'อ่าน CSV ที่มีช่องว่าง',
    'CODING',
    'เขียนฟังก์ชัน sum_csv(f) รับไฟล์ข้อความ CSV ที่เปิดอ่านแล้ว มีหัวคอลัมน์ name,amount รวม amount ที่แปลงเป็นจำนวนเต็มได้ ข้ามช่องว่างและค่าผิดรูปแบบ ชื่ออาจมีจุลภาคในเครื่องหมายคำพูด',
    'def sum_csv(f):\n    # เขียนคำตอบที่นี่\n',
    "def sum_csv(f):\n    import csv\n    total = 0\n    for row in csv.DictReader(f):\n        try:\n            total += int(row['amount'])\n        except (ValueError, TypeError):\n            continue\n    return total",
    'from io import StringIO\nprint(sum_csv(StringIO(\'name,amount\\n"A,B",5\\nC,bad\\nD,-2\\n\')))',
    '3',
    'ใช้ DictReader เพื่อแยกเขตข้อมูลตามกติกา CSV',
  ),
  problem(
    'file-mode',
    3,
    'คัดบรรทัดผิดพลาด',
    'CODING',
    'เขียนฟังก์ชัน copy_errors(src, dst) อ่านไฟล์ src ทีละบรรทัด คัดเฉพาะบรรทัดที่ขึ้นต้นด้วย ERROR ตามด้วยช่องว่างลงไฟล์ dst ข้ามบรรทัดซ้ำ เก็บลำดับเดิม เขียนอักขระขึ้นบรรทัดใหม่หลังทุกบรรทัด คืนจำนวนที่เขียน',
    'def copy_errors(src, dst):\n    # เขียนคำตอบที่นี่\n',
    "def copy_errors(src, dst):\n    seen = set()\n    for line in src:\n        text = line.rstrip('\\r\\n')\n        if text.startswith('ERROR ') and text not in seen:\n            dst.write(text + '\\n')\n            seen.add(text)\n    return len(seen)",
    "from io import StringIO\nprint(copy_errors(StringIO('ERROR A\\nOK\\nERROR A\\nERROR B'), StringIO()))",
    '2',
    'เก็บข้อความที่ตัดเฉพาะตัวจบบรรทัดไว้ในเซต',
  ),
  problem(
    'file-numbers',
    3,
    'อ่านค่า config',
    'CODING',
    'เขียนฟังก์ชัน read_config(f) อ่านไฟล์ทีละบรรทัด ข้ามบรรทัดว่าง บรรทัดหมายเหตุที่เริ่มด้วย # หลังตัดช่องว่าง และบรรทัดที่ไม่มี = แยกตรง = ตัวแรก ตัดช่องว่างรอบคีย์และค่า ข้ามคีย์ว่าง ถ้าคีย์ซ้ำใช้ค่าล่าสุด',
    'def read_config(f):\n    # เขียนคำตอบที่นี่\n',
    "def read_config(f):\n    result = {}\n    for line in f:\n        line = line.strip()\n        if line.startswith('#') or '=' not in line:\n            continue\n        key, value = line.split('=', 1)\n        if key.strip():\n            result[key.strip()] = value.strip()\n    return result",
    "from io import StringIO\nprint(read_config(StringIO('x=1\\n# x=2\\nx = a=b\\n')))",
    "{'x': 'a=b'}",
    'กำหนดจำนวนครั้งที่ split จะแยกข้อความ',
  ),
  problem(
    'file-pointer',
    3,
    'สรุปไฟล์เป็นย่อหน้า',
    'CODING',
    'เขียนฟังก์ชัน paragraph_sizes(f) อ่านทีละบรรทัด แยกย่อหน้าด้วยบรรทัดว่างหรือบรรทัดที่มีแต่ช่องว่าง คืนจำนวนคำแต่ละย่อหน้า ไม่นับย่อหน้าว่าง และรองรับไฟล์ที่จบโดยไม่มีบรรทัดว่าง',
    'def paragraph_sizes(f):\n    # เขียนคำตอบที่นี่\n',
    'def paragraph_sizes(f):\n    sizes, count = [], 0\n    for line in f:\n        if line.strip():\n            count += len(line.split())\n        elif count:\n            sizes.append(count)\n            count = 0\n    if count:\n        sizes.append(count)\n    return sizes',
    "from io import StringIO\nprint(paragraph_sizes(StringIO('a b\\nc\\n \\n\\nd e')))",
    '[3, 2]',
    'หลังอ่านจบตรวจว่ายังมีย่อหน้าที่ไม่ได้บันทึกหรือไม่',
  ),
  problem(
    'numpy-axis',
    4,
    'ปรับสเกลรายคอลัมน์',
    'CODING',
    'เขียนฟังก์ชัน scale(a) ใช้ NumPy ปรับแต่ละคอลัมน์ของเมทริกซ์ตัวเลขที่ไม่ว่างให้อยู่ในช่วง 0–1 ด้วย min–max scaling ให้คอลัมน์ค่าคงที่เป็นศูนย์ทั้งหมด คืนลิสต์สองมิติ',
    'def scale(a):\n    # เขียนคำตอบที่นี่\n',
    'def scale(a):\n    import numpy as np\n    a = np.asarray(a, dtype=float)\n    low = a.min(axis=0)\n    span = a.max(axis=0) - low\n    return ((a - low) / np.where(span == 0, 1, span)).tolist()',
    'print(scale([[1,5],[3,5]]))',
    '[[0.0, 0.0], [1.0, 0.0]]',
    'หา min และ max ตาม axis=0 แล้วจัดการตัวหารศูนย์',
  ),
  problem(
    'numpy-mask',
    4,
    'เฉลี่ยเฉพาะคะแนนที่ใช้ได้',
    'CODING',
    'เขียนฟังก์ชัน valid_means(a) ใช้ NumPy หาค่าเฉลี่ยรายแถวโดยนับเฉพาะค่าในช่วง 0–100 รวมขอบเขต แถวที่ไม่มีคะแนนใช้ได้ให้คืน -1 ใช้การคำนวณแบบอาร์เรย์',
    'def valid_means(a):\n    # เขียนคำตอบที่นี่\n',
    'def valid_means(a):\n    import numpy as np\n    a = np.asarray(a)\n    valid = (a >= 0) & (a <= 100)\n    count = valid.sum(axis=1)\n    total = np.where(valid, a, 0).sum(axis=1)\n    return np.where(count, total / np.maximum(count, 1), -1).tolist()',
    'print(valid_means([[0,80,-1],[-1,120,-3]]))',
    '[40.0, -1.0]',
    'ตัวหารต้องเป็นจำนวนสมาชิกที่ผ่านเงื่อนไขในแต่ละแถว',
  ),
  problem(
    'numpy-shape',
    4,
    'ตำแหน่งสูงสุดของทุกแถว',
    'CODING',
    'เขียนฟังก์ชัน peak_cols(a) ใช้ NumPy กับเมทริกซ์ที่มีอย่างน้อยหนึ่งคอลัมน์ คืนดัชนีคอลัมน์ของค่าสูงสุดตัวสุดท้ายในแต่ละแถว โดยไม่ใช้ลูป',
    'def peak_cols(a):\n    # เขียนคำตอบที่นี่\n',
    'def peak_cols(a):\n    import numpy as np\n    a = np.asarray(a)\n    return (a.shape[1] - 1 - np.argmax(a[:, ::-1], axis=1)).tolist()',
    'print(peak_cols([[3,1,3],[2,2,1]]))',
    '[2, 1]',
    'กลับลำดับคอลัมน์ก่อนใช้ argmax แล้วแปลงดัชนีกลับ',
  ),
  problem(
    'numpy-bonus',
    4,
    'ตรวจจับการเปลี่ยนแปลง',
    'CODING',
    'เขียนฟังก์ชัน jumps(a, limit) รับข้อมูลเซนเซอร์สองมิติ แถวคือเวลา คอลัมน์คือเซนเซอร์ ใช้ NumPy คืนดัชนีเวลาที่มีอย่างน้อยหนึ่งเซนเซอร์เปลี่ยนจากแถวก่อนหน้าเกิน limit ในค่าสัมบูรณ์ ไม่นับเวลาแรก',
    'def jumps(a, limit):\n    # เขียนคำตอบที่นี่\n',
    'def jumps(a, limit):\n    import numpy as np\n    diff = np.abs(np.diff(np.asarray(a, dtype=float), axis=0))\n    return (np.flatnonzero((diff > limit).any(axis=1)) + 1).tolist()',
    'print(jumps([[2,3],[5,3],[5,9]],3))',
    '[2]',
    'ผลของ diff สั้นลงหนึ่งแถว จึงต้องเลื่อนดัชนีกลับ',
  ),
  problem(
    'pandas-select',
    5,
    'เลือกผลสอบครั้งดีที่สุด',
    'CODING',
    'เขียนฟังก์ชัน top_names(rows) สร้าง DataFrame จากคู่ (ชื่อ, คะแนน) ที่ไม่ว่าง เก็บคะแนนสูงสุดต่อคน เรียงตามคะแนนลดหลั่น ถ้าเสมอให้เรียงชื่อตามตัวอักษร คืนรายชื่อไม่เกินสามคน',
    'def top_names(rows):\n    # เขียนคำตอบที่นี่\n',
    "def top_names(rows):\n    import pandas as pd\n    df = pd.DataFrame(rows, columns=['name', 'score'])\n    best = df.groupby('name', as_index=False)['score'].max()\n    return best.sort_values(['score', 'name'], ascending=[False, True]).head(3)['name'].tolist()",
    "print(top_names([('B',8),('A',8),('B',2),('C',9)]))",
    "['C', 'A', 'B']",
    'ลดให้เหลือหนึ่งแถวต่อคนก่อนจัดเรียง',
  ),
  problem(
    'pandas-fill',
    5,
    'เติมคะแนนตามห้อง',
    'CODING',
    'เขียนฟังก์ชัน fill_rooms(rows) สร้าง DataFrame จากคู่ (ห้อง, คะแนน) เติมคะแนนที่หายด้วยมัธยฐานของห้องเดียวกัน หากทั้งห้องไม่มีคะแนนให้ใช้ 0 คืนคะแนนตามลำดับเดิมเป็นลิสต์จำนวนทศนิยม',
    'def fill_rooms(rows):\n    # เขียนคำตอบที่นี่\n',
    "def fill_rooms(rows):\n    import pandas as pd\n    df = pd.DataFrame(rows, columns=['room', 'score'])\n    med = df.groupby('room')['score'].transform('median')\n    return df['score'].fillna(med).fillna(0).astype(float).tolist()",
    "print(fill_rooms([('A',2),('B',None),('A',None),('A',6)]))",
    '[2.0, 0.0, 4.0, 6.0]',
    'ใช้ transform เพื่อรักษาดัชนีแถวเดิม',
  ),
  problem(
    'pandas-group',
    5,
    'ยอดชำระสุทธิ',
    'CODING',
    'เขียนฟังก์ชัน paid_totals(rows) สร้าง DataFrame จาก (ลูกค้า, สถานะ, จำนวนเงิน) รวมเฉพาะสถานะ paid แยกตามลูกค้า คืนดิกชันนารีเฉพาะลูกค้าที่มียอดรวมเป็นบวก',
    'def paid_totals(rows):\n    # เขียนคำตอบที่นี่\n',
    "def paid_totals(rows):\n    import pandas as pd\n    df = pd.DataFrame(rows, columns=['user', 'status', 'amount'])\n    paid = df.loc[df['status'] == 'paid'].groupby('user')['amount'].sum()\n    return paid[paid > 0].to_dict()",
    "print(paid_totals([('A','paid',8),('A','paid',-3),('B','void',9),('C','paid',0)]))",
    "{'A': 5}",
    'กรองสถานะก่อน groupby แล้วกรองยอดอีกครั้งหลังรวม',
  ),
  problem(
    'pandas-join',
    5,
    'เชื่อมยอดกับทะเบียน',
    'CODING',
    'เขียนฟังก์ชัน report(ids, marks) ใช้ Pandas สรุปคะแนนจากคู่ (id, คะแนน) โดยใช้คะแนนสูงสุดเมื่อ id ซ้ำ เชื่อมกับทะเบียน ids ซึ่งไม่มีค่าซ้ำ คืนคะแนนจำนวนเต็มตามลำดับทะเบียน ให้ -1 เมื่อไม่มีคะแนน และข้ามคะแนนของผู้ที่ไม่มีในทะเบียน',
    'def report(ids, marks):\n    # เขียนคำตอบที่นี่\n',
    "def report(ids, marks):\n    import pandas as pd\n    roster = pd.DataFrame({'id': ids})\n    scores = pd.DataFrame(marks, columns=['id', 'score'])\n    best = scores.groupby('id', as_index=False)['score'].max()\n    result = roster.merge(best, on='id', how='left')\n    return result['score'].fillna(-1).astype(int).tolist()",
    'print(report([3,1,2],[(1,7),(1,9),(4,8),(3,5)]))',
    '[5, 9, -1]',
    'สรุปคะแนนก่อน merge เพื่อป้องกันแถวซ้ำในผลลัพธ์',
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
