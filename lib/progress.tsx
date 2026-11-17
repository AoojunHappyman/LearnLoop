'use client'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { Exercise, Submission, UserProgress } from './content'
import { authClient } from './auth'
const initial: UserProgress = { user: null, submissions: [] }
const Context = createContext({
  data: initial,
  complete: (_e: Exercise) => {},
  logout: () => {},
})
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, set] = useState(initial),
    [ready, r] = useState(false)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('learnloop:advanced:v1')
      const x = JSON.parse(
        saved ?? localStorage.getItem('learnloop:v1') ?? 'null',
      )
      if (!saved && Array.isArray(x?.submissions)) {
        x.submissions = x.submissions.map((s: Submission) => ({
          ...s,
          exerciseId: 'legacy:' + s.exerciseId,
        }))
      }
      if (x && Array.isArray(x.submissions)) set({ user: null, submissions: x.submissions })
    } catch {}
    r(true)
    const listener = authClient?.auth.onAuthStateChange((_event, session) => {
      const email = session?.user.email
      set((p) => ({ ...p, user: email ? { name: email.split('@')[0] } : null }))
    })
    return () => listener?.data.subscription.unsubscribe()
  }, [])
  useEffect(() => {
    if (ready)
      localStorage.setItem('learnloop:advanced:v1', JSON.stringify({ submissions: data.submissions }))
  }, [ready, data])
  return (
    <Context.Provider
      value={{
        data,
        logout: () => { void authClient?.auth.signOut({ scope: 'local' }) },
        complete: (e) =>
          set((p) =>
            p.submissions.some((s) => s.exerciseId === e.id)
              ? p
              : {
                  ...p,
                  submissions: [
                    ...p.submissions,
                    {
                      exerciseId: e.id,
                      xp: e.xp,
                      date: new Date().toISOString(),
                    },
                  ],
                },
          ),
      }}
    >
      {children}
    </Context.Provider>
  )
}
export const useProgress = () => useContext(Context)
