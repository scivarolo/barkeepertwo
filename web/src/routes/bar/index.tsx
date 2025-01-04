import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bar/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bar/"!</div>
}
