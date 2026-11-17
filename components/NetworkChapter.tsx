import type { ReactNode } from 'react'
import { NeoButton } from './ui'

export function NetworkChapter({ title, source, exam, children, open }: {
  title: string
  source: string
  exam: { id: string; questions: unknown[] }
  children: ReactNode
  open?: boolean
}) {
  return (
    <details className="panel network-chapter" open={open}>
      <summary><strong>{title}</strong></summary>
      <div className="network-reading">{children}</div>
      <div className="network-chapter-end">
        <p>อ่านเพิ่มเติมใน {source}</p>
        <NeoButton href={'/exams/' + exam.id}>ทำข้อสอบบทนี้ · {exam.questions.length} ข้อ</NeoButton>
      </div>
    </details>
  )
}
