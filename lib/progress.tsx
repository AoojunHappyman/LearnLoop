'use client'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Exercise, Submission, UserProgress } from './content'
import { authClient } from './auth'
import { guestPrefix, readGuest, readPrefix, type Records } from './learning-records'

const Context = createContext({
  data: { user: null, submissions: [] } as UserProgress,
  records: {} as Records,
  ready: false,
  complete: (_e: Exercise) => {},
  write: (_key: string, _value: string) => {},
  importGuest: async (_keys: string[]) => {},
  logout: () => {},
})

type Owner = { id: string; name: string }
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [owner, setOwner] = useState<Owner | null | undefined>(undefined)
  useEffect(() => {
    if (!authClient) { setOwner(null); return }
    const { data } = authClient.auth.onAuthStateChange((_event, session) => {
      setOwner(session ? { id: session.user.id, name: session.user.email?.split('@')[0] ?? 'ผู้เรียน' } : null)
    })
    return () => data.subscription.unsubscribe()
  }, [])
  return <Workspace key={owner?.id ?? String(owner)} owner={owner}>{children}</Workspace>
}

function Workspace({ owner, children }: { owner: Owner | null | undefined; children: ReactNode }) {
  const [records, setRecords] = useState<Records>({})
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)
  const flush = useRef(() => {})
  const prefix = 'learnloop:pending:' + owner?.id + ':'

  useEffect(() => {
    if (owner === undefined) return
    if (!owner) {
      setRecords(readGuest())
      setReady(true)
      return
    }
    const user_id = owner.id
    const table = authClient!.from('learning_records')
    let active = true
    let running = false
    let timer: ReturnType<typeof setTimeout>
    async function drain() {
      if (running || !active) return
      running = true
      try {
        while (active) {
          const pending = Object.entries(readPrefix(prefix))
          if (!pending.length) break
          const rows = pending.map(([key, value]) => ({ user_id, key, value }))
          const { error } = await table.upsert(rows)
          if (error) throw error
          for (const [key, value] of pending) {
            if (localStorage.getItem(prefix + key) === value) localStorage.removeItem(prefix + key)
          }
        }
        if (active) setError(false)
      } catch { if (active) setError(true) }
      finally { running = false }
    }
    flush.current = () => {
      clearTimeout(timer)
      timer = setTimeout(drain, 300)
    }
    async function load() {
      const { data, error } = await table.select('key,value').eq('user_id', user_id)
      if (!active) return
      if (error) { setError(true); return }
      setRecords({ ...Object.fromEntries(data.map(r => [r.key, r.value])), ...readPrefix(prefix) })
      setReady(true)
      void drain()
    }
    void load()
    window.addEventListener('online', drain)
    return () => { active = false; clearTimeout(timer); window.removeEventListener('online', drain) }
  }, [owner?.id, owner === undefined, prefix, retry])

  function write(key: string, value: string) {
    if (!ready || records[key] === value) return
    localStorage.setItem((owner ? prefix : guestPrefix) + key, value)
    setRecords(previous => ({ ...previous, [key]: value }))
    if (owner) flush.current()
  }
  async function importGuest(keys: string[]) {
    if (!owner || !ready) return
    const rows = Object.entries(readGuest()).filter(([key]) => keys.includes(key) && !(key in records))
      .map(([key,value]) => ({ user_id: owner.id, key, value }))
    if (!rows.length) return
    const { error } = await authClient!.from('learning_records').upsert(rows, { ignoreDuplicates: true })
    if (error) throw error
    setReady(false)
    setRetry(n => n + 1)
  }
  const submissions: Submission[] = Object.entries(records).filter(([key]) => key.startsWith('passed:'))
    .flatMap(([, value]) => {
      try { const s = JSON.parse(value); return typeof s?.exerciseId === 'string' && Number.isFinite(s.xp) && Number.isFinite(Date.parse(s.date)) ? [s] : [] }
      catch { return [] }
    }).sort((a,b) => a.date.localeCompare(b.date))
  return <Context.Provider value={{
    data: { user: owner ?? null, submissions }, records, ready, write, importGuest,
    logout: () => { void authClient?.auth.signOut({ scope: 'local' }) },
    complete: e => {
      const key = 'passed:' + e.id
      if (!(key in records)) write(key, JSON.stringify({ exerciseId: e.id, xp: e.xp, date: new Date().toISOString() }))
    },
  }}>
    {error && <p className="container notice" role="alert">ซิงก์ข้อมูลบัญชีไม่ได้ <button onClick={() => { setReady(false); setRetry(n => n + 1) }}>ลองอีกครั้ง</button></p>}
    {children}
  </Context.Provider>
}
export const useProgress = () => useContext(Context)
