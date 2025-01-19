import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cocktails/$cocktailId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/cocktails/$cocktailId/edit"!</div>
}
