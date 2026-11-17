'use client'
import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useReducedMotion, motion } from 'motion/react'
import {
  Copy,
  RotateCcw,
  Play,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  exercises,
  modulePath,
  modules,
  typeLabel,
  practicePath,
  Exercise,
} from '@/lib/content'
import { Result, evaluate } from '@/lib/evaluation'
import { useProgress } from '@/lib/progress'
import { NeoButton, NeoBadge } from './ui'
const Editor = dynamic(
  () =>
    import('@monaco-editor/react').then(async (m) => {
      m.loader.config({ paths: { vs: '/monaco/vs' } })
      return m.default
    }),
  {
    ssr: false,
    loading: () => <div className="loading">กำลังโหลดตัวแก้ไขโค้ด…</div>,
  },
)
export function Practice({ exercise: e }: { exercise: Exercise }) {
  const [tab, setTab] = useState('กรณีทดสอบ'),
    [run, R] = useState<Result | null>(null),
    [submitted, S] = useState<Result | null>(null),
    [notice, N] = useState(''),
    [xp, X] = useState(false)
  const { data, complete, records, ready, write } = useProgress(),
    reduce = useReducedMotion(),
    index = exercises.findIndex((x) => x.id === e.id),
    code = e.engine === 'python-pattern',
    key = 'draft:' + e.id,
    answer = records[key] ?? (code ? e.starter : '')
  const runRef = useRef<(submit: boolean) => void>(() => {})
  function edit(s: string) {
    write(key, s)
    N('')
  }
  function check(submit: boolean) {
    const result = evaluate(e, answer)
    R(result)
    setTab(submit ? 'ผลการส่งคำตอบ' : 'กรณีทดสอบ')
    if (submit) {
      S(result)
      if (result.passed) {
        X(!data.submissions.some((s) => s.exerciseId === e.id))
        complete(e)
      }
    }
  }
  runRef.current = check
  if (!ready) return <p className="container">กำลังโหลดแบบร่าง…</p>
  return (
    <div className="container content">
      <Link href={modulePath(e.module)} className="crumb">
        ← {modules[e.module - 1].title}
      </Link>
      <div className="workspace">
        <section className="panel">
          <small>{typeLabel[e.type]} · ITDS120</small>
          <h1
            style={{
              fontSize: 38,
              lineHeight: 1.4,
              letterSpacing: 'normal',
              marginBottom: 14,
            }}
          >
            {e.title}
          </h1>
          <div className="pills">
            <NeoBadge color="purple">{e.difficulty}</NeoBadge>
            <NeoBadge color="yellow">+{e.xp} XP</NeoBadge>
          </div>
          <h4>โจทย์</h4>
          <p>{e.prompt}</p>
          <h4>รูปแบบข้อมูลเข้า</h4>
          <p>
            {e.tests[0].input === 'None'
              ? 'ไม่ต้องป้อนข้อมูล'
              : 'ใช้ข้อมูลตามรูปแบบที่แสดงในตัวอย่าง'}
          </p>
          <h4>รูปแบบผลลัพธ์</h4>
          <p>
            {code
              ? 'แสดงผลตามโจทย์ โดยใช้ตัวพิมพ์เล็กและตัวพิมพ์ใหญ่ให้ตรง'
              : 'พิมพ์หรือเลือกคำตอบหนึ่งข้อ'}
          </p>
          <h4>ข้อกำหนด</h4>
          <p>ใช้รูปแบบของ Python 3 เว้นวรรคและขึ้นบรรทัดใหม่ให้ตรงตามโจทย์</p>
          <h4>ตัวอย่าง</h4>
          <pre>
            {'ข้อมูลเข้า\n' +
              (e.tests[0].input === 'None' ? 'ไม่มี' : e.tests[0].input) +
              '\n\n' +
              (code
                ? 'ผลลัพธ์ที่คาดหวัง\n' + e.tests[0].output
                : 'สิ่งที่ต้องทำ\n' + e.prompt)}
          </pre>
          <details>
            <summary>ดูคำใบ้</summary>
            <p>{e.hint}</p>
          </details>
          {code && (
            <details>
              <summary>ดูตัวอย่างเฉลย</summary>
              <pre>{e.answer}</pre>
            </details>
          )}
          <div className="actions">
            {index > 0 && (
              <Link
                className="textlink"
                href={practicePath(exercises[index - 1].id)}
              >
                <ChevronLeft size={15} /> ก่อนหน้า
              </Link>
            )}
            {index < exercises.length - 1 && (
              <Link
                className="textlink"
                href={practicePath(exercises[index + 1].id)}
              >
                โจทย์ถัดไป <ChevronRight size={15} />
              </Link>
            )}
          </div>
        </section>
        <div>
          {code ? (
            <div className="editorbox">
              <div className="toolbar">
                <span>main.py · Python 3</span>
                <button
                  aria-label="คัดลอกโค้ด"
                  title="คัดลอกโค้ด"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(answer)
                      N('คัดลอกโค้ดแล้ว')
                    } catch {
                      N('เลือกโค้ดแล้วกด Ctrl+C เพื่อคัดลอก')
                    }
                  }}
                >
                  <Copy size={17} />
                </button>
                <button
                  aria-label="คืนค่าโค้ดเริ่มต้น"
                  title="คืนค่าโค้ดเริ่มต้น"
                  onClick={() => {
                    edit(e.starter)
                    N('คืนค่าโค้ดเริ่มต้นแล้ว')
                  }}
                >
                  <RotateCcw size={17} />
                </button>
              </div>
              <Editor
                height="335px"
                language="python"
                theme="vs-dark"
                value={answer}
                onChange={(v) => edit(v ?? '')}
                onMount={(ed, m) => {
                  ed.addCommand(m.KeyMod.CtrlCmd | m.KeyCode.Enter, () =>
                    runRef.current(false),
                  )
                  ed.addCommand(
                    m.KeyMod.CtrlCmd | m.KeyMod.Shift | m.KeyCode.Enter,
                    () => runRef.current(true),
                  )
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  tabSize: 4,
                  accessibilitySupport: 'on',
                  ariaLabel: 'ตัวแก้ไขโค้ด Python',
                }}
              />
            </div>
          ) : (
            <section className="panel">
              <small>{typeLabel[e.type]}</small>
              <h3>คำตอบของคุณ</h3>
              {e.starter && <pre>{e.starter}</pre>}
              {e.choices ? (
                e.choices.map((c) => (
                  <button
                    key={c}
                    className="option"
                    aria-pressed={answer === c}
                    onClick={() => edit(c)}
                  >
                    {c}
                  </button>
                ))
              ) : (
                <textarea
                  aria-label="ผลลัพธ์ที่คาดว่าจะได้"
                  value={answer}
                  onChange={(ev) => edit(ev.target.value)}
                />
              )}
            </section>
          )}
          <span role="status">{notice}</span>
          <section className="panel spaced">
            <p className="notice">
              {code
                ? 'ตัวจำลอง Python · เปรียบเทียบโค้ดกับเฉลยในเบราว์เซอร์ โดยไม่มีการรัน Python จริง'
                : 'ระบบจะตรวจคำตอบในเบราว์เซอร์ของคุณ'}
            </p>
            <div className="actions practiceactions">
              <NeoButton tone="white" onClick={() => check(false)}>
                <Play size={15} />
                {code ? 'ทดสอบโค้ด' : 'ตรวจคำตอบ'}
              </NeoButton>
              <NeoButton onClick={() => check(true)}>
                <Send size={15} /> ส่งคำตอบ
              </NeoButton>
            </div>
            <div className="tabbar">
              {['กรณีทดสอบ', 'คอนโซล', 'ผลการส่งคำตอบ'].map((t) => (
                <button
                  key={t}
                  aria-pressed={tab === t}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div aria-live="polite">
              {tab === 'คอนโซล' ? (
                <pre>
                  {run
                    ? 'ผลการตรวจแบบจำลอง\n' + run.status + '\n' + run.actual
                    : 'ยังไม่ได้เริ่มทดสอบ'}
                </pre>
              ) : (tab === 'กรณีทดสอบ' ? run : submitted) ? (
                <TestCasePanel
                  result={(tab === 'กรณีทดสอบ' ? run : submitted)!}
                  expected={e.tests[0].output}
                />
              ) : (
                <p className="mono">
                  {tab === 'กรณีทดสอบ'
                    ? 'พร้อมทดสอบ 1 กรณี'
                    : 'ส่งคำตอบเพื่อดูผลการตรวจ'}
                </p>
              )}
              {xp && tab === 'ผลการส่งคำตอบ' && submitted?.passed && (
                <motion.div
                  initial={reduce ? false : { y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <NeoBadge color="yellow">ได้รับ +{e.xp} XP</NeoBadge>
                </motion.div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
function TestCasePanel({
  result,
  expected,
}: {
  result: Result
  expected: string
}) {
  return (
    <div className={'feedback ' + (result.passed ? 'mint' : 'fail')}>
      <strong>
        {result.status} ·{' '}
        {result.passed ? 'ผ่าน 1 กรณี ไม่ผ่าน 0 กรณี' : 'ผ่าน 0 กรณี ไม่ผ่าน 1 กรณี'}
      </strong>
      <pre>{'ผลที่คาดหวัง: ' + expected + '\nผลที่ได้: ' + result.actual}</pre>
      <p>{result.feedback}</p>
    </div>
  )
}

