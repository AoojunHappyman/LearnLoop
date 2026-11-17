import { ExamRoom } from '@/components/Exams'
import { allExams } from '@/lib/exam'
export const dynamicParams = false
export function generateStaticParams() {
  return allExams.map((exam) => ({ examId: exam.id }))
}
export default async function Page({
  params,
}: {
  params: Promise<{ examId: string }>
}) {
  const p = await params
  return <ExamRoom key={p.examId} examId={p.examId} />
}
