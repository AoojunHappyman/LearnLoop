import type { Exam } from './content'

export const exam: Exam = {
  id: 'itds120-mock',
  minutes: 60,
  topics: ['Dictionary', 'Function', 'File I/O', 'NumPy', 'Pandas'],
}

export const questions = [
  {
    topic: 'Dictionary',
    prompt: 'เมื่อสะสมยอดขายแยกตามรหัสสินค้า โปรแกรมจะแสดงค่าใด',
    code: "sales = {}\nfor item, qty in [('A', 2), ('B', 3), ('A', 4)]:\n    sales[item] = sales.get(item, 0) + qty\nprint(sales['A'], len(sales))",
    choices: ['4 2', '6 3', '6 2', '4 3'],
    correct: 2,
    explanation:
      'get(item, 0) ให้ค่าเริ่มต้นเป็น 0 ยอดของ A จึงรวมเป็น 2 + 4 ส่วนจำนวนคีย์ที่ไม่ซ้ำมี 2 คีย์',
  },
  {
    topic: 'Dictionary',
    prompt: 'หลังแก้คะแนนผ่านตัวแปร backup คะแนนใน original จะเป็นเท่าไร',
    code: "original = {'Ann': {'final': 72}}\nbackup = original.copy()\nbackup['Ann']['final'] += 8\nprint(original['Ann']['final'])",
    choices: ['80', '72', '8', 'KeyError'],
    correct: 0,
    explanation:
      'copy() คัดลอกเฉพาะดิกชันนารีชั้นนอก ทั้งสองตัวจึงยังอ้างถึงดิกชันนารีคะแนนของ Ann ตัวเดียวกัน',
  },
  {
    topic: 'Dictionary',
    prompt: 'ดิกชันนารีผลลัพธ์จะมีรายการใดบ้าง',
    code: "scores = {'Kai': 49, 'May': 50, 'Nok': 75}\npassed = {k: v for k, v in scores.items() if v >= 50}\nprint(passed)",
    choices: [
      "{'Nok': 75}",
      "{'Kai': 49}",
      "{50: 'May', 75: 'Nok'}",
      "{'May': 50, 'Nok': 75}",
    ],
    correct: 3,
    explanation:
      'เงื่อนไข >= 50 รวม May ที่ได้พอดี 50 ด้วย ส่วน k: v เก็บชื่อเป็นคีย์และคะแนนเป็นค่า',
  },
  {
    topic: 'Dictionary',
    prompt: 'เมื่อโอนที่นั่งจากรอบเช้าไปยังรอบเย็น โปรแกรมจะแสดงอะไร',
    code: "seats = {'am': 3, 'pm': 2}\nseats['pm'] += seats.pop('am')\nprint(seats.get('am', 0), seats['pm'])",
    choices: ['3 5', '0 5', '0 2', 'KeyError'],
    correct: 1,
    explanation:
      "pop('am') คืนค่า 3 และลบคีย์ am จึงเหลือ pm เท่ากับ 5 เมื่ออ่าน am ด้วย get จะได้ค่าเริ่มต้น 0",
  },
  {
    topic: 'Function',
    prompt: 'เมื่อเรียกฟังก์ชันด้วยอาร์กิวเมนต์ตามตัวอย่าง ยอดสุทธิเป็นเท่าไร',
    code: 'def net(price, discount=10, fee=5):\n    return price - discount + fee\n\nprint(net(100, fee=2))',
    choices: ['97', '92', '107', '87'],
    correct: 1,
    explanation:
      'fee ถูกกำหนดเป็น 2 ด้วยชื่ออาร์กิวเมนต์ ส่วน discount ใช้ค่าเริ่มต้น 10 จึงได้ 100 − 10 + 2',
  },
  {
    topic: 'Function',
    prompt: 'หลังฟังก์ชันทำงานเสร็จ ลิสต์เดิมกับค่าที่คืนมาจะเป็นอย่างไร',
    code: 'def revise(items):\n    items.append(3)\n    items = [9]\n    return items\n\nvalues = [1, 2]\nresult = revise(values)\nprint(values, result)',
    choices: ['[1, 2] [9]', '[9] [9]', '[1, 2, 3] [1, 2, 3]', '[1, 2, 3] [9]'],
    correct: 3,
    explanation:
      'append แก้ลิสต์เดิมที่ผู้เรียกส่งมา ส่วน items = [9] เปลี่ยนเฉพาะตัวแปรภายในฟังก์ชันให้ชี้ไปยังลิสต์ใหม่',
  },
  {
    topic: 'Function',
    prompt: 'โปรแกรมจะพิมพ์อะไรเมื่อเรียกใช้ฟังก์ชันนี้',
    code: 'def first_pass(scores):\n    for score in scores:\n        if score >= 50:\n            return score\n    return None\n\nprint(first_pass([40, 55, 80]))',
    choices: ['55', '80', 'None', '[55, 80]'],
    correct: 0,
    explanation: 'return ยุติการเรียกฟังก์ชันทันทีที่พบคะแนนแรกที่ผ่านเกณฑ์ จึงไม่ตรวจต่อถึง 80',
  },
  {
    topic: 'Function',
    prompt: 'แยกค่าที่ฟังก์ชันคืนออกจากตัวแปรภายนอก แล้วระบุผลลัพธ์',
    code: 'rate = 2\ndef charge(n):\n    rate = 3\n    return n * rate\n\nprint(charge(4), rate)',
    choices: ['12 3', '8 2', '12 2', '8 3'],
    correct: 2,
    explanation:
      'rate ภายใน charge เป็นตัวแปรท้องถิ่น จึงใช้ 3 คูณ 4 ขณะที่ rate ภายนอกยังมีค่า 2',
  },
  {
    topic: 'File I/O',
    prompt: 'ถ้าเปิดไฟล์เดิมเพื่อเขียนต่อท้าย ข้อความที่อ่านกลับมาจะเป็นอะไร',
    code: "with open('log.txt', 'w', encoding='utf-8') as f:\n    f.write('A\\n')\nwith open('log.txt', 'a', encoding='utf-8') as f:\n    f.write('B\\n')\nwith open('log.txt', encoding='utf-8') as f:\n    print(f.read().splitlines())",
    choices: ["['B']", "['A', '', 'B', '']", "['AB']", "['A', 'B']"],
    correct: 3,
    explanation:
      'โหมด a เขียนต่อจากท้ายไฟล์ และ splitlines() แยกข้อความตามบรรทัดโดยตัดอักขระขึ้นบรรทัดใหม่ออก',
  },
  {
    topic: 'File I/O',
    prompt:
      'กำหนดให้ scores.txt มีสองบรรทัดคือ 12 และ 8 ตามลำดับ หลังอ่านบรรทัดแรกแล้วจะได้ผลใด',
    code: "with open('scores.txt', encoding='utf-8') as f:\n    first = int(f.readline())\n    rest = sum(int(line) for line in f)\nprint(first, rest)",
    choices: ['12 20', '20 0', '12 8', '12 0'],
    correct: 2,
    explanation:
      'readline() เลื่อนตำแหน่งอ่านผ่านบรรทัดแรก การวนอ่านจาก f ต่อจึงพบเฉพาะบรรทัดที่มีค่า 8',
  },
  {
    topic: 'File I/O',
    prompt: 'ไฟล์ roster.txt มีข้อความตามตัวแปร text โปรแกรมจะนับได้กี่บรรทัด',
    code: "text = ' Ann \\n\\n   \\nKai\\n'\nwith open('roster.txt', 'w', encoding='utf-8') as f:\n    f.write(text)\nwith open('roster.txt', encoding='utf-8') as f:\n    print(sum(1 for line in f if line.strip()))",
    choices: ['3', '2', '4', '5'],
    correct: 1,
    explanation:
      'strip() ทำให้บรรทัดว่างและบรรทัดที่มีแต่ช่องว่างกลายเป็นสตริงว่าง จึงนับเฉพาะ Ann และ Kai',
  },
  {
    topic: 'File I/O',
    prompt:
      'กำหนดให้ code.txt มีข้อความ ABCD โดยไม่มีอักขระขึ้นบรรทัดใหม่ โปรแกรมจะแสดงอะไร',
    code: "with open('code.txt', encoding='utf-8') as f:\n    a = f.read(2)\n    f.seek(0)\n    b = f.read(1)\nprint(a, b)",
    choices: ['AB A', 'AB C', 'AB AB', 'CD A'],
    correct: 0,
    explanation:
      'read(2) อ่าน AB จากนั้น seek(0) ย้ายตำแหน่งอ่านกลับไปต้นไฟล์ จึงอ่านตัวแรกได้ A',
  },
  {
    topic: 'NumPy',
    prompt: 'คอลัมน์แทนวิชาและแถวแทนนักศึกษา ผลรวมคะแนนรายวิชาคือข้อใด',
    code: 'import numpy as np\nscores = np.array([[10, 20], [30, 40], [50, 60]])\nprint(scores.sum(axis=0).tolist())',
    choices: ['[90, 120]', '[30, 70, 110]', '[60, 150]', '210'],
    correct: 0,
    explanation:
      'การรวมตาม axis=0 รวมค่าข้ามแถวในแต่ละคอลัมน์ วิชาแรกได้ 10 + 30 + 50 และวิชาที่สองได้ 20 + 40 + 60',
  },
  {
    topic: 'NumPy',
    prompt: 'หลังบวกโบนัสรายวิชาด้วย broadcasting นักศึกษาคนที่สองจะได้คะแนนเท่าไร',
    code: 'import numpy as np\nscores = np.array([[10, 20, 30], [40, 50, 60]])\nbonus = np.array([1, 2, 3])\nprint((scores + bonus)[1].tolist())',
    choices: ['[42, 52, 62]', '[11, 22, 33]', '[46, 56, 66]', '[41, 52, 63]'],
    correct: 3,
    explanation:
      'อาร์เรย์โบนัสยาว 3 ตรงกับจำนวนคอลัมน์ จึงบวก [1, 2, 3] ให้แต่ละแถว แล้วเลือกแถวที่ดัชนี 1',
  },
  {
    topic: 'NumPy',
    prompt: 'หลังใช้หน้ากากบูลีน ค่าที่เหลือมีผลรวมเท่าไร',
    code: 'import numpy as np\na = np.array([2, 5, 8, 11, 14])\nmask = (a > 4) & (a % 2 == 0)\nprint(a[mask].sum())',
    choices: ['27', '24', '22', '40'],
    correct: 2,
    explanation:
      'เครื่องหมาย & เชื่อมสองเงื่อนไขแบบรายสมาชิก มีเพียง 8 และ 14 ที่มากกว่า 4 และเป็นเลขคู่',
  },
  {
    topic: 'NumPy',
    prompt: 'เมื่อแก้ค่าผ่านสไลซ์ อาร์เรย์ต้นฉบับจะเป็นอย่างไร',
    code: 'import numpy as np\na = np.arange(6)\nb = a[1:5:2]\nb[:] = -1\nprint(a.tolist())',
    choices: [
      '[0, 1, 2, 3, 4, 5]',
      '[0, -1, 2, -1, 4, 5]',
      '[0, -1, -1, -1, -1, 5]',
      '[-1, 1, -1, 3, -1, 5]',
    ],
    correct: 1,
    explanation:
      'สไลซ์พื้นฐานนี้เป็น view ที่อ้างข้อมูลเดิม ดัชนีที่เลือกคือ 1 และ 3 การแก้ b จึงเปลี่ยนสองตำแหน่งนี้ใน a',
  },
  {
    topic: 'Pandas',
    prompt: 'เมื่อกรองนักศึกษาที่ได้คะแนนผ่าน จะได้รายชื่อใด',
    code: "import pandas as pd\ndf = pd.DataFrame({'name': ['Ann', 'Kai', 'May'], 'score': [49, 50, 72]})\nprint(df.loc[df['score'] >= 50, 'name'].tolist())",
    choices: ["['May']", "['Ann', 'Kai']", "['Kai', 'May']", '[50, 72]'],
    correct: 2,
    explanation:
      'loc ใช้เงื่อนไขเลือกแถวที่ได้อย่างน้อย 50 แล้วดึงเฉพาะคอลัมน์ name ตามลำดับแถวเดิม',
  },
  {
    topic: 'Pandas',
    prompt: 'หลังจัดกลุ่มตามห้อง ค่าเฉลี่ยของห้อง A เท่ากับเท่าไร',
    code: "import pandas as pd\ndf = pd.DataFrame({'room': ['A', 'B', 'A'], 'score': [60, 90, 80]})\nprint(df.groupby('room')['score'].mean().loc['A'])",
    choices: ['76.67', '70.0', '140.0', '60.0'],
    correct: 1,
    explanation: 'ห้อง A มีสองคะแนนคือ 60 และ 80 ค่าเฉลี่ยของกลุ่มนี้จึงเป็น (60 + 80) / 2',
  },
  {
    topic: 'Pandas',
    prompt: 'เมื่อแทนค่าที่หายไปด้วยมัธยฐาน ค่าเฉลี่ยใหม่เป็นเท่าไร',
    code: 'import pandas as pd\ns = pd.Series([10, None, 30])\nprint(s.fillna(s.median()).mean())',
    choices: ['20.0', '13.33', '30.0', 'NaN'],
    correct: 0,
    explanation:
      'median() ข้ามค่าที่หายไปจึงได้ 20 เมื่อนำไปเติมจะได้ [10, 20, 30] ซึ่งมีค่าเฉลี่ย 20',
  },
  {
    topic: 'Pandas',
    prompt: 'เมื่อเชื่อมตารางด้วย left join จะมีนักศึกษากี่คนที่ไม่มีคะแนนในตารางผลสอบ',
    code: "import pandas as pd\nenrolled = pd.DataFrame({'id': [1, 2, 3]})\nmarks = pd.DataFrame({'id': [1, 3], 'score': [80, 90]})\nresult = enrolled.merge(marks, on='id', how='left')\nprint(result['score'].isna().sum())",
    choices: ['0', '2', '3', '1'],
    correct: 3,
    explanation:
      'left join เก็บ id จาก enrolled ครบทั้งสามค่า แต่ id 2 ไม่มีคะแนนใน marks จึงมีค่าที่หายไปหนึ่งแถว',
  },
]

export const topicPractice: Record<string, string> = {
  Dictionary: 'dict-key',
  Function: 'return-total',
  'File I/O': 'safe-file',
  NumPy: 'numpy-axis',
  Pandas: 'pandas-select',
}
