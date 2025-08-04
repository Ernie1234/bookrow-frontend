import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/not-authorized')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/not-authorized"!</div>
}
