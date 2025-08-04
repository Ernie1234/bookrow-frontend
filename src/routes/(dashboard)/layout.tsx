import { createFileRoute, Outlet } from "@tanstack/react-router";
import NotFound from "../../components/dashboard/NotFound";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";

export const Route = createFileRoute("/(dashboard)/layout")({
  component: RouteComponent,
  notFoundComponent: () => (
    <NotFound message="This setting page doesn't exist!" />
  ),
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        {/* <DashboardSidebar /> */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* <DashboardHeader /> */}
          <main className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
