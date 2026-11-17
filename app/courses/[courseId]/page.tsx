import { NetworkCourse } from '@/components/NetworkCourse'
import { CoursePage } from '@/components/Learning'
import { courses } from '@/lib/content'
import { MathCourse } from '@/components/MathCourse'
export const dynamicParams = false
export function generateStaticParams() {
  return courses.filter((c) => c.available).map((c) => ({ courseId: c.id }))
}
export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const p = await params
  if (p.courseId === 'itds231') return <NetworkCourse />
  return p.courseId === 'itds113' ? <MathCourse /> : <CoursePage />
}
