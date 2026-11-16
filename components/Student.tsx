'use client'
import Link from 'next/link'
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
  Bug,
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
  leaderboard: 'อันดับผู้เรียน',
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
export function Student({ section }: { section: string }) {
  const { data, logout } = useProgress(),
    done = currentSubmissions(data.submissions).map((x) => x.exerciseId),
    { xp, week, streak, earnedWeek } = analytics(data.submissions),
    pct = Math.round((done.length * 100) / exercises.length),
    next = exercises.find((e) => !done.includes(e.id)) || exercises[0],
    level = 1 + Math.floor(xp / 200),
    name = data.user?.name || 'ผู้เรียนรับเชิญ'
  const awards = [
    {
      title: 'ก้าวแรกกับ Hello World',
      description: 'ทำโจทย์ข้อแรกสำเร็จ',
      earned: data.submissions.length > 0,
      Icon: Terminal,
    },
    {
      title: 'มือใหม่ Python',
      description: 'ทำโจทย์ Python สำเร็จ 20 ข้อ',
      earned: data.submissions.length >= 20,
      Icon: Star,
    },
    {
      title: 'นักล่าบั๊ก',
      description: 'แก้โจทย์หาข้อผิดพลาดสำเร็จ 10 ข้อ',
      earned:
        exercises.filter((e) => e.type === 'DEBUGGING' && done.includes(e.id))
          .length >= 10,
      Icon: Bug,
    },
    {
      title: 'เรียนต่อเนื่อง',
      description: 'ทำโจทย์ต่อเนื่องครบ 7 วัน',
      earned: earnedWeek,
      Icon: Flame,
    },
    {
      title: 'เซียน Python',
      description: 'ทำโจทย์ ITDS120 ครบทุกข้อ',
      earned: done.length === exercises.length,
      Icon: Trophy,
    },
  ]
  const mastered = modules.map((m) => {
    const items = exercises.filter((e) => e.module === m.id)
    return {
      m,
      value: Math.round(
        (items.filter((e) => done.includes(e.id)).length * 100) / items.length,
      ),
    }
  })
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
      {awards.map(({ title, description, earned, Icon }) => (
        <NeoCard key={title} className={earned ? 'level' : ''}>
          <Icon size={36} />
          <h3>{title}</h3>
          <p>{description}</p>
          <NeoBadge color={earned ? 'mint' : 'cream'}>
            {earned ? <Check size={13} /> : <LockKeyhole size={13} />}{' '}
            {earned ? 'ได้รับแล้ว' : 'ยังไม่ปลดล็อก'}
          </NeoBadge>
        </NeoCard>
      ))}
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
                  .join(' · ') ||
                  'ทำโจทย์ให้สำเร็จหนึ่งข้อเพื่อรับเหรียญก้าวแรกกับ Hello World'}
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
          <div className="actions">
            {data.user ? (
              <NeoButton tone="white" onClick={logout}>
                ออกจากระบบทดลอง
              </NeoButton>
            ) : (
              <NeoButton href="/login">เข้าสู่ระบบทดลอง</NeoButton>
            )}
          </div>
        </>
      ) : section === 'achievements' ? (
        <>
          <Heading kicker="เหรียญสะสมของคุณ" title="เหรียญรางวัล">
            {awards.filter((a) => a.earned).length} จาก {awards.length}{' '}
            เหรียญที่ปลดล็อกแล้ว
          </Heading>
          {achievements}
        </>
      ) : (
        <>
          <Heading kicker="ชุมชนผู้เรียน · อันดับตัวอย่าง" title="อันดับผู้เรียน">
            เปรียบเทียบ XP ที่คุณสะสมในเบราว์เซอร์นี้กับคะแนนของผู้เรียนตัวอย่าง
          </Heading>
          <section className="panel">
            {[
              { n: 'Mira K.', xp: 640 },
              { n: 'Arun P.', xp: 515 },
              { n: 'Nina S.', xp: 390 },
              { n: 'Theo L.', xp: 240 },
              { n: name + ' (คุณ)', xp },
            ]
              .sort((a, b) => b.xp - a.xp)
              .map((s, i) => (
                <div className="listrow spaced" key={s.n}>
                  <div className="row">
                    <span className="num">{i + 1}</span>
                    <strong>{s.n}</strong>
                  </div>
                  <NeoBadge color="yellow">{s.xp} XP</NeoBadge>
                </div>
              ))}
          </section>
        </>
      )}
    </div>
  )
}
