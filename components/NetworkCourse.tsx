import { RoutingReview } from './RoutingReview'
import Link from 'next/link'
import { networkExam, networkTopics } from '@/lib/network'
import { Heading, NeoButton } from './ui'

export function NetworkCourse() {
  return <div className="container content">
    <Link href="/courses" className="crumb">← กลับไปที่คลังรายวิชา</Link>
    <Heading kicker="ITDS231 · Year 2" title="Computer Networks">สรุปบทเรียนและกรณีศึกษาสำหรับทบทวนก่อนสอบ</Heading>
    <section className="panel">
      <h2>ข้อสอบเตรียมไฟนอล</h2>
      <p>ปรนัย {networkExam.questions.length} ข้อ · {networkExam.minutes} นาที พร้อมเฉลยแยกตามหัวข้อหลังส่งคำตอบ</p>
      <NeoButton href={'/exams/' + networkExam.id}>เปิดข้อสอบ ITDS231</NeoButton>
    </section>
    <h2 className="spaced">สรุปเนื้อหา</h2>
    <RoutingReview />
    {networkTopics.map(t => <details className="panel spaced" key={t.title}>
      <summary><strong>{t.title}</strong></summary>
      {t.notes.map(note => <p className="spaced" key={note}>{note}</p>)}
      {t.review.map(([label, text]) => <div className="spaced" key={label}>
        <h3>{label}</h3><p>{text}</p>
      </div>)}
      <details className="spaced"><summary>ดูเฉลยพร้อมเหตุผล</summary><p>{t.solution}</p></details>
      <small>อ่านเพิ่มเติมใน {t.source}</small>
    </details>)}
  </div>
}
