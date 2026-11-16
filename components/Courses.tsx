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
          {course.available ? '● Available' : '◷ Coming soon'}
        </NeoBadge>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        {course.available ? (
          <>
            <div className="metadata">
              <span>
                <Layers /> {modules.length} modules
              </span>
              <span>
                <Code2 /> {exercises.length} exercises
              </span>
            </div>
            <div className="metadata">
              Python · Beginner <ArrowUpRight />
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
          <div className="metadata">Planned course · Details to follow</div>
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
    [category, c] = useState('All subjects'),
    [availability, a] = useState('All statuses')
  const list = courses.filter(
    (x) =>
      (' ' + x.title + ' ' + x.id + ' ' + x.category)
        .toLowerCase()
        .includes(query.trim().toLowerCase()) &&
      (category === 'All subjects' || x.category === category) &&
      (availability === 'All statuses' ||
        x.available === (availability === 'Available')),
  )
  return (
    <div className="container content">
      <Heading kicker="Course catalog" title="Explore courses">
        Choose a subject and find your next challenge.
      </Heading>
      <div className="filters">
        <label className="search">
          <Search size={18} />
          <input
            aria-label="Search courses"
            placeholder="Search courses or codes"
            value={query}
            onChange={(e) => q(e.target.value)}
          />
        </label>
        {[
          [category, c, ['All subjects', ...courses.map((x) => x.category)]],
          [availability, a, ['All statuses', 'Available', 'Coming soon']],
        ].map((entry, i) => {
          const [v, set, items] = entry as [
            string,
            (s: string) => void,
            string[],
          ]
          return (
            <select
              key={i}
              aria-label={i ? 'Availability' : 'Category'}
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
        {list.length} courses
      </p>
      <div className="grid3">
        {list.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </div>
      {!list.length && (
        <p>
          No courses match your filters. Try another subject or search term.
        </p>
      )}
    </div>
  )
}
