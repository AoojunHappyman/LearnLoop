'use client'
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container content">
      <h1>โหลดหน้านี้ไม่สำเร็จ</h1>
      <button className="btn yellow" onClick={reset}>
        ลองอีกครั้ง
      </button>
    </div>
  )
}
