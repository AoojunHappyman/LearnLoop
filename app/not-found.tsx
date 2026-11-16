import { Heading, NeoButton } from '@/components/ui'
export default function Missing() {
  return (
    <div className="container content">
      <Heading kicker="404" title="Page not found">
        This learning page is unavailable.
      </Heading>
      <NeoButton href="/courses">Explore Courses</NeoButton>
    </div>
  )
}
