import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/dashboard/favorites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(dashboard)/dashboard/favorite"!</div>
}
