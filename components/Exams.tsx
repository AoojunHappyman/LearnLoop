'use client'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { Clock, ClipboardList, ArrowRight } from 'lucide-react'
import { examCatalog, topicPractice } from '@/lib/exam'
import { attemptKey, saveFinishedScore } from '@/lib/exam-results'
import { ExamAttempt, practicePath } from '@/lib/content'
import { Heading, NeoButton, NeoBadge, NeoProgressBar } from './ui'
export function Exams() {
  return (
    <div className="container content">
      <Heading kicker="เตรียมสอบ" title="ข้อสอบฝึกทำ">
        เลือกวิชาที่ต้องการทบทวน ฝึกทำข้อสอบจับเวลา พร้อมเฉลยอธิบายหลังส่งคำตอบ
      </Heading>
      <div className="grid2">
        {examCatalog.map((exam) => (
          <section className="panel level" key={exam.id}>
            <ClipboardList size={32} />
            <h3>{exam.title}</h3>
            <NeoBadge color="yellow">ข้อสอบฝึกทำสำหรับทบทวนด้วยตนเอง</NeoBadge>
            <p>{exam.summary}</p>
            <p className="spaced">
              {exam.questions.length} ข้อ · {exam.minutes} นาที
            </p>
            <NeoButton href={'/exams/' + exam.id}>
              เปิดข้อสอบ <ArrowRight size={16} />
            </NeoButton>
          </section>
        ))}
      </div>
    </div>
  )
}
export function ExamRoom({ examId }: { examId: string }) {
  const exam = examCatalog.find((e) => e.id === examId)!
  const questions = exam.questions
  const key = attemptKey(examId)

  const [attempt, A] = useState<ExamAttempt | null>(null),
    [ready, R] = useState(false),
    [idx, I] = useState(0),
    [now, N] = useState(Date.now()),
    [open, O] = useState(false)
  useEffect(() => {
    try {
      const x = JSON.parse(localStorage.getItem(key) || 'null')
      if (
        x?.answers?.length === questions.length &&
        Number.isFinite(x.deadline) &&
        x.answers.every(
          (a: unknown) =>
            Number.isInteger(a) && Number(a) >= -1 && Number(a) < 4,
        ) &&
        typeof x.finished === 'boolean'
      )
        A(x)
    } catch {}
    R(true)
  }, [])
  useEffect(() => {
    if (ready && attempt) {
      localStorage.setItem(key, JSON.stringify(attempt))
      saveFinishedScore(exam, attempt)
    }
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
      answers: Array(questions.length).fill(-1),
      deadline: Date.now() + exam.minutes * 60_000,
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
        ← ข้อสอบฝึกทำ
      </Link>
      <Heading kicker="ข้อสอบฝึกทำสำหรับทบทวนด้วยตนเอง" title={exam.title} />
      {!ready ? (
        <p>กำลังโหลดการทำข้อสอบ…</p>
      ) : !attempt ? (
        <div className="panel">
          <h3>ก่อนเริ่มทำข้อสอบ</h3>
          <p>{exam.topics.join(' · ')} </p>
          <p>
            ตอบคำถามปรนัย {questions.length} ข้อ ภายใน {exam.minutes} นาที
            คุณย้อนกลับไปแก้คำตอบได้ก่อนส่ง หากออกจากหน้านี้ เวลาจะยังเดินต่อ ข้อที่เว้นว่างจะได้ 0
            คะแนน
          </p>
          <div className="actions">
            <NeoButton onClick={start}>
              เริ่มทำข้อสอบจับเวลา <Clock size={16} />
            </NeoButton>
          </div>
        </div>
      ) : attempt.finished ? (
        <section className="panel">
          <small>ผลสอบ</small>
          <h2>
            {
              questions.filter((q, i) => q.correct === attempt.answers[i])
                .length
            }{' '}
            จาก {questions.length} ข้อที่ตอบถูก
          </h2>
          <p>
            {questions.length -
              questions.filter((q, i) => q.correct === attempt.answers[i])
                .length}{' '}
            ข้อที่ผิดหรือไม่ได้ตอบ
          </p>
          <h3>ผลรายหัวข้อ</h3>
          {exam.topics.map((t) => {
            const n = questions.filter(
              (q, j) => q.topic === t && attempt.answers[j] === q.correct,
            ).length
            return (
              <details className="spaced" key={t}>
                <summary>
                  {t} · {n}/{questions.filter((q) => q.topic === t).length} —
                  ดูเฉลย
                </summary>
                {questions.map(
                  (item, i) =>
                    item.topic === t && (
                      <div key={i} className="spaced">
                        <strong>
                          {i + 1}. {item.prompt}
                        </strong>
                        {item.code && <pre>{item.code}</pre>}
                        <p>
                          คำตอบของคุณ ·{' '}
                          {item.choices[attempt.answers[i]] ?? 'ไม่ได้ตอบ'}
                        </p>
                        <p>คำตอบที่ถูก · {item.choices[item.correct]}</p>
                        <p>{item.explanation}</p>
                      </div>
                    ),
                )}
                {exam.courseId === 'itds120' && topicPractice[t] && (
                  <Link className="under" href={practicePath(topicPractice[t])}>
                    ฝึกโจทย์ {t} เพิ่มเติม
                  </Link>
                )}
              </details>
            )
          })}
          <NeoButton onClick={start}>ลองอีกครั้ง</NeoButton>
        </section>
      ) : (
        <div className="workspace">
          <aside className="panel">
            <small>เวลาที่เหลือ</small>
            <div className="stat">
              {Math.floor(remaining / 60)}:
              {String(remaining % 60).padStart(2, '0')}
            </div>
            <p>
              ตอบแล้ว {count} จาก {questions.length} ข้อ
            </p>
            <NeoProgressBar value={(count * 100) / questions.length} />
            <h3>เลือกข้อ</h3>
            <div className="questionnav">
              {questions.map((_, i) => (
                <button
                  key={i}
                  aria-label={
                    'ข้อที่ ' +
                    (i + 1) +
                    (attempt.answers[i] >= 0 ? ' ตอบแล้ว' : '')
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
              {q.topic} · ข้อที่ {idx + 1} จาก {questions.length}
            </small>
            <h3>{q.prompt}</h3>
            {q.code && <pre>{q.code}</pre>}
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
                ก่อนหน้า
              </NeoButton>
              {idx < questions.length - 1 && (
                <NeoButton tone="white" onClick={() => I(idx + 1)}>
                  ถัดไป
                </NeoButton>
              )}
              <Dialog.Root open={open} onOpenChange={O}>
                <Dialog.Trigger asChild>
                  <button className="btn yellow">ส่งข้อสอบ</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="dialogoverlay" />
                  <Dialog.Content className="dialog panel">
                    <Dialog.Title asChild>
                      <h2>ยืนยันการส่งข้อสอบ?</h2>
                    </Dialog.Title>
                    <Dialog.Description>
                      {count} จาก {questions.length} ข้อ
                      เมื่อส่งแล้วจะสิ้นสุดการทำข้อสอบครั้งนี้
                    </Dialog.Description>
                    <div className="actions">
                      <Dialog.Close className="btn white">
                        กลับไปทำต่อ
                      </Dialog.Close>
                      <button
                        className="btn yellow"
                        onClick={() => {
                          A({ ...attempt, finished: true })
                          O(false)
                        }}
                      >
                        ยืนยันการส่ง
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
