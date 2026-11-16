'use client'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Check, BookOpen } from 'lucide-react'
import {
  coursePath,
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
    done = data.submissions.map((x) => x.exerciseId),
    pct = Math.round((done.length * 100) / exercises.length),
    next = exercises.find((e) => !done.includes(e.id)) || exercises[0]
  return (
    <div className="container content">
      <Link className="crumb" href="/courses">
        ← Course library
      </Link>
      <Heading
        kicker="ITDS120 · Python Programming"
        title="Fundamentals of Programming"
      >
        Build a working knowledge of Python through short lessons, code tracing,
        and hands-on challenges.
      </Heading>
      <div className="grid2">
        <section className="panel level">
          <small>COURSE PROGRESS</small>
          <div className="stat">{pct}% complete</div>
          <NeoProgressBar value={pct} />
          <p>
            {done.length} / {exercises.length} exercises ·{' '}
            {data.submissions.reduce((s, x) => s + x.xp, 0)} XP earned
          </p>
          <div className="actions">
            <NeoButton href={modulePath(next.module)}>
              Continue Learning <ArrowRight size={17} />
            </NeoButton>
          </div>
        </section>
        <section className="panel">
          <BookOpen />
          <h3>Learning objectives</h3>
          <ul>
            <li>Read, trace, and debug Python programs.</li>
            <li>
              Use conditions, loops, and functions to express an algorithm.
            </li>
            <li>Process data with collections, strings, and files.</li>
          </ul>
        </section>
      </div>
      <div className="spaced">
        <small>LEARNING PATH</small>
        <h2>Course modules</h2>
        <p>Proposed practice modules for independent study.</p>
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
                    {items[0].difficulty} · {n}/{items.length} exercises ·{' '}
                    {n === items.length
                      ? 'Completed'
                      : n
                        ? 'In progress'
                        : 'Ready to start'}
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
        ← Fundamentals of Programming
      </Link>
      <Heading
        kicker={'ITDS120 · Module ' + String(id).padStart(2, '0')}
        title={m.title}
      >
        {m.summary}
      </Heading>
      <section className="panel level">
        <small>LEARNING OBJECTIVES</small>
        <ul>
          {exercises
            .filter((e) => e.module === id)
            .map((e) => (
              <li key={e.id}>{e.prompt}</li>
            ))}
        </ul>
      </section>
      <h2 className="spaced">Practice exercises</h2>
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
                    {e.difficulty} · {done ? 'Completed' : 'Ready to practice'}
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
