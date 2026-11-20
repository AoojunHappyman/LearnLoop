const examples = [
  {
    title: 'VLSM · แบ่ง 192.168.10.0/24 ให้ 100, 50 และ 20 โฮสต์',
    steps: [
      'เรียงความต้องการจากมากไปน้อย แล้วหาขนาดบล็อกที่รองรับได้ โดยหัก network และ broadcast',
      '100 โฮสต์ต้องใช้ /25 มี 126 ที่อยู่ใช้งานได้ จัด 192.168.10.0/25 ช่วงโฮสต์ .1–.126 และ broadcast .127',
      '50 โฮสต์ใช้ /26 จัดบล็อกถัดไปที่ .128/26 ช่วงโฮสต์ .129–.190 และ broadcast .191',
      '20 โฮสต์ใช้ /27 จัด .192/27 ช่วงโฮสต์ .193–.222 และ broadcast .223 เหลือ .224/27 สำหรับงานอื่น',
    ],
  },
  {
    title: 'BGP · ตัดสินใจทีละเกณฑ์',
    steps: [
      'เส้นทาง X มี LOCAL_PREF 200, AS-PATH ยาว 4 และ cost ภายใน 30 ส่วน Y มี LOCAL_PREF 100, AS-PATH ยาว 2 และ cost 5 ทั้งคู่ไปถึงปลายทางได้',
      'เปรียบเทียบ LOCAL_PREF ก่อน จึงเลือก X แม้จำนวน AS และ cost ภายในสูงกว่า',
      'ถ้าปรับ LOCAL_PREF ของ Y เป็น 200 และปัจจัยก่อนหน้าอื่นเท่ากัน เลือก Y จาก AS-PATH ที่สั้นกว่า',
      'ถ้าทั้ง LOCAL_PREF และ AS-PATH รวมถึงเงื่อนไขก่อนหน้าเสมอกัน จึงพิจารณา cost ไป NEXT-HOP ตามตัวอย่าง hot potato ในบทเรียน',
    ],
  },
  {
    title: 'TCP · ไล่ ACK เมื่อมีช่องว่าง',
    steps: [
      'ผู้รับรับไบต์ถึง 999 แล้ว จึงคาดไบต์ 1000 และประกาศ ACK 1000',
      'segment 1200–1299 มาถึงก่อน ผู้รับยังตอบ ACK 1000 เพราะขาด 1000–1199',
      'สมมติผู้รับเก็บข้อมูลที่มาผิดลำดับไว้ เมื่อ 1000–1199 มาถึงครบ ตอนนี้มีข้อมูลต่อเนื่องถึง 1299 จึงตอบ ACK 1300',
      'ถ้า cwnd=8 KB, rwnd=12 KB และข้อมูลค้าง ACK=6 KB ผู้ส่งส่งเพิ่มได้ min(8,12)-6=2 KB',
    ],
  },
]
export function NetworkWalkthroughs() {
  return <section className="panel spaced">
    <h2>ตัวอย่างทำโจทย์ทีละขั้น</h2>
    {examples.map(example => <details className="spaced" key={example.title}>
      <summary><strong>{example.title}</strong></summary>
      <ol>{example.steps.map(step => <li className="spaced" key={step}>{step}</li>)}</ol>
    </details>)}
  </section>
}
