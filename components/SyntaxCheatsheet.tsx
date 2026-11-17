const topics = [
  {
    name: 'Dictionary',
    use: 'ค้นค่า นับความถี่ และวนคู่คีย์–ค่า',
    code: `counts = {}
for word in ["cat", "dog", "cat"]:
    counts[word] = counts.get(word, 0) + 1

print(counts["cat"])            # 2
print("bird" in counts)         # False
for key, value in counts.items():
    print(key, value)           # cat 2 แล้วตามด้วย dog 1`,
    note: 'ใช้ d[key] เมื่อมั่นใจว่ามีคีย์ ถ้าคีย์อาจขาด ให้ใช้ d.get(key, ค่าเริ่มต้น) การเรียก get อย่างเดียวจะยังไม่เพิ่มคีย์ลงใน dict',
  },
  {
    name: 'Function',
    use: 'กำหนดพารามิเตอร์ เรียกด้วยชื่อ และคืนค่า',
    code: `def passed(scores, cutoff=50):
    return [s for s in scores if s >= cutoff]

print(passed([45, 50, 80]))             # [50, 80]
print(passed([45, 50, 80], cutoff=70))  # [80]`,
    note: 'return ส่งค่ากลับและจบการทำงานของฟังก์ชันทันที ส่วน print แสดงข้อความ ถ้าฟังก์ชันทำงานจนจบโดยไม่มี return ผู้เรียกจะได้รับ None',
  },
  {
    name: 'File I/O',
    use: 'เปิดไฟล์ เขียนข้อความ และอ่านทีละบรรทัด',
    code: `with open("scores.txt", "w", encoding="utf-8") as f:
    f.write("70\\n85\\n")

with open("scores.txt", "r", encoding="utf-8") as f:
    scores = [int(line.strip()) for line in f if line.strip()]

print(sum(scores))  # 155`,
    note: 'โหมด r เปิดอ่าน, w สร้างไฟล์หรือเขียนทับเนื้อหาเดิม และ a เขียนต่อท้าย ใช้ with เพื่อปิดไฟล์อัตโนมัติเมื่อออกจากบล็อก',
  },
  {
    name: 'NumPy',
    use: 'เลือกข้อมูลตามตำแหน่ง กรองค่า และคำนวณตามแกน',
    code: `import numpy as np

a = np.array([[2, 4, 6], [1, 3, 5]])
print(a.shape)                 # (2, 3)
print(a[:, 1].tolist())        # [4, 3]
print(a[a > 3].tolist())       # [4, 6, 5]
print(a.sum(axis=0).tolist())  # [3, 7, 11]
print(a.sum(axis=1).tolist())  # [12, 9]`,
    note: 'สำหรับตารางสองมิติ axis=0 รวมข้ามแถว ได้หนึ่งค่าต่อคอลัมน์ ส่วน axis=1 รวมข้ามคอลัมน์ ได้หนึ่งค่าต่อแถว',
  },
  {
    name: 'Pandas',
    use: 'กรองแถว เลือกคอลัมน์ และสรุปผลรายกลุ่ม',
    code: `import pandas as pd

df = pd.DataFrame({"team": ["A", "B", "A"], "score": [60, 80, 90]})
high = df.loc[df["score"] >= 80, ["team", "score"]]
print(high["team"].tolist())  # ['B', 'A']

means = df.groupby("team")["score"].mean()
print(means.to_dict())        # {'A': 75.0, 'B': 80.0}`,
    note: 'ใช้ .loc[เงื่อนไขแถว, รายชื่อคอลัมน์] เมื่อกรองด้วยค่า และใช้ .iloc เมื่อเลือกตามตำแหน่ง เช่น df.iloc[0, 1] ได้ 60',
  },
]

export function SyntaxCheatsheet() {
  return (
    <section className="panel spaced syntax-sheet" aria-labelledby="syntax-title">
      <h2 id="syntax-title">Python Syntax Cheatsheet</h2>
      {topics.map(({ name, use, code, note }) => (
        <details key={name}>
          <summary><strong>{name}</strong> · {use}</summary>
          <pre><code>{code}</code></pre>
          <p>{note}</p>
        </details>
      ))}
    </section>
  )
}
