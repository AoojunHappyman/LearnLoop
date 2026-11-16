'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ArrowUpRight, Infinity as Loop, Menu, X } from 'lucide-react'
import { useProgress } from '@/lib/progress'
const links = [
  ['Home', '/'],
  ['Explore Courses', '/courses'],
  ['Practice', '/practice/hello-loop'],
  ['Leaderboard', '/leaderboard'],
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
        Skip to content
      </a>
      <div className="container navbar">
        <Logo />
        <nav className={open ? 'open' : ''} aria-label="Primary">
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
            {data.user ? 'Profile' : 'Login'}
          </Link>
        </nav>
        <div className="navright">
          <Link className="login" href={data.user ? '/profile' : '/login'}>
            {data.user ? 'Profile' : 'Login'}
          </Link>
          <Link
            className="btn yellow mini"
            href={data.user ? '/dashboard' : '/register'}
          >
            {data.user ? 'Dashboard' : 'Get Started'} <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu"
            aria-label="Toggle navigation"
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
              ['Courses', '/courses'],
              ['Dashboard', '/dashboard'],
              ['Profile', '/profile'],
              ['Achievements', '/achievements'],
              ['Practice exams', '/exams'],
            ].map(([n, h]) => (
              <Link key={n} href={h}>
                {n}
              </Link>
            ))}
          </div>
        </div>
        <p>
          Learn. Practice. Level Up. · Independent student learning project.
        </p>
      </div>
    </footer>
  )
}
