import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/dashboard/continue")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(dashboard)/dashboard/continue"!</div>;
}
