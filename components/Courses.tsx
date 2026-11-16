'use client'
import Link from 'next/link'
import { useState } from 'react'
import {
  Terminal,
  Database,
  PanelsTopLeft,
  Network,
  Workflow,
  ArrowUpRight,
  Search,
  Layers,
  Code2,
} from 'lucide-react'
import { Course, courses, modules, exercises, coursePath } from '@/lib/content'
import { useProgress } from '@/lib/progress'
import { Heading, NeoBadge, NeoProgressBar } from './ui'
const icons = [Terminal, Database, PanelsTopLeft, Workflow, Network]
export function CourseCard({ course }: { course: Course }) {
  const i = courses.findIndex((item) => item.id === course.id),
    Icon = icons[i],
    { data } = useProgress()
  const body = (
    <>
      <div className={'cover cover' + i}>
        <span className="coverlabel">
          {course.available ? 'ITDS120' : course.category}
        </span>
        <span className="artlines" aria-hidden="true">
          ✦
        </span>
        <div className="covericon">
          <Icon size={56} strokeWidth={1.7} />
        </div>
        <span className="smallstar" aria-hidden="true">
          ✧
        </span>
      </div>
      <div className="coursebody">
        <NeoBadge color={course.available ? 'mint' : 'cream'}>
          {course.available ? '● เปิดให้เรียน' : '◷ เร็ว ๆ นี้'}
        </NeoBadge>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        {course.available ? (
          <>
            <div className="metadata">
              <span>
                <Layers /> {modules.length} บท
              </span>
              <span>
                <Code2 /> {exercises.length} ข้อ
              </span>
            </div>
            <div className="metadata">
              Python · ระดับต้น <ArrowUpRight />
            </div>
            {data.submissions.length > 0 && (
              <NeoProgressBar
                value={Math.round(
                  (data.submissions.length * 100) / exercises.length,
                )}
              />
            )}
          </>
        ) : (
          <div className="metadata">อยู่ระหว่างเตรียมเนื้อหา</div>
        )}
      </div>
    </>
  )
  return course.available ? (
    <Link className="coursecard" href={coursePath}>
      {body}
    </Link>
  ) : (
    <article className="coursecard">{body}</article>
  )
}
export function Catalog() {
  const [query, q] = useState(''),
    [category, c] = useState('ทุกหมวดวิชา'),
    [availability, a] = useState('ทุกสถานะ')
  const list = courses.filter(
    (x) =>
      (' ' + x.title + ' ' + x.id + ' ' + x.category)
        .toLowerCase()
        .includes(query.trim().toLowerCase()) &&
      (category === 'ทุกหมวดวิชา' || x.category === category) &&
      (availability === 'ทุกสถานะ' ||
        x.available === (availability === 'เปิดให้เรียน')),
  )
  return (
    <div className="container content">
      <Heading kicker="คลังรายวิชา" title="สำรวจรายวิชา">
        เลือกวิชาที่สนใจ แล้วลองทำโจทย์แรกของคุณ
      </Heading>
      <div className="filters">
        <label className="search">
          <Search size={18} />
          <input
            aria-label="ค้นหารายวิชา"
            placeholder="ค้นหาด้วยชื่อหรือรหัสวิชา"
            value={query}
            onChange={(e) => q(e.target.value)}
          />
        </label>
        {[
          [category, c, ['ทุกหมวดวิชา', ...courses.map((x) => x.category)]],
          [availability, a, ['ทุกสถานะ', 'เปิดให้เรียน', 'เร็ว ๆ นี้']],
        ].map((entry, i) => {
          const [v, set, items] = entry as [
            string,
            (s: string) => void,
            string[],
          ]
          return (
            <select
              key={i}
              aria-label={i ? 'สถานะรายวิชา' : 'หมวดวิชา'}
              value={v}
              onChange={(e) => set(e.target.value)}
            >
              {items.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          )
        })}
      </div>
      <p className="mono" role="status">
        {list.length} รายวิชา
      </p>
      <div className="grid3">
        {list.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </div>
      {!list.length && <p>ไม่พบรายวิชาที่ตรงกัน ลองเปลี่ยนคำค้นหรือตัวกรอง</p>}
    </div>
  )
}
