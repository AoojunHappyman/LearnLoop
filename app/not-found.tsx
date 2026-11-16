import { Heading, NeoButton } from '@/components/ui'
export default function Missing() {
  return (
    <div className="container content">
      <Heading kicker="404" title="ไม่พบหน้าที่ต้องการ">
        ไม่พบหน้าบทเรียนนี้ ลองเลือกวิชาจากคลังรายวิชา
      </Heading>
      <NeoButton href="/courses">สำรวจรายวิชา</NeoButton>
    </div>
  )
}
