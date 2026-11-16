'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Heading, NeoButton } from './ui'
import { useProgress } from '@/lib/progress'
export function Account({ register }: { register: boolean }) {
  const [show, S] = useState(false),
    [err, E] = useState(''),
    { login } = useProgress(),
    router = useRouter()
  function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const f = new FormData(ev.currentTarget)
    if (register && f.get('password') !== f.get('confirm')) {
      E('Passwords must match.')
      return
    }
    login(String(f.get('email')).split('@')[0])
    router.push('/dashboard')
  }
  return (
    <div className="container content auth">
      <Heading
        kicker="LEARNLOOP DEMO"
        title={register ? 'Get started.' : 'Welcome back.'}
      />
      <form className="panel" onSubmit={submit}>
        <p className="notice">
          Browser-local demo. Use a sample email and password. Only your display
          name is saved.
        </p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="student@example.edu"
          required
        />
        <label htmlFor="password">Demo password</label>
        <div className="split">
          <input
            type={show ? 'text' : 'password'}
            id="password"
            name="password"
            minLength={8}
            required
            placeholder="At least 8 characters"
            autoComplete="off"
          />
          <button
            type="button"
            aria-label={show ? 'Hide password' : 'Show password'}
            aria-pressed={show}
            onClick={() => S(!show)}
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {register && (
          <>
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              name="confirm"
              type={show ? 'text' : 'password'}
              required
              autoComplete="off"
            />
          </>
        )}
        <p className="formerror" role="alert">
          {err}
        </p>
        <div className="actions">
          <NeoButton>
            {register ? 'Create demo profile' : 'Demo login'}{' '}
            <ArrowRight size={17} />
          </NeoButton>
        </div>
        <p className="spaced">
          {register ? 'Already exploring? ' : 'New to LearnLoop? '}
          <Link className="under" href={register ? '/login' : '/register'}>
            {register ? 'Login' : 'Get Started'}
          </Link>
        </p>
      </form>
    </div>
  )
}
