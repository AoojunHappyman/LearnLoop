import Link from 'next/link'
import { ArrowRight, ClipboardList } from 'lucide-react'
import { mathExams } from '@/lib/math-exams'
import { courses } from '@/lib/content'
import { Heading, NeoBadge, NeoButton } from './ui'

export function MathCourse() {
  const course = courses.find((c) => c.id === 'itds113')!
  return (
    <div className="container content">
      <Link href="/courses" className="crumb">
        ← กลับไปที่คลังรายวิชา
      </Link>
      <Heading kicker="ITDS113 · เตรียมไฟนอล" title={course.title}>
        ทบทวนสถิติและความน่าจะเป็นจากบทที่ 1–6 ด้วยข้อสอบปรนัยบทละ 20 ข้อ รวม 120 ข้อ
      </Heading>
      <div className="panel level">
        <ClipboardList size={32} />
        <h3>เลือกบทที่ต้องการฝึก</h3>
        <p>
          แต่ละชุดมี 4 ตัวเลือกต่อข้อ ใช้เวลา 40 นาที
          ส่งคำตอบแล้วดูคะแนนและเหตุผลประกอบเฉลยได้ทุกข้อ
        </p>
        <p>
          ข้อสอบจัดทำใหม่สำหรับฝึกทบทวนตามหัวข้อในเอกสารที่ได้รับ บทที่ 4 รวมเนื้อหาทั้งสองส่วน
        </p>
      </div>
      <h2 className="spaced">บทเรียนในวิชานี้</h2>
      <div className="grid2">
        {mathExams.map((exam, i) => (
          <section className="panel" key={exam.id}>
            <small>บทที่ {i + 1}</small>
            <h3>{exam.topics[0]}</h3>
            <p>{exam.summary}</p>
            <div className="spaced">
              <NeoBadge color="purple">ปรนัย 20 ข้อ · 40 นาที</NeoBadge>
            </div>
            <NeoButton href={'/exams/' + exam.id}>
              ฝึกบทนี้ <ArrowRight size={16} />
            </NeoButton>
          </section>
        ))}
      </div>
    </div>
  )
}
