'use client'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { Clock, ClipboardList, ArrowRight } from 'lucide-react'
import { exam, questions, topicPractice } from '@/lib/exam'
import { ExamAttempt, practicePath } from '@/lib/content'
import { Heading, NeoButton, NeoBadge, NeoProgressBar } from './ui'
const path = '/exams/' + exam.id,
  key = 'learnloop:exam:v1'
export function Exams() {
  return (
    <div className="container content">
      <Heading kicker="EXAM PREPARATION" title="Practice exams">
        Rehearse under a time limit and review your performance by topic.
      </Heading>
      <div className="panel level">
        <ClipboardList size={36} />
        <h3>ITDS120 Mock Exam</h3>
        <NeoBadge color="yellow">Independent practice exam</NeoBadge>
        <p className="spaced">20 questions · 60 minutes · Mixed difficulty</p>
        <p>{exam.topics.join(' · ')}</p>
        <div className="actions">
          <NeoButton href={path}>
            Open exam <ArrowRight size={16} />
          </NeoButton>
        </div>
      </div>
    </div>
  )
}
export function ExamRoom() {
  const [attempt, A] = useState<ExamAttempt | null>(null),
    [ready, R] = useState(false),
    [idx, I] = useState(0),
    [now, N] = useState(Date.now()),
    [open, O] = useState(false)
  useEffect(() => {
    try {
      const x = JSON.parse(localStorage.getItem(key) || 'null')
      if (x?.answers?.length === 20 && Number.isFinite(x.deadline)) A(x)
    } catch {}
    R(true)
  }, [])
  useEffect(() => {
    if (ready && attempt) localStorage.setItem(key, JSON.stringify(attempt))
  }, [ready, attempt])
  useEffect(() => {
    if (!attempt || attempt.finished) return
    const tick = () => {
      const time = Date.now()
      N(time)
      if (time >= attempt.deadline) {
        A((a) => a && { ...a, finished: true })
        O(false)
      }
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [attempt?.deadline, attempt?.finished])
  const start = () => {
    N(Date.now())
    A({
      answers: Array(20).fill(-1),
      deadline: Date.now() + 3600000,
      finished: false,
    })
    I(0)
  }
  const q = questions[idx],
    count = attempt?.answers.filter((a) => a >= 0).length || 0,
    remaining = Math.max(
      0,
      Math.ceil(((attempt?.deadline || now) - now) / 1000),
    )
  return (
    <div className="container content">
      <Link href="/exams" className="crumb">
        ← Practice exams
      </Link>
      <Heading kicker="INDEPENDENT PRACTICE EXAM" title="ITDS120 Mock Exam" />
      {!ready ? (
        <p>Loading attempt…</p>
      ) : !attempt ? (
        <div className="panel">
          <h3>Before you begin</h3>
          <p>
            Answer 20 multiple-choice questions in 60 minutes. You can revisit
            any question before submitting. Your timer continues when you leave
            this page. Unanswered questions receive zero points.
          </p>
          <div className="actions">
            <NeoButton onClick={start}>
              Start timed exam <Clock size={16} />
            </NeoButton>
          </div>
        </div>
      ) : attempt.finished ? (
        <section className="panel">
          <small>EXAM RESULTS</small>
          <h2>
            {
              questions.filter((q, i) => q.correct === attempt.answers[i])
                .length
            }{' '}
            / 20 correct
          </h2>
          <p>
            {20 -
              questions.filter((q, i) => q.correct === attempt.answers[i])
                .length}{' '}
            incorrect or unanswered
          </p>
          <h3>Topic performance</h3>
          {exam.topics.map((t, i) => {
            const n = questions.filter(
              (q, j) => q.topic === t && attempt.answers[j] === q.correct,
            ).length
            return (
              <div className="listrow" key={t}>
                <strong>
                  {t} · {n}/4
                </strong>
                <Link className="under" href={practicePath(topicPractice[i])}>
                  Practice topic
                </Link>
              </div>
            )
          })}
          <details className="spaced">
            <summary>Review all answers</summary>
            {questions.map((q, i) => (
              <div key={i} className="spaced">
                <strong>
                  {i + 1}. {q.prompt}
                </strong>
                <p>
                  Your answer · {q.choices[attempt.answers[i]] ?? 'Unanswered'}
                </p>
                <p>Correct answer · {q.choices[q.correct]}</p>
              </div>
            ))}
          </details>
          <NeoButton onClick={start}>Try again</NeoButton>
        </section>
      ) : (
        <div className="workspace">
          <aside className="panel">
            <small>TIME REMAINING</small>
            <div className="stat">
              {Math.floor(remaining / 60)}:
              {String(remaining % 60).padStart(2, '0')}
            </div>
            <p>{count}/20 answered</p>
            <NeoProgressBar value={count * 5} />
            <h3>Question navigation</h3>
            <div className="questionnav">
              {questions.map((_, i) => (
                <button
                  key={i}
                  aria-label={
                    'Question ' +
                    (i + 1) +
                    (attempt.answers[i] >= 0 ? ', answered' : '')
                  }
                  aria-current={idx === i ? 'step' : undefined}
                  className={
                    (i === idx ? 'current ' : '') +
                    (attempt.answers[i] >= 0 ? 'answered' : '')
                  }
                  onClick={() => I(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </aside>
          <section className="panel">
            <small>
              {q.topic} · QUESTION {idx + 1} OF 20
            </small>
            <h3>{q.prompt}</h3>
            {q.choices.map((c, i) => (
              <button
                key={c}
                className="option"
                aria-pressed={attempt.answers[idx] === i}
                onClick={() =>
                  A({
                    ...attempt,
                    answers: attempt.answers.map((v, j) => (j === idx ? i : v)),
                  })
                }
              >
                {c}
              </button>
            ))}
            <div className="actions">
              <NeoButton
                tone="white"
                disabled={idx === 0}
                onClick={() => I(idx - 1)}
              >
                Previous
              </NeoButton>
              {idx < 19 && (
                <NeoButton tone="white" onClick={() => I(idx + 1)}>
                  Next
                </NeoButton>
              )}
              <Dialog.Root open={open} onOpenChange={O}>
                <Dialog.Trigger asChild>
                  <button className="btn yellow">Submit exam</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="dialogoverlay" />
                  <Dialog.Content className="dialog panel">
                    <Dialog.Title asChild>
                      <h2>Submit your exam?</h2>
                    </Dialog.Title>
                    <Dialog.Description>
                      {count} of 20 questions answered. Submission ends this
                      attempt.
                    </Dialog.Description>
                    <div className="actions">
                      <Dialog.Close className="btn white">
                        Keep working
                      </Dialog.Close>
                      <button
                        className="btn yellow"
                        onClick={() => {
                          A({ ...attempt, finished: true })
                          O(false)
                        }}
                      >
                        Confirm submission
                      </button>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
