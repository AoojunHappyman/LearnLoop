import { ExamRoom } from '@/components/Exams'
import { modules, exercises } from '@/lib/content'
export const dynamicParams = false
export function generateStaticParams() {
  return [{ examId: 'itds120-mock' }]
}
export default async function Page({
  params,
}: {
  params: Promise<{ examId: string }>
}) {
  const p = await params
  return <ExamRoom />
}
