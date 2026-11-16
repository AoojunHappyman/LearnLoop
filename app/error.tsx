'use client'
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container content">
      <h1>Unable to load this page</h1>
      <button className="btn yellow" onClick={reset}>
        Try again
      </button>
    </div>
  )
}
