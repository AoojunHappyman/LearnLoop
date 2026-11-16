import { ModulePage } from '@/components/Learning'
import { modules, exercises } from '@/lib/content'
export const dynamicParams = false
export function generateStaticParams() {
  return modules.map((m) => ({ courseId: 'itds120', moduleId: String(m.id) }))
}
export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>
}) {
  const p = await params
  return <ModulePage id={Number(p.moduleId)} />
}
