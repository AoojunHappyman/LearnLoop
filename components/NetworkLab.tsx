'use client'
import { useState } from 'react'

const edges = [['A','B',2],['A','C',6],['B','C',1],['B','D',7],['C','D',2]] as const
export function NetworkLab() {
  const [prefix, setPrefix] = useState(26)
  const [host, setHost] = useState(70)
  const [cost, setCost] = useState(2)
  const [step, setStep] = useState(0)
  const size = 2 ** (32 - prefix)
  const network = Math.floor(host / size) * size
  const distance: Record<string, number> = { A: 0, B: Infinity, C: Infinity, D: Infinity }
  const visited = new Set<string>()
  const snapshots: { chosen: string; distances: string }[] = []
  for (let i = 0; i < 4; i++) {
    const chosen = Object.keys(distance).filter(n => !visited.has(n)).sort((a,b) => distance[a] - distance[b])[0]
    visited.add(chosen)
    for (const [a,b,weight] of edges) {
      const neighbor = a === chosen ? b : b === chosen ? a : null
      if (neighbor && !visited.has(neighbor)) {
        const w = a === 'C' && b === 'D' ? cost : weight
        distance[neighbor] = Math.min(distance[neighbor], distance[chosen] + w)
      }
    }
    snapshots.push({ chosen, distances: Object.entries(distance).map(([n,d]) => n + '=' + (d === Infinity ? '∞' : d)).join(' · ') })
  }
  return <section className="panel spaced network-lab">
    <h2>ทดลอง Subnetting และ Dijkstra</h2>
    <h3>IPv4 ภายใน 192.168.1.0/24</h3>
    <div className="network-lab-controls">
    <label>Prefix
      <select aria-label="Prefix" value={prefix} onChange={e => setPrefix(Number(e.target.value))}>
        {[24,25,26,27,28,29,30].map(p => <option key={p} value={p}>/{p}</option>)}
      </select>
    </label>
    <label>Octet สุดท้ายของ IP · {host}
      <input type="range" min="0" max="255" value={host} onChange={e => setHost(Number(e.target.value))} />
    </label>
    </div>
    <div className="network-lab-result" aria-live="polite">
    <p>Network 192.168.1.{network} · Broadcast 192.168.1.{network + size - 1}</p>
    <p>Usable 192.168.1.{network + 1} ถึง 192.168.1.{network + size - 2} · {size - 2} โฮสต์</p>
    </div>
    <p className="network-lab-explanation">วิธีคิด เหลือบิตโฮสต์ {32-prefix} บิต จึงมี {size} ที่อยู่ หาจุดเริ่มบล็อกด้วย floor({host}/{size}) × {size} = {network}</p>
    <h3 className="spaced">Shortest path จาก A · ลิงก์สองทิศทาง</h3>
    <p>A—B (2), A—C (6), B—C (1), B—D (7), C—D ({cost})</p>
    <label className="network-lab-cost">Cost ของ C—D · {cost}
      <input type="range" min="1" max="12" value={cost} onChange={e => {setCost(Number(e.target.value));setStep(0)}} />
    </label>
    <p>เริ่มต้น A=0, B=∞, C=∞, D=∞ แต่ละรอบเลือกโหนดที่ยังไม่ยืนยันและมีระยะต่ำสุด แล้วปรับระยะของเพื่อนบ้าน</p>
    <ol className="network-lab-steps" aria-live="polite">{snapshots.slice(0,step).map((s,i) => <li key={i}>ยืนยัน {s.chosen} แล้วปรับระยะ · {s.distances}</li>)}</ol>
    <div className="actions">
      <button className="btn yellow" disabled={step===4} onClick={() => setStep(step+1)}>คำนวณรอบถัดไป</button>
      <button className="btn white" onClick={() => setStep(0)}>เริ่มใหม่</button>
    </div>
  </section>
}
