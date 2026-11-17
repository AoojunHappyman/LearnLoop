'use client'
import Link from 'next/link'
import { SyntaxCheatsheet } from './SyntaxCheatsheet'
import { ArrowRight, ChevronRight, Check, BookOpen } from 'lucide-react'
import {
  coursePath,
  programmingCourse,
  currentSubmissions,
  modules,
  exercises,
  modulePath,
  practicePath,
  typeLabel,
} from '@/lib/content'
import { Heading, NeoBadge, NeoButton, NeoProgressBar } from './ui'
import { useProgress } from '@/lib/progress'
export function CoursePage() {
  const { data } = useProgress(),
    current = currentSubmissions(data.submissions),
    done = current.map((x) => x.exerciseId),
    pct = Math.round((done.length * 100) / exercises.length),
    next = exercises.find((e) => !done.includes(e.id)) || exercises[0]
  return (
    <div className="container content">
      <Link className="crumb" href="/courses">
        ← กลับไปที่คลังรายวิชา
      </Link>
      <Heading
        kicker="ITDS120 · การเขียนโปรแกรมด้วย Python"
        title={programmingCourse.title}
      >
        เตรียมสอบไฟนอลด้วยตัวอย่างโค้ดและแบบฝึกหัดใน 5 หัวข้อของ ITDS120
      </Heading>
      <div className="grid2">
        <section className="panel level">
          <small>ความก้าวหน้าในวิชานี้</small>
          <div className="stat">{pct}%</div>
          <NeoProgressBar value={pct} />
          <p>
            {done.length} / {exercises.length} ข้อ ·{' '}
            {current.reduce((s, x) => s + x.xp, 0)} XP ที่ได้รับ
          </p>
          <div className="actions">
            <NeoButton href={modulePath(next.module)}>
              เรียนต่อ <ArrowRight size={17} />
            </NeoButton>
          </div>
        </section>
        <section className="panel">
          <BookOpen />
          <h3>เป้าหมายการเรียนรู้</h3>
          <ul>
            <li>อ่านโค้ด Python ไล่ลำดับการทำงาน และแก้ข้อผิดพลาดได้</li>
            <li>ติดตามค่าที่อ่านจาก Dictionary ค่าที่ฟังก์ชันคืน และตำแหน่งอ่านไฟล์ได้</li>
            <li>เลือกแกนคำนวณใน NumPy และกรองหรือสรุปตารางด้วย Pandas ได้</li>
          </ul>
        </section>
      </div>
      <SyntaxCheatsheet />
      <div className="spaced">
        <small>เส้นทางการเรียน</small>
        <h2>บทเรียนในวิชานี้</h2>
        <p>ทบทวนก่อนสอบไฟนอล บทละ 10 โจทย์</p>
      </div>
      <div className="list">
        {modules.map((m) => {
          const items = exercises.filter((e) => e.module === m.id),
            n = items.filter((e) => done.includes(e.id)).length
          return (
            <Link key={m.id} className="listrow" href={modulePath(m.id)}>
              <div className="row">
                <span className="num">{String(m.id).padStart(2, '0')}</span>
                <div>
                  <strong>{m.title}</strong>
                  <p>{m.summary}</p>
                  <div className="metadata">
                    {items[0].difficulty} · {n}/{items.length} ข้อ ·{' '}
                    {n === items.length
                      ? 'เรียนจบแล้ว'
                      : n
                        ? 'กำลังเรียน'
                        : 'พร้อมเริ่มเรียน'}
                  </div>
                </div>
              </div>
              <ChevronRight size={20} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export function ModulePage({ id }: { id: number }) {
  const m = modules[id - 1],
    { data } = useProgress()
  return (
    <div className="container content">
      <Link className="crumb" href={coursePath}>
        ← {programmingCourse.title}
      </Link>
      <Heading
        kicker={'ITDS120 · บทที่ ' + String(id).padStart(2, '0')}
        title={m.title}
      >
        {m.summary}
      </Heading>
      <section className="panel level">
        <h2>ทบทวนก่อนทำโจทย์</h2>
        <p>{m.lesson}</p>
        <h3>ตัวอย่าง</h3>
        <pre>{m.example}</pre>
        <h3>ผลลัพธ์</h3>
        <pre>{m.output}</pre>
        <p>{m.explanation}</p>
      </section>
      <h2 className="spaced">แบบฝึกหัด</h2>
      <div className="list">
        {exercises
          .filter((e) => e.module === id)
          .map((e) => {
            const done = data.submissions.some((s) => s.exerciseId === e.id)
            return (
              <Link className="listrow" key={e.id} href={practicePath(e.id)}>
                <div>
                  <small>{typeLabel[e.type]}</small>
                  <strong>{e.title}</strong>
                  <p>
                    {e.difficulty} · {done ? 'เรียนจบแล้ว' : 'พร้อมฝึก'}
                  </p>
                </div>
                <NeoBadge color={done ? 'mint' : 'yellow'}>
                  {done ? <Check size={13} /> : null}+{e.xp} XP
                </NeoBadge>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

