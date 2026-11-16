import { Practice } from '@/components/Practice'
import { modules, exercises } from '@/lib/content'
export const dynamicParams = false
export function generateStaticParams() {
  return exercises.map((e) => ({ exerciseId: e.id }))
}
export default async function Page({
  params,
}: {
  params: Promise<{ exerciseId: string }>
}) {
  const p = await params
  return <Practice exercise={exercises.find((e) => e.id === p.exerciseId)!} />
}
