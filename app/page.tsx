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
import { CourseGroups } from '@/components/Courses'
import { NeoButton } from '@/components/ui'
export default function Home() {
  return (
    <>
      <section className="container hero">
        <div className="herocopy">
          <span className="eyebrow">
            <i /> วิทยาการและเทคโนโลยีดิจิทัล
          </span>
          <h1>
            พื้นที่ฝึก
            <br />
            ของชาว <mark>DST</mark>
          </h1>
          <p>
            ทบทวนสิ่งที่เรียนในหลักสูตร DST ลองทำโจทย์ด้วยตัวเอง
            และติดตามความก้าวหน้าในแต่ละบท
          </p>
          <div className="actions">
            <NeoButton href="/courses/itds120">
              เริ่มฝึก ITDS120 <ArrowRight size={18} />
            </NeoButton>
            <NeoButton href="/courses" tone="white">
              <BookOpen size={18} /> สำรวจรายวิชา
            </NeoButton>
          </div>
        </div>
        <div className="heroart">
          <img
            src="/hero.webp"
            width="1440"
            height="960"
            alt="คอมพิวเตอร์สีม่วงยิ้มอยู่บนกองหนังสือ ด้านหน้ามีคีย์บอร์ดสีเดียวกัน"
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
                  'บทเรียนเรียงตามลำดับ',
                  'ฝึกลงมือทำ',
                  'รู้ผลทันที',
                  'สะสมเหรียญรางวัล',
                  'บทเรียนเรียงตามลำดับ',
                  'ฝึกลงมือทำ',
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
            <small>คลังรายวิชา</small>
            <h2>
              วิชาแนะนำ<span className="purpleperiod">.</span>
            </h2>
          </div>
          <Link className="textlink" href="/courses">
            ดูรายวิชาทั้งหมด <ArrowRight size={17} />
          </Link>
        </div>
        <CourseGroups items={courses} />
      </section>
      <section className="band">
        <div className="container section">
          <small>วิธีใช้งาน</small>
          <h2>
            เรียนกับ LearnLoop<span className="purpleperiod">.</span>
          </h2>
          <div className="grid3">
            {[
              [Layers, 'เลือกวิชา', 'เลือกวิชาที่สนใจ แล้วเริ่มเรียนตามลำดับบท'],
              [Terminal, 'ฝึกทำโจทย์', 'ลองใช้สิ่งที่เพิ่งเรียนกับโจทย์ท้ายบท'],
              [Star, 'เลื่อนระดับ', 'สะสม XP และติดตามพัฒนาการของตัวเอง'],
            ].map(([I, t, d], i) => {
              const Icon = I as typeof Layers
              return (
                <article className={'card step step' + i} key={i}>
                  <Icon />
                  <small>ขั้นที่ 0{i + 1}</small>
                  <h3>{String(t)}</h3>
                  <p>{String(d)}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      <section className="container section">
        <small>เครื่องมือการเรียน</small>
        <h2>วันนี้อยากฝึกอะไร?</h2>
        <div className="featurelinks">
          {[
            [Code2, 'ฝึกเขียนโค้ด', '/practice/dict-key'],
            [Zap, 'ตรวจคำตอบทันที', '/practice/function-indent'],
            [ChartNoAxesColumnIncreasing, 'ความก้าวหน้า', '/dashboard'],
            [ClipboardList, 'เตรียมสอบ', '/exams'],
            [Target, 'XP และเหรียญรางวัล', '/achievements'],
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
