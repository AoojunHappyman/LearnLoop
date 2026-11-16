import { CoursePage } from '@/components/Learning'
import { modules, exercises } from '@/lib/content'
export const dynamicParams = false
export function generateStaticParams() {
  return [{ courseId: 'itds120' }]
}
export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const p = await params
  return <CoursePage />
}
