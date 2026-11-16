import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Code2,
  Trophy,
  Zap,
  Layers,
  Terminal,
  ChartNoAxesColumnIncreasing,
  ClipboardList,
  Target,
  Star,
} from 'lucide-react'
import { courses } from '@/lib/content'
import { CourseCard } from '@/components/Courses'
import { NeoButton } from '@/components/ui'
export default function Home() {
  return (
    <>
      <section className="container hero">
        <div className="herocopy">
          <span className="eyebrow">
            <i /> LEARN. PRACTICE. LEVEL UP.
          </span>
          <h1>
            STOP SCROLLING.
            <br />
            START <mark>LEARNING.</mark>
          </h1>
          <p>
            Your university courses, practice problems, and progress — all in
            one place.
          </p>
          <div className="actions">
            <NeoButton href="/courses/itds120">
              Start Learning <ArrowRight size={18} />
            </NeoButton>
            <NeoButton href="/courses" tone="white">
              <BookOpen size={18} /> Explore Courses
            </NeoButton>
          </div>
        </div>
        <div className="heroart">
          <img
            src="/hero.webp"
            width="1440"
            height="960"
            alt="A smiling lavender computer perched on textbooks with a matching keyboard"
          />
          <span className="xpsticker">
            <Zap size={16} fill="currentColor" /> +25 XP
          </span>
        </div>
      </section>
      <div className="ribbon" aria-hidden="true">
        <div>
          {[BookOpen, Code2, Zap, Trophy, BookOpen, Code2].map((Icon, i) => (
            <span key={i}>
              <Icon size={19} />
              {
                [
                  'STRUCTURED COURSES',
                  'HANDS-ON PRACTICE',
                  'INSTANT FEEDBACK',
                  'EARN ACHIEVEMENTS',
                  'STRUCTURED COURSES',
                  'HANDS-ON PRACTICE',
                ][i]
              }{' '}
              <b>✦</b>
            </span>
          ))}
        </div>
      </div>
      <section className="container section">
        <div className="sectionrow">
          <div>
            <small>THE COURSE LIBRARY</small>
            <h2>
              Featured courses<span className="purpleperiod">.</span>
            </h2>
          </div>
          <Link className="textlink" href="/courses">
            View all courses <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid3">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <details className="upcoming">
          <summary>More upcoming subjects</summary>
          <div className="grid3">
            {courses.slice(3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </details>
      </section>
      <section className="band">
        <div className="container section">
          <small>HOW IT WORKS</small>
          <h2>
            Your learning loop<span className="purpleperiod">.</span>
          </h2>
          <div className="grid3">
            {[
              [
                Layers,
                'Pick a Course',
                'Start with a subject and follow its learning path.',
              ],
              [
                Terminal,
                'Solve Challenges',
                'Apply each concept in a focused practice workspace.',
              ],
              [
                Star,
                'Level Up',
                'Collect XP and follow your progress as you learn.',
              ],
            ].map(([I, t, d], i) => {
              const Icon = I as typeof Layers
              return (
                <article className={'card step step' + i} key={i}>
                  <Icon />
                  <small>STEP 0{i + 1}</small>
                  <h3>{String(t)}</h3>
                  <p>{String(d)}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      <section className="container section">
        <small>PLATFORM FEATURES</small>
        <h2>Tools for your next session.</h2>
        <div className="featurelinks">
          {[
            [Code2, 'Interactive coding', '/practice/hello-loop'],
            [Zap, 'Instant feedback', '/practice/missing-quote'],
            [ChartNoAxesColumnIncreasing, 'Learning progress', '/dashboard'],
            [ClipboardList, 'Exam preparation', '/exams'],
            [Target, 'XP and achievements', '/achievements'],
          ].map(([I, t, h]) => {
            const Icon = I as typeof Code2
            return (
              <Link key={String(t)} href={String(h)}>
                <Icon size={22} />
                {String(t)}
                <ArrowRight size={16} />
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
