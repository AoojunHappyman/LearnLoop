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
  modulePath,
  practicePath,
} from '@/lib/content'
import { Heading, NeoButton, NeoCard, NeoBadge, NeoProgressBar } from './ui'
const sections = ['dashboard', 'profile', 'achievements', 'leaderboard']
function Sidebar() {
  const path = usePathname().replace(/\/$/, '')
  return (
    <nav className="subnav" aria-label="Student pages">
      {sections.map((s) => (
        <Link
          key={s}
          href={'/' + s}
          aria-current={path === '/' + s ? 'page' : undefined}
        >
          {s[0].toUpperCase() + s.slice(1)}
        </Link>
      ))}
      <Link href="/exams">Practice exams</Link>
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
      day: d.toLocaleDateString('en', { weekday: 'short' }),
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
      <h3>Weekly activity</h3>
      <p>Exercises completed over the last seven days.</p>
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
    done = data.submissions.map((x) => x.exerciseId),
    { xp, week, streak, earnedWeek } = analytics(data.submissions),
    pct = Math.round((done.length * 100) / exercises.length),
    next = exercises.find((e) => !done.includes(e.id)) || exercises[0],
    level = 1 + Math.floor(xp / 200),
    name = data.user?.name || 'Guest learner'
  const awards = [
    {
      title: 'Hello World',
      description: 'Complete your first exercise.',
      earned: done.length > 0,
      Icon: Terminal,
    },
    {
      title: 'Python Rookie',
      description: 'Solve 20 Python problems.',
      earned: done.length >= 20,
      Icon: Star,
    },
    {
      title: 'Bug Hunter',
      description: 'Complete 10 debugging exercises.',
      earned:
        exercises.filter((e) => e.type === 'DEBUGGING' && done.includes(e.id))
          .length >= 10,
      Icon: Bug,
    },
    {
      title: 'On Fire',
      description: 'Maintain a seven-day streak.',
      earned: earnedWeek,
      Icon: Flame,
    },
    {
      title: 'Python Master',
      description: 'Complete all ITDS120 exercises.',
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
      <StatCard label="Total XP" value={xp} />
      <StatCard label="Problems solved" value={done.length} />
      <StatCard label="Current streak" value={streak + ' days'} />
      <StatCard
        label="Courses in progress"
        value={done.length && pct < 100 ? 1 : 0}
      />
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
            {earned ? 'Earned' : 'Locked'}
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
          <Heading
            kicker="STUDENT DASHBOARD"
            title="Welcome back! Ready to level up?"
          >
            {name} · Your learning activity in this browser.
          </Heading>
          {stats}
          <div className="grid2 spaced">
            <section className="panel level">
              <small>CONTINUE LEARNING</small>
              <h3>Fundamentals of Programming</h3>
              <p>ITDS120 · {pct}% complete</p>
              <NeoProgressBar value={pct} />
              <p>Next up · {next.title}</p>
              <div className="actions">
                <NeoButton href={practicePath(next.id)}>
                  Resume <ArrowRight size={16} />
                </NeoButton>
              </div>
            </section>
            <ActivityChart week={week} />
          </div>
          <div className="grid2">
            <section className="panel">
              <h3>Topic mastery</h3>
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
              <h3>Recommended practice</h3>
              <p>Exercises from your least completed topics.</p>
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
                <NeoButton href="/exams">Try a practice exam</NeoButton>
              )}
            </section>
          </div>
        </>
      ) : section === 'profile' ? (
        <>
          <Heading kicker="STUDENT PROFILE" title={name} />
          <section className="panel level">
            <div className="row">
              <span className="num">{name.slice(0, 2).toUpperCase()}</span>
              <strong>Level {level}</strong>
              <NeoBadge color="yellow">{xp} XP</NeoBadge>
            </div>
            <NeoProgressBar value={(xp % 200) / 2} />
            <p>
              {200 - (xp % 200)} XP to level {level + 1}
            </p>
          </section>
          <div className="spaced">{stats}</div>
          <div className="grid2">
            <div className="panel">
              <h3>Course completion</h3>
              <Link href={coursePath} className="under">
                ITDS120 · {pct}%
              </Link>
              <NeoProgressBar value={pct} />
              <h3>Earned achievements</h3>
              <p>
                {awards
                  .filter((a) => a.earned)
                  .map((a) => a.title)
                  .join(' · ') || 'Complete an exercise to earn Hello World.'}
              </p>
            </div>
            <div className="panel">
              <h3>Recent activity</h3>
              {data.submissions.length ? (
                [...data.submissions]
                  .reverse()
                  .slice(0, 5)
                  .map((s) => (
                    <p key={s.exerciseId}>
                      {exercises.find((e) => e.id === s.exerciseId)?.title} · +
                      {s.xp} XP
                    </p>
                  ))
              ) : (
                <p>Your submissions will appear here.</p>
              )}
            </div>
          </div>
          <div className="actions">
            {data.user ? (
              <NeoButton tone="white" onClick={logout}>
                Log out of demo
              </NeoButton>
            ) : (
              <NeoButton href="/login">Demo login</NeoButton>
            )}
          </div>
        </>
      ) : section === 'achievements' ? (
        <>
          <Heading kicker="YOUR COLLECTION" title="Achievements">
            {awards.filter((a) => a.earned).length} of {awards.length} earned.
            Each achievement marks a learning milestone.
          </Heading>
          {achievements}
        </>
      ) : (
        <>
          <Heading kicker="COMMUNITY · DEMO RANKINGS" title="Leaderboard">
            See how your local XP compares with sample learner profiles.
          </Heading>
          <section className="panel">
            {[
              { n: 'Mira K.', xp: 640 },
              { n: 'Arun P.', xp: 515 },
              { n: 'Nina S.', xp: 390 },
              { n: 'Theo L.', xp: 240 },
              { n: name + ' (you)', xp },
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
