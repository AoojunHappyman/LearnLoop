'use client'
import Link from 'next/link'
import { useState } from 'react'
import { readGuest } from '@/lib/learning-records'
import { allExams, examCatalog } from '@/lib/exam'
import { attemptKey } from '@/lib/exam-results'
import { usePathname } from 'next/navigation'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import {
  Trophy,
  Flame,
  Star,
  BookOpen,
  Braces,
  FileText,
  Grid3X3,
  Table2,
  Terminal,
  LockKeyhole,
  Check,
  ArrowRight,
} from 'lucide-react'
import { useProgress } from '@/lib/progress'
import {
  Submission,
  exercises,
  modules,
  coursePath,
  programmingCourse,
  currentSubmissions,
  modulePath,
  practicePath,
} from '@/lib/content'
import { Heading, NeoButton, NeoCard, NeoBadge, NeoProgressBar } from './ui'
const sections = {
  dashboard: 'ภาพรวมการเรียน',
  profile: 'โปรไฟล์',
  achievements: 'เหรียญรางวัล',
}
function Sidebar() {
  const path = usePathname().replace(/\/$/, '')
  return (
    <nav className="subnav" aria-label="เมนูผู้เรียน">
      {Object.entries(sections).map(([s, label]) => (
        <Link
          key={s}
          href={'/' + s}
          aria-current={path === '/' + s ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
      <Link href="/exams">ข้อสอบฝึกทำ</Link>
    </nav>
  )
}
function dayKey(d: Date) {
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-')
}
function analytics(subs: Submission[]) {
  const now = new Date(),
    days = new Set(subs.map((s) => dayKey(new Date(s.date)))),
    date = new Date()
  let streak = 0
  if (!days.has(dayKey(date))) date.setDate(date.getDate() - 1)
  while (days.has(dayKey(date))) {
    streak++
    date.setDate(date.getDate() - 1)
  }
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - 6 + i)
    return {
      day: d.toLocaleDateString('th', { weekday: 'short' }),
      solved: subs.filter((s) => dayKey(new Date(s.date)) === dayKey(d)).length,
    }
  })
  const earnedWeek = subs.some((submission) => {
    const cursor = new Date(submission.date)
    for (let offset = 0; offset < 7; offset++) {
      if (!days.has(dayKey(cursor))) return false
      cursor.setDate(cursor.getDate() - 1)
    }
    return true
  })
  return { xp: subs.reduce((n, s) => n + s.xp, 0), streak, week, earnedWeek }
}
function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <NeoCard>
      <small>{label}</small>
      <div className="stat">{value}</div>
    </NeoCard>
  )
}
function ActivityChart({ week }: { week: { day: string; solved: number }[] }) {
  return (
    <section className="panel">
      <h3>กิจกรรมประจำสัปดาห์</h3>
      <p>จำนวนโจทย์ที่ทำสำเร็จในแต่ละวัน ย้อนหลัง 7 วัน</p>
      <div style={{ height: 210, marginTop: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={week}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis
              width={26}
              allowDecimals={false}
              domain={[0, (m: number) => Math.max(3, m)]}
            />
            <Tooltip />
            <Bar
              dataKey="solved"
              name="โจทย์ที่ทำสำเร็จ"
              fill="#b8a4ff"
              stroke="#171717"
              strokeWidth={2}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mono">
        {week.map((w) => w.day + ' ' + w.solved).join(' · ')}
      </p>
    </section>
  )
}
export function Student({ section }: { section: keyof typeof sections }) {
  const [choices, setChoices] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [importing, setImporting] = useState(false)
  const [importMessage, setImportMessage] = useState('')
  const { data, logout, importGuest, ready, records } = useProgress(),
    done = currentSubmissions(data.submissions).map((x) => x.exerciseId),
    { xp, week, streak, earnedWeek } = analytics(data.submissions),
    pct = Math.round((done.length * 100) / exercises.length),
    next = exercises.find((e) => !done.includes(e.id)) || exercises[0],
    level = 1 + Math.floor(xp / 200),
    name = data.user?.name || 'ผู้เรียนรับเชิญ'
  const mastered = modules.map((m) => {
    const items = exercises.filter((e) => e.module === m.id)
    const solved = items.filter((e) => done.includes(e.id)).length
    return {
      m,
      solved,
      total: items.length,
      value: Math.round((solved * 100) / items.length),
    }
  })
  const topicIcons = [BookOpen, Braces, FileText, Grid3X3, Table2]
  const awards = [
    {
      title: 'โค้ดแรกผ่านแล้ว',
      description: 'ส่งคำตอบที่ผ่านครั้งแรก',
      count: data.submissions.length,
      target: 1,
      unit: 'ข้อ',
      Icon: Terminal,
    },
    {
      title: 'มือใหม่ Python',
      description: 'สะสมโจทย์ Python ที่ทำสำเร็จ',
      count: data.submissions.length,
      target: 20,
      unit: 'ข้อ',
      Icon: Star,
    },
    ...mastered.map(({ m, solved, total }, i) => ({
      title: m.title,
      description: 'ทำโจทย์ประจำบทให้ครบ',
      count: solved,
      target: total,
      unit: 'ข้อ',
      Icon: topicIcons[i] ?? BookOpen,
    })),
    {
      title: 'เรียนต่อเนื่อง',
      description: 'ทำโจทย์สำเร็จทุกวันติดต่อกันหนึ่งสัปดาห์',
      count: earnedWeek ? 7 : streak,
      target: 7,
      unit: 'วัน',
      Icon: Flame,
    },
    {
      title: 'เซียน Python',
      description: 'ทำโจทย์เตรียมไฟนอล ITDS120 ครบทั้งห้าบท',
      count: done.length,
      target: exercises.length,
      unit: 'ข้อ',
      Icon: Trophy,
    },
    ...examCatalog.map((exam) => ({
      title: 'พร้อมสอบ ' + exam.courseId.toUpperCase(),
      description: 'ตอบถูกอย่างน้อย 80% ในข้อสอบเตรียมไฟนอลหนึ่งครั้ง',
      count: Math.max(0, ...Object.entries(records)
        .filter(([key]) => key.startsWith(attemptKey(exam.id) + ':score:'))
        .map(([, score]) => Number(score) || 0)),
      target: Math.ceil(exam.questions.length * 0.8),
      unit: 'ข้อ',
      Icon: Trophy,
    })),
  ].map((award) => ({
    ...award,
    earned: award.count >= award.target,
    count: Math.min(award.count, award.target),
  }))
  const recommended = [...mastered]
    .sort((a, b) => a.value - b.value)
    .flatMap(({ m }) =>
      exercises.filter((e) => e.module === m.id && !done.includes(e.id)),
    )
    .slice(0, 3)
  const stats = (
    <div className="grid4">
      <StatCard label="XP ทั้งหมด" value={xp} />
      <StatCard label="โจทย์ที่ทำสำเร็จ" value={data.submissions.length} />
      <StatCard label="เรียนต่อเนื่อง" value={streak + ' วัน'} />
      <StatCard label="วิชาที่กำลังเรียน" value={done.length && pct < 100 ? 1 : 0} />
    </div>
  )
  const achievements = (
    <div className="grid3">
      {awards.map(
        ({ title, description, earned, count, target, unit, Icon }) => (
          <NeoCard key={title} className={earned ? 'level' : ''}>
            <Icon size={36} />
            <h3>{title}</h3>
            <p>{description}</p>
            <NeoProgressBar value={Math.round((count * 100) / target)} />
            <p className="mono">
              {count}/{target} {unit}
              {!earned && ` · อีก ${target - count} ${unit}`}
            </p>
            <NeoBadge color={earned ? 'mint' : 'cream'}>
              {earned ? <Check size={13} /> : <LockKeyhole size={13} />}{' '}
              {earned ? 'ได้รับแล้ว' : 'ยังไม่ปลดล็อก'}
            </NeoBadge>
          </NeoCard>
        ),
      )}
    </div>
  )
  return (
    <div className="container content">
      <Sidebar />
      {section === 'dashboard' ? (
        <>
          <Heading kicker="ภาพรวมการเรียน" title="ยินดีต้อนรับกลับมา วันนี้พร้อมฝึกไหม?">
            {name} · กิจกรรมการเรียนของคุณในเบราว์เซอร์นี้
          </Heading>
          {stats}
          <div className="grid2 spaced">
            <section className="panel level">
              <small>เรียนต่อจากครั้งก่อน</small>
              <h3>{programmingCourse.title}</h3>
              <p>ITDS120 · {pct}%</p>
              <NeoProgressBar value={pct} />
              <p>โจทย์ถัดไป · {next.title}</p>
              <div className="actions">
                <NeoButton href={practicePath(next.id)}>
                  ฝึกต่อ <ArrowRight size={16} />
                </NeoButton>
              </div>
            </section>
            <ActivityChart week={week} />
          </div>
          <div className="grid2">
            <section className="panel">
              <h3>ความคืบหน้ารายหัวข้อ</h3>
              {mastered.map(({ m, value }) => (
                <div key={m.id}>
                  <div className="split">
                    <Link href={modulePath(m.id)}>{m.title}</Link>
                    <b>{value}%</b>
                  </div>
                  <NeoProgressBar value={value} />
                </div>
              ))}
            </section>
            <section className="panel">
              <h3>โจทย์แนะนำ</h3>
              <p>ฝึกเพิ่มในหัวข้อที่คุณยังทำโจทย์ได้น้อย</p>
              {recommended.map((e) => (
                <Link
                  key={e.id}
                  className="listrow spaced"
                  href={practicePath(e.id)}
                >
                  {e.title}
                  <ArrowRight size={16} />
                </Link>
              ))}
              {!recommended.length && (
                <NeoButton href="/exams">ลองทำข้อสอบ</NeoButton>
              )}
            </section>
          </div>
        </>
      ) : section === 'profile' ? (
        <>
          <Heading kicker="โปรไฟล์ผู้เรียน" title={name} />
          <section className="panel level">
            <div className="row">
              <span className="num">{name.slice(0, 2).toUpperCase()}</span>
              <strong>ระดับ {level}</strong>
              <NeoBadge color="yellow">{xp} XP</NeoBadge>
            </div>
            <NeoProgressBar value={(xp % 200) / 2} />
            <p>
              {200 - (xp % 200)} XP เพื่อขึ้นระดับ {level + 1}
            </p>
          </section>
          <div className="spaced">{stats}</div>
          <div className="grid2">
            <div className="panel">
              <h3>ความคืบหน้ารายวิชา</h3>
              <Link href={coursePath} className="under">
                ITDS120 · {pct}%
              </Link>
              <NeoProgressBar value={pct} />
              <h3>เหรียญที่ได้รับ</h3>
              <p>
                {awards
                  .filter((a) => a.earned)
                  .map((a) => a.title)
                  .join(' · ') || 'ทำโจทย์ให้สำเร็จหนึ่งข้อเพื่อรับเหรียญ “โค้ดแรกผ่านแล้ว”'}
              </p>
            </div>
            <div className="panel">
              <h3>กิจกรรมล่าสุด</h3>
              {data.submissions.length ? (
                [...data.submissions]
                  .reverse()
                  .slice(0, 5)
                  .map((s) => (
                    <p key={s.exerciseId}>
                      {exercises.find((e) => e.id === s.exerciseId)?.title ??
                        'โจทย์จากบทเรียนเดิม'}{' '}
                      · +{s.xp} XP
                    </p>
                  ))
              ) : (
                <p>เมื่อส่งคำตอบสำเร็จ โจทย์ที่ทำจะปรากฏที่นี่</p>
              )}
            </div>
          </div>
          {data.user && <section className="panel spaced">
            <h3>นำเข้าผลงานจากเครื่องนี้</h3>
            <p>หากโจทย์ที่ผ่าน แบบร่าง และผลสอบของผู้เรียนรับเชิญบนเครื่องนี้เป็นของคุณ ให้เลือกรายการของคุณก่อนนำเข้า หากเป็นเครื่องที่ใช้ร่วมกัน คุณข้ามขั้นตอนนี้ได้</p>
            <NeoButton tone="white" disabled={!ready || importing} onClick={() => {
              const keys = Object.keys(readGuest()).filter(key => !(key in records))
              setChoices(keys)
              setSelected([])
              setImportMessage(keys.length ? 'เลือกเฉพาะผลงานของคุณ' : 'ไม่มีผลงานเพิ่มเติมให้นำเข้า')
            }}>ดูผลงานบนเครื่องนี้</NeoButton>
            {choices.map(key => {
              const exam = allExams.find(e => key === attemptKey(e.id) || key.startsWith(attemptKey(e.id) + ':score:'))
              const exerciseId = key.slice(key.indexOf(':') + 1)
              const title = exercises.find(e => e.id === exerciseId)?.title ?? exerciseId
              const label = exam ? exam.title + (key.includes(':score:') ? ' · คะแนน ' + key.split(':').pop() : ' · คำตอบที่บันทึกไว้')
                : (key.startsWith('draft:') ? 'แบบร่าง · ' : 'โจทย์ที่ผ่าน · ') + title
              return <label key={key} style={{ display: 'block' }}><input type="checkbox" checked={selected.includes(key)}
                onChange={e => setSelected(e.target.checked ? [...selected, key] : selected.filter(k => k !== key))} /> {label}</label>
            })}
            <NeoButton disabled={!ready || importing || !selected.length} onClick={async () => {
              setImporting(true)
              try {
                await importGuest(selected)
                setChoices([])
                setSelected([])
                setImportMessage('ตรวจและนำเข้ารายการที่บัญชียังไม่มีแล้ว')
              } catch { setImportMessage('นำเข้าไม่ได้ กรุณาลองอีกครั้ง') }
              finally { setImporting(false) }
            }}>นำเข้ารายการที่เลือก</NeoButton>
            <p role="status">{importMessage}</p>
          </section>}
          <div className="actions">
            {data.user ? (
              <NeoButton tone="white" onClick={logout}>
                ออกจากระบบ
              </NeoButton>
            ) : (
              <NeoButton href="/login">เข้าสู่ระบบ</NeoButton>
            )}
          </div>
        </>
      ) : (
        <>
          <Heading kicker="เหรียญสะสมของคุณ" title="เหรียญรางวัล">
            {awards.filter((a) => a.earned).length} จาก {awards.length}{' '}
            เหรียญที่ปลดล็อกแล้ว
          </Heading>
          {achievements}
        </>
      )}
    </div>
  )
}
