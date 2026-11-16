'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ArrowUpRight, Infinity as Loop, Menu, X } from 'lucide-react'
import { useProgress } from '@/lib/progress'
const links = [
  ['หน้าแรก', '/'],
  ['สำรวจรายวิชา', '/courses'],
  ['ฝึกทำโจทย์', '/practice/hello-loop'],
  ['อันดับผู้เรียน', '/leaderboard'],
]
export function Logo() {
  return (
    <Link className="logo" href="/">
      <span>
        <Loop size={30} strokeWidth={3} />
      </span>
      LearnLoop
    </Link>
  )
}
export function Navbar() {
  const [open, set] = useState(false)
  const path = usePathname()
  const { data } = useProgress()
  return (
    <header className="navshell">
      <a href="#main" className="skip">
        ข้ามไปยังเนื้อหา
      </a>
      <div className="container navbar">
        <Logo />
        <nav className={open ? 'open' : ''} aria-label="เมนูหลัก">
          {links.map(([n, h]) => (
            <Link
              key={h}
              href={h}
              aria-current={path === h ? 'page' : undefined}
              onClick={() => set(false)}
            >
              {n}
            </Link>
          ))}
          <Link
            className="mobileaccount"
            onClick={() => set(false)}
            href={data.user ? '/profile' : '/login'}
          >
            {data.user ? 'โปรไฟล์' : 'เข้าสู่ระบบ'}
          </Link>
        </nav>
        <div className="navright">
          <Link className="login" href={data.user ? '/profile' : '/login'}>
            {data.user ? 'โปรไฟล์' : 'เข้าสู่ระบบ'}
          </Link>
          <Link
            className="btn yellow mini"
            href={data.user ? '/dashboard' : '/register'}
          >
            {data.user ? 'ภาพรวมการเรียน' : 'เริ่มใช้งาน'}{' '}
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu"
            aria-label="เปิดหรือปิดเมนู"
            aria-expanded={open}
            onClick={() => set(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footerrow">
          <Logo />
          <div>
            {[
              ['รายวิชา', '/courses'],
              ['ภาพรวมการเรียน', '/dashboard'],
              ['โปรไฟล์', '/profile'],
              ['เหรียญรางวัล', '/achievements'],
              ['ข้อสอบฝึกทำ', '/exams'],
            ].map(([n, h]) => (
              <Link key={n} href={h}>
                {n}
              </Link>
            ))}
          </div>
        </div>
        <p>เรียนรู้ ฝึกฝน ก้าวไปอีกขั้น · โครงการเรียนรู้อิสระสำหรับนักศึกษา</p>
      </div>
    </footer>
  )
}
