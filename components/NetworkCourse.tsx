import { networkChapters } from '@/lib/network-chapters'
import { NetworkChapter } from './NetworkChapter'
import { RoutingReview } from './RoutingReview'
import Link from 'next/link'
import { networkExam, networkTopics } from '@/lib/network'
import { Heading, NeoButton } from './ui'

export function NetworkCourse() {
  return <div className="container content network-course">
    <Link href="/courses" className="crumb">← กลับไปที่คลังรายวิชา</Link>
    <Heading kicker="ITDS231 · Year 2" title="Computer Networks">สรุปบทเรียนและกรณีศึกษาสำหรับทบทวนก่อนสอบ</Heading>
    <section className="panel">
      <h2>ข้อสอบเตรียมไฟนอล</h2>
      <p>ปรนัย {networkExam.questions.length} ข้อ · {networkExam.minutes} นาที พร้อมเฉลยแยกตามหัวข้อหลังส่งคำตอบ</p>
      <NeoButton href={'/exams/' + networkExam.id}>เปิดข้อสอบ ITDS231</NeoButton>
    </section>
    <h2 className="spaced">สรุปเนื้อหา</h2>
    <RoutingReview />
    {networkTopics.map((t, i) => <NetworkChapter key={t.title} title={t.title} source={t.source} exam={networkChapters[i + 1]}>
      {t.notes.map(note => <p className="spaced" key={note}>{note}</p>)}
      {t.review.map(([label, text]) => <div className="spaced" key={label}>
        <h3>{label}</h3><p>{text}</p>
      </div>)}
      <details className="spaced"><summary>ดูเฉลยพร้อมเหตุผล</summary><p>{t.solution}</p></details>
    </NetworkChapter>)}
  </div>
}
