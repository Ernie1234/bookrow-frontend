import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/layout/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(dashboard)/layout/dashboard"!</div>
}
