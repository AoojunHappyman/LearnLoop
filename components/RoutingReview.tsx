import { NetworkChapter } from './NetworkChapter'
import { networkChapters } from '@/lib/network-chapters'

export function RoutingReview() {
  return (
    <NetworkChapter title="Routing Protocols · RIP, OSPF และ BGP" source="Chapter_5_rev3.pdf · หน้า 17–25 และ 28–41" exam={networkChapters[0]} open>
      <p className="spaced">เมื่อโจทย์ถามว่าแพ็กเก็ตจะไปทางไหน ให้แยกสองขั้นก่อน โปรโตคอล routing เลือกเส้นทางสำหรับแต่ละ prefix จากนั้นเมื่อแพ็กเก็ตมาถึง เราเตอร์จึงเลือก prefix ที่ตรงยาวที่สุดจากตารางส่งต่อ ค่า hop, cost และ AS-PATH มีความหมายต่างกัน ต้องอ่านว่าโจทย์ใช้โปรโตคอลใด</p>
      <h3 className="spaced">RIP · Distance Vector</h3>
      <p>แต่ละเราเตอร์เรียนระยะทางจากเพื่อนบ้านแล้วบวกอีกหนึ่ง hop ถ้า B บอกว่าถึงเครือข่าย X ใน 2 hops และ C บอกว่าใช้ 4 hops เราเตอร์ A จะได้เส้นทางผ่าน B เท่ากับ 3 hops และผ่าน C เท่ากับ 5 hops จึงเลือก B แม้ลิงก์ผ่าน C จะมีความเร็วสูงกว่า RIP ใช้ได้ถึง 15 hops และถือค่า 16 ว่าไปไม่ถึง</p>
      <p>เมื่อลิงก์ขาด เพื่อนบ้านอาจยังประกาศเส้นทางเก่ากลับมา ทำให้ค่า hop ค่อย ๆ เพิ่ม เรียกว่า count to infinity วิธี poisoned reverse คือประกาศระยะทางเป็น 16 กลับไปยังเพื่อนบ้านที่เป็นทางผ่านของเส้นทางนั้น เพื่อช่วยป้องกันลูประหว่างสองเครื่อง</p>
      <h3 className="spaced">OSPF · Link State</h3>
      <p>เราเตอร์กระจายข้อมูลสถานะลิงก์ภายใน area เพื่อสร้างแผนที่เครือข่าย แล้วใช้ Dijkstra คำนวณ shortest-path tree จากตัวเอง เครือข่ายขนาดใหญ่แบ่งเป็นหลาย area โดยมี Area Border Router เชื่อมพื้นที่เข้ากับ backbone หรือ Area 0</p>
      <p>ลองไล่ Dijkstra จาก A เมื่อ A–B = 2, A–C = 6, B–C = 1, B–D = 7 และ C–D = 2 เริ่มต้น B มีค่า 2 และ C มีค่า 6 เลือก B ก่อนแล้วปรับ C เป็น 3 และ D เป็น 9 จากนั้นเลือก C แล้วปรับ D เป็น 5 จึงได้ A–B–C–D โดย next hop ที่ A บันทึกสำหรับ D คือ B</p>
      <h3 className="spaced">BGP · Path Vector และนโยบายระหว่าง AS</h3>
      <p>eBGP แลกเส้นทางระหว่าง AS ส่วน iBGP กระจายเส้นทางภายใน AS เดียวกัน เช่น gateway รับ prefix จากผู้ให้บริการผ่าน eBGP แล้วบอกเราเตอร์ภายในผ่าน iBGP เราเตอร์ภายในยังต้องใช้เส้นทางภายใน เช่น OSPF เพื่อไปถึง NEXT-HOP ที่ BGP เลือก</p>
      <p>เมื่อเทียบเส้นทางที่ใช้งานได้ไปยัง prefix เดียวกัน ตามตัวอย่างในบทเรียน ให้พิจารณา LOCAL_PREF ที่สูงกว่าก่อน แล้วจึงดูความยาว AS-PATH เมื่อปัจจัยก่อนหน้าเสมอกัน หากเหลือทางออกที่เทียบเท่ากันและเลือก gateway ที่มีค่าเดินทางภายในต่ำสุด เรียกว่า hot potato routing จำนวน AS ใน AS-PATH กับจำนวนเราเตอร์ที่แพ็กเก็ตผ่านเป็นคนละหน่วย</p>
      <h3 className="spaced">ลองตัดสินใจเหมือนในห้องสอบ</h3>
      <p>เราเตอร์มีเส้นทางไป prefix เดียวกันผ่าน G1 (LOCAL_PREF 200, AS-PATH ยาว 3, OSPF cost ถึง gateway 20) และ G2 (LOCAL_PREF 100, AS-PATH ยาว 2, cost 5) ทั้งสองทางใช้งานได้ ถ้าปัจจัยอื่นเท่ากันจะออกทางใด และหากปรับ LOCAL_PREF ของ G2 เป็น 200 คำตอบเปลี่ยนอย่างไร?</p>
      <details className="spaced"><summary>ดูเฉลยพร้อมเหตุผล</summary><p>ครั้งแรกเลือก G1 เพราะ LOCAL_PREF 200 สูงกว่า เมื่อปรับให้เท่ากัน เลือก G2 เพราะ AS-PATH สั้นกว่า ทั้งสองกรณีตัดสินได้ก่อนถึงขั้นเปรียบเทียบ cost ภายใน ส่วน OSPF ยังมีหน้าที่พาแพ็กเก็ตไปถึง gateway ที่เลือก</p></details>
    </NetworkChapter>
  )
}
