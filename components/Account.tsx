'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Heading, NeoButton } from './ui'
import { authClient } from '@/lib/auth'
export function Account({ register }: { register: boolean }) {
  const [show, S] = useState(false),
    [err, E] = useState(''),
    [busy, setBusy] = useState(false),
    [notice, setNotice] = useState(''),
    router = useRouter()
  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    if (!authClient || busy) return
    E('')
    setNotice('')
    const f = new FormData(ev.currentTarget)
    if (register && f.get('password') !== f.get('confirm')) {
      E('กรุณากรอกรหัสผ่านทั้งสองช่องให้ตรงกัน')
      return
    }
    const credentials = { email: String(f.get('email')).trim(), password: String(f.get('password')) }
    setBusy(true)
    try {
      const { data, error } = register
        ? await authClient.auth.signUp({ ...credentials, options: { emailRedirectTo: window.location.origin + '/dashboard/' } })
        : await authClient.auth.signInWithPassword(credentials)
      if (error) {
        E(error.code === 'invalid_credentials' ? 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' :
          error.code === 'email_not_confirmed' ? 'กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ' : error.message)
      } else if (data.session) {
        router.replace('/dashboard')
      } else {
        setNotice('ตรวจกล่องจดหมายของคุณ แล้วกดลิงก์ยืนยันอีเมลเพื่อเริ่มใช้งาน')
      }
    } catch {
      E('เชื่อมต่อบริการบัญชีไม่ได้ กรุณาลองอีกครั้ง')
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className="container content auth">
      <Heading
        kicker="บัญชี LearnLoop"
        title={register ? 'เริ่มใช้งาน' : 'ยินดีต้อนรับกลับมา'}
      />
      <form className="panel" onSubmit={submit}>
        <p className="notice">
          {authClient ? 'ประวัติการฝึกยังเก็บไว้ในเบราว์เซอร์นี้' : 'ระบบบัญชีอีเมลยังไม่เปิดให้บริการ คุณยังฝึกทำโจทย์แบบผู้เรียนรับเชิญได้'}
        </p>
        <label htmlFor="email">อีเมล</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="student@example.edu"
          required
        />
        <label htmlFor="password">รหัสผ่าน</label>
        <div className="split">
          <input
            type={show ? 'text' : 'password'}
            id="password"
            name="password"
            minLength={8}
            required
            placeholder="อย่างน้อย 8 ตัวอักษร"
            autoComplete={register ? 'new-password' : 'current-password'}
          />
          <button
            type="button"
            aria-label={show ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
            aria-pressed={show}
            onClick={() => S(!show)}
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {register && (
          <>
            <label htmlFor="confirm">ยืนยันรหัสผ่าน</label>
            <input
              id="confirm"
              name="confirm"
              type={show ? 'text' : 'password'}
              required
              autoComplete={register ? 'new-password' : 'current-password'}
            />
          </>
        )}
        <p className="formerror" role="alert">
          {err}
        </p>
        {notice && <p role="status">{notice}</p>}
        <div className="actions">
          <NeoButton disabled={!authClient || busy}>
            {register ? 'สมัครด้วยอีเมล' : 'เข้าสู่ระบบ'}{' '}
            <ArrowRight size={17} />
          </NeoButton>
        </div>
        <p className="spaced">
          {register ? 'เคยใช้งานแล้ว? ' : 'เพิ่งรู้จัก LearnLoop? '}
          <Link className="under" href={register ? '/login' : '/register'}>
            {register ? 'เข้าสู่ระบบ' : 'เริ่มใช้งาน'}
          </Link>
        </p>
      </form>
    </div>
  )
}
