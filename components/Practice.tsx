'use client'
import { useState, useEffect, useRef } from 'react'
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
  { ssr: false, loading: () => <div className="loading">Loading editor…</div> },
)
export function Practice({ exercise: e }: { exercise: Exercise }) {
  const [answer, setAnswer] = useState(e.starter),
    [tab, setTab] = useState('Test Cases'),
    [run, R] = useState<Result | null>(null),
    [submitted, S] = useState<Result | null>(null),
    [notice, N] = useState(''),
    [xp, X] = useState(false)
  const { data, complete } = useProgress(),
    reduce = useReducedMotion(),
    index = exercises.findIndex((x) => x.id === e.id),
    code = e.engine === 'python-pattern',
    key = 'learnloop:draft:' + e.id
  const runRef = useRef<(submit: boolean) => void>(() => {})
  useEffect(() => {
    setAnswer(localStorage.getItem(key) ?? (code ? e.starter : ''))
  }, [key, code, e.starter])
  function edit(s: string) {
    setAnswer(s)
    localStorage.setItem(key, s)
    N('')
  }
  function check(submit: boolean) {
    const result = evaluate(e, answer)
    R(result)
    setTab(submit ? 'Submission Results' : 'Test Cases')
    if (submit) {
      S(result)
      if (result.passed) {
        X(!data.submissions.some((s) => s.exerciseId === e.id))
        complete(e)
      }
    }
  }
  runRef.current = check
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
              lineHeight: 1.1,
              letterSpacing: '-.055em',
              marginBottom: 14,
            }}
          >
            {e.title}
          </h1>
          <div className="pills">
            <NeoBadge color="purple">{e.difficulty}</NeoBadge>
            <NeoBadge color="yellow">+{e.xp} XP</NeoBadge>
          </div>
          <h4>Problem</h4>
          <p>{e.prompt}</p>
          <h4>Input format</h4>
          <p>
            {e.tests[0].input === 'None'
              ? 'No input required.'
              : 'Use the input shown in the example.'}
          </p>
          <h4>Output format</h4>
          <p>
            {code
              ? 'Produce the requested result with exact capitalization.'
              : 'Enter or select one answer.'}
          </p>
          <h4>Constraints</h4>
          <p>
            Use Python 3 conventions. Preserve meaningful spaces and line
            breaks.
          </p>
          <h4>Example</h4>
          <pre>
            {'Input\n' +
              e.tests[0].input +
              '\n\n' +
              (code
                ? 'Expected output\n' + e.tests[0].output
                : 'Task\n' + e.prompt)}
          </pre>
          <details>
            <summary>Show hint</summary>
            <p>{e.hint}</p>
          </details>
          {code && (
            <details>
              <summary>Reference solution</summary>
              <pre>{e.answer}</pre>
            </details>
          )}
          <div className="actions">
            {index > 0 && (
              <Link
                className="textlink"
                href={practicePath(exercises[index - 1].id)}
              >
                <ChevronLeft size={15} /> Previous
              </Link>
            )}
            {index < exercises.length - 1 && (
              <Link
                className="textlink"
                href={practicePath(exercises[index + 1].id)}
              >
                Next exercise <ChevronRight size={15} />
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
                  aria-label="Copy code"
                  title="Copy code"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(answer)
                      N('Code copied.')
                    } catch {
                      N('Select the code and use Ctrl+C to copy.')
                    }
                  }}
                >
                  <Copy size={17} />
                </button>
                <button
                  aria-label="Reset starter code"
                  title="Reset starter code"
                  onClick={() => {
                    edit(e.starter)
                    N('Starter code restored.')
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
                  ariaLabel: 'Python solution editor',
                }}
              />
            </div>
          ) : (
            <section className="panel">
              <small>{typeLabel[e.type]}</small>
              <h3>Your answer</h3>
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
                  aria-label="Predicted output"
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
                ? 'Simulated Python runner · Checks a reference solution locally.'
                : 'Practice feedback · Answers are checked locally.'}
            </p>
            <div className="actions practiceactions">
              <NeoButton tone="white" onClick={() => check(false)}>
                <Play size={15} />
                {code ? 'Run Code' : 'Check Answer'}
              </NeoButton>
              <NeoButton onClick={() => check(true)}>
                <Send size={15} /> Submit Solution
              </NeoButton>
            </div>
            <div className="tabbar">
              {['Test Cases', 'Console', 'Submission Results'].map((t) => (
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
              {tab === 'Console' ? (
                <pre>
                  {run
                    ? 'Prototype evaluation\n' + run.status + '\n' + run.actual
                    : 'Waiting for a run.'}
                </pre>
              ) : (tab === 'Test Cases' ? run : submitted) ? (
                <TestCasePanel
                  result={(tab === 'Test Cases' ? run : submitted)!}
                  expected={e.tests[0].output}
                />
              ) : (
                <p className="mono">
                  {tab === 'Test Cases'
                    ? '1 sample case ready.'
                    : 'Submit your answer to see a result.'}
                </p>
              )}
              {xp && tab === 'Submission Results' && submitted?.passed && (
                <motion.div
                  initial={reduce ? false : { y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <NeoBadge color="yellow">+{e.xp} XP earned</NeoBadge>
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
        {result.passed ? '1 passed, 0 failed' : '0 passed, 1 failed'}
      </strong>
      <pre>{'Expected: ' + expected + '\nActual: ' + result.actual}</pre>
      <p>{result.feedback}</p>
    </div>
  )
}
