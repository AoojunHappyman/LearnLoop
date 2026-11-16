import Link from 'next/link'
import { ReactNode, ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
const button = cva('btn', {
  variants: {
    tone: { yellow: 'yellow', white: 'white', purple: 'purple', dark: 'dark' },
  },
  defaultVariants: { tone: 'yellow' },
})
export function NeoButton({
  href,
  children,
  tone = 'yellow',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
  children: ReactNode
  tone?: 'yellow' | 'white' | 'purple' | 'dark'
}) {
  return href ? (
    <Slot className={button({ tone })}>
      <Link href={href}>{children}</Link>
    </Slot>
  ) : (
    <button {...props} className={button({ tone })}>
      {children}
    </button>
  )
}
export function NeoBadge({
  children,
  color = 'white',
}: {
  children: ReactNode
  color?: string
}) {
  return <span className={'badge ' + color}>{children}</span>
}
export function NeoCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={'card ' + className}>{children}</div>
}
export function NeoProgressBar({ value }: { value: number }) {
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label="Completion"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <i style={{ width: value + '%' }} />
    </div>
  )
}
export function Heading({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children?: ReactNode
}) {
  return (
    <header className="pageheading">
      <small>{kicker}</small>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  )
}
