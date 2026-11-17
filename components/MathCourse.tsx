import Link from 'next/link'
import { ArrowRight, ClipboardList } from 'lucide-react'
import { mathFinal } from '@/lib/math-exams'
import { courses } from '@/lib/content'
import { Heading, NeoButton } from './ui'

export function MathCourse() {
  const course = courses.find((c) => c.id === 'itds113')!
  return (
    <div className="container content">
      <Link href="/courses" className="crumb">
        ← กลับไปที่คลังรายวิชา
      </Link>
      <Heading kicker="ITDS113 · เตรียมไฟนอล" title={course.title}>
        ทบทวนสถิติและความน่าจะเป็นจากบทที่ 1–6 ด้วยข้อสอบปรนัยชุดเดียว 50 ข้อ
      </Heading>
      <div className="panel level">
        <ClipboardList size={32} />
        <h3>ข้อสอบเตรียมไฟนอล ITDS113</h3>
        <p>ปรนัย 4 ตัวเลือก · {mathFinal.questions.length} ข้อ · {mathFinal.minutes} นาที</p>
        <p>ส่งคำตอบแล้วดูคะแนนแยกตามบทและเฉลยอธิบายได้ทุกข้อ</p>
        <NeoButton href={'/exams/' + mathFinal.id}>
          เปิดข้อสอบ <ArrowRight size={16} />
        </NeoButton>
      </div>
      <h2 className="spaced">บทที่ออกสอบ</h2>
      <ol>{mathFinal.topics.map((topic, i) => <li key={topic}>บทที่ {i + 1} · {topic}</li>)}</ol>
    </div>
  )
}
