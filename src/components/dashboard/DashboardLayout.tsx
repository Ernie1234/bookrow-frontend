// layouts/DashboardLayout.tsx
import { Outlet } from "@tanstack/react-router";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* <DashboardSidebar /> */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <DashboardHeader /> */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
