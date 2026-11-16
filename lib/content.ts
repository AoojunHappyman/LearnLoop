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
  problem(
    'stock-orders',
    1,
    'ตัดสต็อกแบบทั้งใบสั่ง',
    'CODING',
    'เขียนฟังก์ชัน fulfill(stock, orders) แต่ละใบสั่งเป็นลิสต์คู่สินค้าและจำนวนบวก รวมสินค้าที่ซ้ำในใบเดียวก่อนตรวจ หากของไม่ครบให้ข้ามทั้งใบ คืน (สต็อกคงเหลือ, ดัชนีใบที่สำเร็จ) โดยไม่แก้ stock เดิม',
    'def fulfill(stock, orders):\n    # เขียนคำตอบที่นี่\n',
    'def fulfill(stock, orders):\n    left = stock.copy()\n    ok = []\n    for i, order in enumerate(orders):\n        need = {}\n        for item, qty in order:\n            need[item] = need.get(item, 0) + qty\n        if all(left.get(k, 0) >= v for k, v in need.items()):\n            for k, v in need.items():\n                left[k] -= v\n            ok.append(i)\n    return left, ok',
    "print(fulfill({'A':3}, [[('A',2),('A',2)],[('A',1)]]))",
    "({'A': 2}, [1])",
    'ลองแยกข้อมูลที่ต้องเก็บระหว่างทางออกจากผลลัพธ์สุดท้าย',
  ),
  problem(
    'alias-cycle',
    1,
    'แกะรอยชื่อแทน',
    'CODING',
    'เขียนฟังก์ชัน resolve(aliases, names) ไล่ชื่อแทนไปจนถึงชื่อที่ไม่มีในตาราง คืนปลายทางของแต่ละชื่อเรียงตามอินพุต ถ้าพบวงจรให้คืน None ตรงตำแหน่งนั้น',
    'def resolve(aliases, names):\n    # เขียนคำตอบที่นี่\n',
    'def resolve(aliases, names):\n    result = []\n    for name in names:\n        seen = set()\n        while name in aliases and name not in seen:\n            seen.add(name)\n            name = aliases[name]\n        result.append(None if name in seen else name)\n    return result',
    "print(resolve({'a':'b','b':'c','x':'x'}, ['a','x','z']))",
    "['c', None, 'z']",
    'ลองแยกข้อมูลที่ต้องเก็บระหว่างทางออกจากผลลัพธ์สุดท้าย',
  ),
  problem(
    'word-window',
    1,
    'คำซ้ำในหน้าต่างเลื่อน',
    'CODING',
    'เขียนฟังก์ชัน repeat_windows(words, k) คืนจำนวนคำที่ปรากฏอย่างน้อยสองครั้งในแต่ละช่วงติดกันยาว k โดยไม่แยกตัวพิมพ์ ถ้า k ไม่อยู่ในช่วง 1 ถึงจำนวนคำให้คืน [] ต้องใช้เวลา O(n)',
    'def repeat_windows(words, k):\n    # เขียนคำตอบที่นี่\n',
    'def repeat_windows(words, k):\n    if not 1 <= k <= len(words):\n        return []\n    counts, out, repeated = {}, [], 0\n    for i, raw in enumerate(words):\n        w = raw.lower()\n        counts[w] = counts.get(w, 0) + 1\n        repeated += counts[w] == 2\n        if i >= k:\n            old = words[i-k].lower()\n            repeated -= counts[old] == 2\n            counts[old] -= 1\n        if i+1 >= k:\n            out.append(repeated)\n    return out',
    "print(repeat_windows(['A','a','b','B'],3))",
    '[1, 1]',
    'ลองแยกข้อมูลที่ต้องเก็บระหว่างทางออกจากผลลัพธ์สุดท้าย',
  ),
  problem(
    'craft-cost',
    1,
    'ต้นทุนสูตรซ้อน',
    'CODING',
    'เขียนฟังก์ชัน cost(item, prices, recipes) สูตรเป็นพจนานุกรมของวัตถุดิบกับจำนวนเต็มบวก สูตรไม่มีวงจร วัตถุดิบปลายทางมีราคาเสมอ คืนต้นทุนหนึ่งหน่วยโดยจำผลของส่วนประกอบที่ใช้ซ้ำ',
    'def cost(item, prices, recipes):\n    # เขียนคำตอบที่นี่\n',
    'def cost(item, prices, recipes):\n    from functools import lru_cache\n    @lru_cache(None)\n    def unit(k):\n        if k in prices:\n            return prices[k]\n        return sum(n * unit(part) for part, n in recipes[k].items())\n    return unit(item)',
    "print(cost('kit',{'x':3},{'bar':{'x':2},'kit':{'bar':2,'x':1}}))",
    '15',
    'ลองแยกข้อมูลที่ต้องเก็บระหว่างทางออกจากผลลัพธ์สุดท้าย',
  ),
  problem(
    'net-balances',
    1,
    'กระทบยอดการโอน',
    'CODING',
    'เขียนฟังก์ชัน net(transfers) รับ (ต้นทาง, ปลายทาง, จำนวนเงินบวก) คืนลิสต์คู่บัญชีกับยอดสุทธิ เรียงยอดจากมากไปน้อย ถ้าเสมอเรียงชื่อ ตัดบัญชีที่ยอดเป็นศูนย์',
    'def net(transfers):\n    # เขียนคำตอบที่นี่\n',
    'def net(transfers):\n    bal = {}\n    for a, b, n in transfers:\n        bal[a] = bal.get(a, 0) - n\n        bal[b] = bal.get(b, 0) + n\n    return sorted(((k,v) for k,v in bal.items() if v), key=lambda p: (-p[1],p[0]))',
    "print(net([('A','B',5),('B','C',5),('C','C',2)]))",
    "[('C', 5), ('A', -5)]",
    'ลองแยกข้อมูลที่ต้องเก็บระหว่างทางออกจากผลลัพธ์สุดท้าย',
  ),
  problem(
    'shared-terms',
    1,
    'คำที่เชื่อมหลายเอกสาร',
    'CODING',
    'เขียนฟังก์ชัน shared(docs, k) docs จับคู่ชื่อเอกสารกับข้อความ คืนคำที่พบอย่างน้อย k เอกสาร แปลงเป็นตัวพิมพ์เล็กและแยกด้วยช่องว่าง เรียงตามจำนวนเอกสารลดหลั่นแล้วตามคำ',
    'def shared(docs, k):\n    # เขียนคำตอบที่นี่\n',
    'def shared(docs, k):\n    counts = {}\n    for text in docs.values():\n        for w in set(text.lower().split()):\n            counts[w] = counts.get(w, 0) + 1\n    return sorted((w for w in counts if counts[w]>=k), key=lambda w: (-counts[w],w))',
    "print(shared({'a':'X x z','b':'z x','c':'X'},2))",
    "['x', 'z']",
    'ลองแยกข้อมูลที่ต้องเก็บระหว่างทางออกจากผลลัพธ์สุดท้าย',
  ),
  problem(
    'closest-points',
    2,
    'หาคู่จุดสามมิติที่ใกล้ที่สุด',
    'CODING',
    'เขียนฟังก์ชัน closest(points) คืนคู่ดัชนี i < j ที่มีระยะยูคลิดต่ำสุด หากเสมอให้เลือกคู่ดัชนีที่เล็กสุดตามลำดับ หากมีไม่ถึงสองจุดคืน None',
    'def closest(points):\n    # เขียนคำตอบที่นี่\n',
    'def closest(points):\n    pairs = ((sum((a-b)**2 for a,b in zip(points[i],points[j])),i,j) for j in range(len(points)) for i in range(j))\n    best = min(pairs, default=None)\n    return best[1:] if best else None',
    'print(closest([(0,0,0),(2,0,0),(1,0,0)]))',
    '(0, 2)',
    'ลองไล่กรณีเล็กที่สุด แล้วระบุผลที่ต้องส่งกลับในแต่ละขั้น',
  ),
  problem(
    'prime-splits',
    2,
    'ตัดเลขเป็นจำนวนเฉพาะ',
    'CODING',
    'เขียนฟังก์ชัน splits(text) นับวิธีแบ่งสตริงตัวเลขเป็นจำนวนเฉพาะตั้งแต่ 2 ถึง 99 แต่ละชิ้นห้ามขึ้นต้นด้วย 0 ถือว่าสตริงว่างแบ่งได้หนึ่งวิธี',
    'def splits(text):\n    # เขียนคำตอบที่นี่\n',
    "def splits(text):\n    ways = [1] + [0]*len(text)\n    for end in range(1,len(ways)):\n        for start in range(max(0,end-2),end):\n            n = int(text[start:end])\n            if text[start]!='0' and n>=2 and all(n%d for d in range(2,int(n**0.5)+1)):\n                ways[end] += ways[start]\n    return ways[-1]",
    "print(splits('237'))",
    '3',
    'ลองไล่กรณีเล็กที่สุด แล้วระบุผลที่ต้องส่งกลับในแต่ละขั้น',
  ),
  problem(
    'search-fleet',
    2,
    'คัดรถตามกฎหลายชั้น',
    'CODING',
    'เขียนฟังก์ชัน fleet(cars, allowed, budget) cars มี (รุ่น, ยี่ห้อ, ราคา) กรองยี่ห้อใน allowed และราคาไม่เกิน budget เลือกราคาต่ำสุดต่อรุ่น คืนคู่รุ่นกับราคาเรียงราคาน้อยไปมากแล้วตามรุ่น',
    'def fleet(cars, allowed, budget):\n    # เขียนคำตอบที่นี่\n',
    'def fleet(cars, allowed, budget):\n    best = {}\n    for model, brand, price in cars:\n        if brand in allowed and price <= budget:\n            best[model] = min(price,best.get(model,price))\n    return sorted(best.items(),key=lambda x:(x[1],x[0]))',
    "print(fleet([('Z','A',8),('Z','A',5),('X','B',3)],{'A'},7))",
    "[('Z', 5)]",
    'ลองไล่กรณีเล็กที่สุด แล้วระบุผลที่ต้องส่งกลับในแต่ละขั้น',
  ),
  problem(
    'min-capacity',
    2,
    'หาน้ำหนักบรรทุกขั้นต่ำ',
    'CODING',
    'เขียนฟังก์ชัน capacity(weights, days) แบ่งพัสดุน้ำหนักจำนวนเต็มบวกเป็นไม่เกิน days กลุ่มติดกันตามลำดับเดิม คืนค่าต่ำสุดของน้ำหนักกลุ่มที่หนักที่สุด ใช้ binary search กำหนดให้มีพัสดุและ days >= 1',
    'def capacity(weights, days):\n    # เขียนคำตอบที่นี่\n',
    'def capacity(weights, days):\n    lo, hi = max(weights), sum(weights)\n    while lo < hi:\n        mid = (lo+hi)//2\n        used, load = 1, 0\n        for w in weights:\n            if load+w > mid:\n                used += 1\n                load = 0\n            load += w\n        if used <= days:\n            hi = mid\n        else:\n            lo = mid+1\n    return lo',
    'print(capacity([3,1,4,2],2))',
    '6',
    'ลองไล่กรณีเล็กที่สุด แล้วระบุผลที่ต้องส่งกลับในแต่ละขั้น',
  ),
  problem(
    'nested-damage',
    2,
    'ประเมินต้นไม้ดาเมจ',
    'CODING',
    'เขียนฟังก์ชัน damage(node) ใบไม้เป็นจำนวนเต็ม โหนดเป็นคู่ (ชนิด, ลิสต์ลูก) ชนิด sum ให้รวมค่า ชนิด max ให้เลือกค่าสูงสุด ทั้งสองชนิดให้ 0 เมื่อไม่มีลูก',
    'def damage(node):\n    # เขียนคำตอบที่นี่\n',
    "def damage(node):\n    if isinstance(node,int):\n        return node\n    op, children = node\n    values = [damage(child) for child in children]\n    return sum(values) if op=='sum' else max(values,default=0)",
    "print(damage(('sum',[2,('max',[-3,-1]),('max',[])])))",
    '1',
    'ลองไล่กรณีเล็กที่สุด แล้วระบุผลที่ต้องส่งกลับในแต่ละขั้น',
  ),
  problem(
    'weighted-jobs',
    2,
    'เลือกงานให้ได้ค่าตอบแทนสูงสุด',
    'CODING',
    'เขียนฟังก์ชัน reward(jobs) แต่ละงานเป็น (เริ่ม, จบ, ค่าจ้าง) เวลาเริ่มน้อยกว่าเวลาจบ เลือกงานไม่ซ้อนกัน งานถัดไปเริ่มตอนงานก่อนจบได้ คืนผลรวมสูงสุด อนุญาตให้ไม่เลือกงาน',
    'def reward(jobs):\n    # เขียนคำตอบที่นี่\n',
    'def reward(jobs):\n    from bisect import bisect_right\n    jobs = sorted(jobs,key=lambda x:x[1])\n    ends = [b for a,b,w in jobs]\n    dp = [0]\n    for i,(a,b,w) in enumerate(jobs):\n        j = bisect_right(ends,a,0,i)\n        dp.append(max(dp[-1],dp[j]+w))\n    return dp[-1]',
    'print(reward([(1,3,4),(2,5,8),(3,5,5)]))',
    '9',
    'ลองไล่กรณีเล็กที่สุด แล้วระบุผลที่ต้องส่งกลับในแต่ละขั้น',
  ),
  problem(
    'rle-stream',
    3,
    'ถอดรหัสแบบจำกัดขนาด',
    'CODING',
    'เขียนฟังก์ชัน decode(src, dst, limit) แต่ละบรรทัดเป็นจำนวนเต็มบวกและอักขระหนึ่งตัวคั่นด้วยช่องว่าง ข้ามบรรทัดผิดรูปแบบ เขียนอักขระซ้ำต่อกันไม่เกิน limit ตัวรวมทั้งไฟล์ คืนจำนวนตัวที่เขียน',
    'def decode(src, dst, limit):\n    # เขียนคำตอบที่นี่\n',
    'def decode(src, dst, limit):\n    used = 0\n    for line in src:\n        fields = line.split()\n        if len(fields)!=2 or len(fields[1])!=1:\n            continue\n        try:\n            n = int(fields[0])\n        except ValueError:\n            continue\n        n = min(max(n,0),limit-used)\n        dst.write(fields[1]*n)\n        used += n\n        if used==limit:\n            break\n    return used',
    "from io import StringIO\nprint(decode(StringIO('2 A\\nbad\\n6 B'),StringIO(),4))",
    '4',
    'ตรวจรูปแบบของแต่ละรายการก่อนอัปเดตสถานะหรือเขียนผล',
  ),
  problem(
    'matrix-reader',
    3,
    'อ่านเมทริกซ์ทีละแถว',
    'CODING',
    'เขียนฟังก์ชัน columns(src) บรรทัดแรกระบุจำนวนคอลัมน์บวก บรรทัดถัดไปเป็นจำนวนเต็มคั่นด้วยช่องว่าง ข้ามแถวที่จำนวนคอลัมน์ผิดหรือแปลงไม่ได้ คืน (ผลรวมรายคอลัมน์, จำนวนแถวที่ข้าม) โดยไม่โหลดทั้งไฟล์',
    'def columns(src):\n    # เขียนคำตอบที่นี่\n',
    'def columns(src):\n    k = int(src.readline())\n    total, bad = [0]*k, 0\n    for line in src:\n        try:\n            row = list(map(int,line.split()))\n            if len(row)!=k:\n                raise ValueError\n        except ValueError:\n            bad += 1\n            continue\n        total = [a+b for a,b in zip(total,row)]\n    return total,bad',
    "from io import StringIO\nprint(columns(StringIO('2\\n1 3\\n2 x\\n4\\n-1 2')))",
    '([0, 5], 2)',
    'ตรวจรูปแบบของแต่ละรายการก่อนอัปเดตสถานะหรือเขียนผล',
  ),
  problem(
    'file-merge',
    3,
    'รวมไฟล์เรียงลำดับ',
    'CODING',
    'เขียนฟังก์ชัน unique_merge(a, b, out) ไฟล์สองไฟล์มีจำนวนเต็มเรียงจากน้อยไปมากบรรทัดละตัว เขียนค่าจากทั้งสองไฟล์ลง out เรียงลำดับไม่ซ้ำและปิดท้ายแต่ละค่าด้วย newline ใช้หน่วยความจำเพิ่ม O(1) คืนจำนวนบรรทัดที่เขียน',
    'def unique_merge(a, b, out):\n    # เขียนคำตอบที่นี่\n',
    "def unique_merge(a, b, out):\n    import heapq\n    prev, count = None, 0\n    for n in heapq.merge(map(int,a),map(int,b)):\n        if n != prev:\n            out.write(str(n)+'\\n')\n            prev, count = n, count+1\n    return count",
    "from io import StringIO\nprint(unique_merge(StringIO('1\\n3\\n3'),StringIO('1\\n2'),StringIO()))",
    '3',
    'ตรวจรูปแบบของแต่ละรายการก่อนอัปเดตสถานะหรือเขียนผล',
  ),
  problem(
    'quoted-ledger',
    3,
    'ตรวจยอดจาก CSV',
    'CODING',
    'เขียนฟังก์ชัน audit(src) อ่าน CSV หัว id,amount เก็บเฉพาะแถวที่ amount แปลงเป็นจำนวนเต็มได้และ id ไม่ว่างหลังตัดช่องว่าง เมื่อ id ซ้ำใช้ค่าล่าสุดที่ถูกต้อง คืน (จำนวน id, ยอดรวม, จำนวนแถวที่ใช้ไม่ได้)',
    'def audit(src):\n    # เขียนคำตอบที่นี่\n',
    "def audit(src):\n    import csv\n    latest, bad = {}, 0\n    for row in csv.DictReader(src):\n        key = (row['id'] or '').strip()\n        try:\n            if not key:\n                raise ValueError\n            latest[key] = int(row['amount'])\n        except (TypeError,ValueError):\n            bad += 1\n    return len(latest),sum(latest.values()),bad",
    'from io import StringIO\nprint(audit(StringIO(\'id,amount\\n"a,b",3\\nx,2\\nx,bad\\nx,5\')))',
    '(2, 8, 1)',
    'ตรวจรูปแบบของแต่ละรายการก่อนอัปเดตสถานะหรือเขียนผล',
  ),
  problem(
    'section-file',
    3,
    'อ่านไฟล์แบบแบ่งหมวด',
    'CODING',
    'เขียนฟังก์ชัน sections(src) หัวหมวดเขียน [ชื่อ] ตามด้วยบรรทัด key=value แยกที่ = ตัวแรก ตัดช่องว่าง ข้ามบรรทัดก่อนหัวหมวดและคีย์ว่าง หมวดซ้ำให้รวมกัน คีย์ซ้ำใช้ค่าล่าสุด คืนดิกชันนารีซ้อน',
    'def sections(src):\n    # เขียนคำตอบที่นี่\n',
    "def sections(src):\n    result, group = {}, None\n    for line in src:\n        line = line.strip()\n        if line.startswith('[') and line.endswith(']'):\n            group = result.setdefault(line[1:-1].strip(),{})\n        elif group is not None and '=' in line:\n            k,v = line.split('=',1)\n            if k.strip():\n                group[k.strip()] = v.strip()\n    return result",
    "from io import StringIO\nprint(sections(StringIO('x=0\\n[A]\\nk=a=b\\n[A]\\nz=4')))",
    "{'A': {'k': 'a=b', 'z': '4'}}",
    'ตรวจรูปแบบของแต่ละรายการก่อนอัปเดตสถานะหรือเขียนผล',
  ),
  problem(
    'log-session',
    3,
    'จับคู่เหตุการณ์ในบันทึก',
    'CODING',
    'เขียนฟังก์ชัน durations(src) แต่ละบรรทัดถูกต้องเป็น เวลา ชื่อ START หรือ END และเรียงตามเวลา START ซ้ำแทนเวลาเริ่มเดิม END ที่ไม่มี START ให้ข้าม คืนเวลารวมต่อชื่อจากช่วงที่ปิดแล้วเท่านั้น',
    'def durations(src):\n    # เขียนคำตอบที่นี่\n',
    "def durations(src):\n    opened, totals = {}, {}\n    for line in src:\n        t, user, op = line.split()\n        if op=='START':\n            opened[user] = int(t)\n        elif user in opened:\n            totals[user] = totals.get(user,0)+int(t)-opened.pop(user)\n    return totals",
    "from io import StringIO\nprint(durations(StringIO('1 A START\\n3 A START\\n5 B END\\n8 A END')))",
    "{'A': 5}",
    'ตรวจรูปแบบของแต่ละรายการก่อนอัปเดตสถานะหรือเขียนผล',
  ),
  problem(
    'block-pooling',
    4,
    'ลดภาพเป็นบล็อก',
    'CODING',
    'เขียนฟังก์ชัน pool(a, k) เมทริกซ์ตัวเลขสองมิติและ k บวก หาค่าสูงสุดแต่ละบล็อก k×k ที่ไม่ซ้อนกัน ตัดขอบที่ไม่เต็มบล็อก คืนลิสต์สองมิติ ถ้าไม่มีบล็อกเต็มคืน [] ห้ามวนลูปทีละพิกเซล',
    'def pool(a, k):\n    # เขียนคำตอบที่นี่\n',
    'def pool(a, k):\n    import numpy as np\n    a = np.asarray(a)\n    h,w = (v//k for v in a.shape)\n    if not h*w:\n        return []\n    return a[:h*k,:w*k].reshape(h,k,w,k).max(axis=(1,3)).tolist()',
    'print(pool([[1,8,9],[4,3,7],[5,2,6]],2))',
    '[[8]]',
    'ระบุ shape ของข้อมูลก่อนและหลังคำนวณแต่ละขั้น',
  ),
  problem(
    'sensor-gaps',
    4,
    'เติมค่าหายรายคอลัมน์',
    'CODING',
    'เขียนฟังก์ชัน impute(a) เมทริกซ์ไม่ว่างใช้ None แทนค่าหาย เติมด้วยค่าเฉลี่ยของคอลัมน์จากข้อมูลเดิม คอลัมน์ที่หายทั้งหมดให้ใช้ค่าเฉลี่ยทุกค่าที่มีอยู่ ถ้าไม่มีค่าเลยใช้ศูนย์ คืนลิสต์ทศนิยมสองมิติ',
    'def impute(a):\n    # เขียนคำตอบที่นี่\n',
    'def impute(a):\n    import numpy as np\n    x = np.asarray(a,dtype=float)\n    ok = ~np.isnan(x)\n    totals = np.where(ok,x,0).sum(axis=0)\n    count = ok.sum(axis=0)\n    fallback = totals.sum()/max(ok.sum(),1)\n    means = np.where(count,totals/np.maximum(count,1),fallback)\n    return np.where(ok,x,means).tolist()',
    'print(impute([[2,None],[4,None],[None,None]]))',
    '[[2.0, 3.0], [4.0, 3.0], [3.0, 3.0]]',
    'ระบุ shape ของข้อมูลก่อนและหลังคำนวณแต่ละขั้น',
  ),
  problem(
    'nearest-centre',
    4,
    'จับคู่จุดกับศูนย์กลาง',
    'CODING',
    'เขียนฟังก์ชัน assign(points, centres) รับเมทริกซ์จุดและศูนย์กลางอย่างน้อยชุดละหนึ่งจุด มิติเท่ากัน ใช้ broadcasting คืนดัชนีศูนย์กลางที่ใกล้แต่ละจุดที่สุดตามระยะยูคลิด ถ้าเสมอเลือกดัชนีแรก',
    'def assign(points, centres):\n    # เขียนคำตอบที่นี่\n',
    'def assign(points, centres):\n    import numpy as np\n    delta = np.asarray(points,dtype=float)[:,None,:]-np.asarray(centres,dtype=float)\n    return (delta**2).sum(axis=2).argmin(axis=1).tolist()',
    'print(assign([[1,0],[4,1]],[[0,0],[2,0],[5,1]]))',
    '[0, 2]',
    'ระบุ shape ของข้อมูลก่อนและหลังคำนวณแต่ละขั้น',
  ),
  problem(
    'rolling-alert',
    4,
    'หาช่วงพลังงานสูงสุด',
    'CODING',
    'เขียนฟังก์ชัน peak_window(a, k) อาร์เรย์หนึ่งมิติและ 1 ≤ k ≤ n คืนดัชนีเริ่มต้นแรกของช่วง k ตัวที่มีผลรวมกำลังสองสูงสุด ใช้ผลรวมสะสมและเวลา O(n)',
    'def peak_window(a, k):\n    # เขียนคำตอบที่นี่\n',
    'def peak_window(a, k):\n    import numpy as np\n    x = np.asarray(a,dtype=float)\n    p = np.r_[0,np.cumsum(x*x)]\n    return int(np.argmax(p[k:]-p[:-k]))',
    'print(peak_window([1,-3,2,0],2))',
    '1',
    'ระบุ shape ของข้อมูลก่อนและหลังคำนวณแต่ละขั้น',
  ),
  problem(
    'row-cosine',
    4,
    'ความคล้ายคลึงรายแถว',
    'CODING',
    'เขียนฟังก์ชัน similarity(a, v) คำนวณ cosine similarity ระหว่างแต่ละแถวของ a กับ v โดยหาร dot product ด้วยผลคูณความยาวเวกเตอร์ ถ้าเวกเตอร์ใดยาวศูนย์ให้ผลเป็น 0 คืนลิสต์ปัดสามตำแหน่ง',
    'def similarity(a, v):\n    # เขียนคำตอบที่นี่\n',
    'def similarity(a, v):\n    import numpy as np\n    x,v = np.asarray(a,float),np.asarray(v,float)\n    den = np.linalg.norm(x,axis=1)*np.linalg.norm(v)\n    scores = np.divide(x@v,den,out=np.zeros(len(x)),where=den!=0)\n    return np.round(scores,3).tolist()',
    'print(similarity([[1,1],[0,0],[-1,0]],[1,0]))',
    '[0.707, 0.0, -1.0]',
    'ระบุ shape ของข้อมูลก่อนและหลังคำนวณแต่ละขั้น',
  ),
  problem(
    'matrix-border',
    4,
    'ผลรวมขอบของทุกหน้าต่าง',
    'CODING',
    'เขียนฟังก์ชัน borders(a, k) หาผลรวมเฉพาะขอบของหน้าต่าง k×k ทุกตำแหน่ง เลื่อนทีละช่อง กำหนด 1 ≤ k ≤ ทั้งสองมิติ มุมต้องนับครั้งเดียว คืนลิสต์สองมิติ',
    'def borders(a, k):\n    # เขียนคำตอบที่นี่\n',
    'def borders(a, k):\n    import numpy as np\n    from numpy.lib.stride_tricks import sliding_window_view\n    w = sliding_window_view(np.asarray(a),(k,k))\n    total = w.sum(axis=(-1,-2))\n    if k>2:\n        total = total-w[...,1:-1,1:-1].sum(axis=(-1,-2))\n    return total.tolist()',
    'print(borders([[1,2,3],[4,5,6],[7,8,9]],3))',
    '[[40]]',
    'ระบุ shape ของข้อมูลก่อนและหลังคำนวณแต่ละขั้น',
  ),
  problem(
    'passenger-rate',
    5,
    'อัตราผ่านเกณฑ์รายชั้นโดยสาร',
    'CODING',
    'เขียนฟังก์ชัน rates(rows) ข้อมูลไม่ว่างเป็น (ชั้นโดยสาร, ผล 0 หรือ 1 หรือ None) คืนอัตราผล 1 ต่อชั้นโดยไม่นับผลที่หายเป็นตัวหาร ตัดชั้นที่ไม่มีผลเลย ปัดสามตำแหน่ง เรียงชั้นตามชื่อ',
    'def rates(rows):\n    # เขียนคำตอบที่นี่\n',
    "def rates(rows):\n    import pandas as pd\n    d = pd.DataFrame(rows,columns=['class','ok'])\n    s = d.dropna(subset=['ok']).groupby('class')['ok'].mean()\n    return s.round(3).to_dict()",
    "print(rates([('B',None),('A',1),('A',0),('B',1)]))",
    "{'A': 0.5, 'B': 1.0}",
    'ตรวจว่าควรกรองแถวก่อนหรือหลังสรุปกลุ่ม',
  ),
  problem(
    'fare-outliers',
    5,
    'ตรวจค่าตั๋วผิดกลุ่ม',
    'CODING',
    'เขียนฟังก์ชัน unusual(rows) รับ (id, ชั้นโดยสาร, ราคา) ใช้ Pandas คืน id ตามลำดับเดิมของผู้ที่จ่ายมากกว่าสองเท่าของมัธยฐานชั้นตนเอง ข้ามราคาที่หายทั้งตอนหามัธยฐานและตอนคัดแถว',
    'def unusual(rows):\n    # เขียนคำตอบที่นี่\n',
    "def unusual(rows):\n    import pandas as pd\n    d = pd.DataFrame(rows,columns=['id','class','fare'])\n    mid = d.groupby('class')['fare'].transform('median')\n    return d.loc[d.fare>2*mid,'id'].tolist()",
    "print(unusual([(1,'A',4),(2,'A',5),(3,'A',15),(4,'B',None)]))",
    '[3]',
    'ตรวจว่าควรกรองแถวก่อนหรือหลังสรุปกลุ่ม',
  ),
  problem(
    'latest-ticket',
    5,
    'ยอดจองหลังแก้ไข',
    'CODING',
    'เขียนฟังก์ชัน bookings(rows) รับ (รหัสจอง, เวลาเป็นจำนวนเต็ม, ท่าเรือ, สถานะ) เก็บรายการล่าสุดต่อรหัส ถ้าเวลาเท่ากันใช้แถวที่มาทีหลัง นับเฉพาะสถานะ active แยกตามท่าเรือ',
    'def bookings(rows):\n    # เขียนคำตอบที่นี่\n',
    "def bookings(rows):\n    import pandas as pd\n    d = pd.DataFrame(rows,columns=['id','t','port','state'])\n    last = d.sort_values('t',kind='stable').drop_duplicates('id',keep='last')\n    return last.loc[last.state=='active'].groupby('port').size().to_dict()",
    "print(bookings([(1,2,'S','cancel'),(1,1,'S','active'),(2,4,'C','active')]))",
    "{'C': 1}",
    'ตรวจว่าควรกรองแถวก่อนหรือหลังสรุปกลุ่ม',
  ),
  problem(
    'running-balance',
    5,
    'จุดติดลบครั้งแรก',
    'CODING',
    'เขียนฟังก์ชัน first_debt(rows) รับ (บัญชี, เวลาเป็นจำนวนเต็ม, ยอดเปลี่ยนแปลง) เรียงตามเวลา เวลาเดียวกันใช้ลำดับแถวเดิม สะสมยอดจากศูนย์แยกบัญชี คืนเวลาติดลบครั้งแรกของแต่ละบัญชีที่เคยติดลบ',
    'def first_debt(rows):\n    # เขียนคำตอบที่นี่\n',
    "def first_debt(rows):\n    import pandas as pd\n    d = pd.DataFrame(rows,columns=['acct','t','delta']).sort_values('t',kind='stable')\n    negative = d.groupby('acct')['delta'].cumsum()<0\n    return d.loc[negative].groupby('acct')['t'].first().to_dict()",
    "print(first_debt([('A',2,-5),('A',1,3),('B',1,1),('A',3,4)]))",
    "{'A': 2}",
    'ตรวจว่าควรกรองแถวก่อนหรือหลังสรุปกลุ่ม',
  ),
  problem(
    'weighted-fares',
    5,
    'ค่าเฉลี่ยถ่วงน้ำหนัก',
    'CODING',
    'เขียนฟังก์ชัน weighted(rows) รับ (เส้นทาง, ราคาต่อคน, จำนวนคน) กรองแถวที่ราคาแปลงเป็นตัวเลขไม่ได้หรือจำนวนคนไม่เป็นบวก จำนวนคนเป็นจำนวนเต็ม คืนค่าเฉลี่ยถ่วงน้ำหนักรายเส้นทาง ปัดสองตำแหน่ง',
    'def weighted(rows):\n    # เขียนคำตอบที่นี่\n',
    "def weighted(rows):\n    import pandas as pd\n    d = pd.DataFrame(rows,columns=['route','fare','n'])\n    d['fare'] = pd.to_numeric(d.fare,errors='coerce')\n    d = d.loc[d.fare.notna() & (d.n>0)].copy()\n    d['total'] = d.fare*d.n\n    g = d.groupby('route')[['total','n']].sum()\n    return (g.total/g.n).round(2).to_dict()",
    "print(weighted([('A','10',2),('A','40',1),('A','?',8)]))",
    "{'A': 20.0}",
    'ตรวจว่าควรกรองแถวก่อนหรือหลังสรุปกลุ่ม',
  ),
  problem(
    'coverage-report',
    5,
    'ตรวจความครบถ้วนของผลสอบ',
    'CODING',
    'เขียนฟังก์ชัน missing(roster, subjects, scores) roster และ subjects เป็นลิสต์ค่าไม่ซ้ำ scores เป็นคู่ (นักศึกษา, วิชา) ที่ส่งแล้ว อาจซ้ำหรืออยู่นอกทะเบียน คืนคู่ที่ยังไม่ส่งตามลำดับทะเบียนแล้วลำดับวิชา ใช้ Pandas โดยสร้างคู่ที่ต้องส่งก่อนเทียบผลจริง',
    'def missing(roster, subjects, scores):\n    # เขียนคำตอบที่นี่\n',
    "def missing(roster, subjects, scores):\n    import pandas as pd\n    required = pd.MultiIndex.from_product([roster,subjects],names=['id','subject'])\n    actual = pd.DataFrame(scores,columns=['id','subject']).set_index(['id','subject']).index\n    return required[~required.isin(actual)].tolist()",
    "print(missing([2,1],['M','S'],[(1,'M'),(2,'S'),(2,'S')]))",
    "[(2, 'M'), (1, 'S')]",
    'ตรวจว่าควรกรองแถวก่อนหรือหลังสรุปกลุ่ม',
  ),
].sort((a, b) => a.module - b.module)
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

