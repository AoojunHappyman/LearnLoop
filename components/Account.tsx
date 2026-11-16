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
      E('กรุณากรอกรหัสผ่านทั้งสองช่องให้ตรงกัน')
      return
    }
    login(String(f.get('email')).split('@')[0])
    router.push('/dashboard')
  }
  return (
    <div className="container content auth">
      <Heading
        kicker="LearnLoop รุ่นทดลอง"
        title={register ? 'เริ่มใช้งาน' : 'ยินดีต้อนรับกลับมา'}
      />
      <form className="panel" onSubmit={submit}>
        <p className="notice">
          ทดลองใช้งานด้วยอีเมลและรหัสผ่านสมมติ ระบบจะบันทึกเฉพาะชื่อที่ใช้แสดงไว้ในเบราว์เซอร์นี้
        </p>
        <label htmlFor="email">อีเมล</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="student@example.edu"
          required
        />
        <label htmlFor="password">รหัสผ่านสำหรับทดลอง</label>
        <div className="split">
          <input
            type={show ? 'text' : 'password'}
            id="password"
            name="password"
            minLength={8}
            required
            placeholder="อย่างน้อย 8 ตัวอักษร"
            autoComplete="off"
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
              autoComplete="off"
            />
          </>
        )}
        <p className="formerror" role="alert">
          {err}
        </p>
        <div className="actions">
          <NeoButton>
            {register ? 'สร้างโปรไฟล์ทดลอง' : 'เข้าสู่ระบบทดลอง'}{' '}
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
