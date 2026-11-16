'use client'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { Exercise, Submission, UserProgress } from './content'
const initial: UserProgress = { user: null, submissions: [] }
const Context = createContext({
  data: initial,
  complete: (_e: Exercise) => {},
  login: (_n: string) => {},
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
      if (x && Array.isArray(x.submissions)) set(x)
    } catch {}
    r(true)
  }, [])
  useEffect(() => {
    if (ready)
      localStorage.setItem('learnloop:advanced:v1', JSON.stringify(data))
  }, [ready, data])
  return (
    <Context.Provider
      value={{
        data,
        login: (name) => set((p) => ({ ...p, user: { name } })),
        logout: () => set((p) => ({ ...p, user: null })),
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
