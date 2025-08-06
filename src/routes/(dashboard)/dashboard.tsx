import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar";
import NotFound from "../../components/dashboard/NotFound";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { AppSidebar } from "../../components/shared/app-sidebar";
import { Bell, LayoutList, Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

export const Route = createFileRoute("/(dashboard)/dashboard")({
  component: RouteComponent,
  notFoundComponent: () => (
    <NotFound message="This setting page doesn't exist!" />
  ),
});

function RouteComponent() {
  const { pathname } = useLocation();
  const text = pathname.split("/").pop();
  const isDiscover = pathname.includes("discover");

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className={cn("", isDiscover && "grid grid-cols-12")}>
          <div className={cn("", isDiscover && "col-span-8 flex flex-col")}>
            <header className="flex items-center gap-2 bg-gray-50 h-16 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 transition-[width,height] ease-linear shrink-0">
              <div className="flex justify-between items-center gap-2 px-4 pr-12 w-full">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="hover:bg-amber-100 -ml-1 hover:text-amber-900" />
                  <h2 className="font-raleway font-semibold text-amber-900 text-xl capitalize">
                    {text}
                  </h2>
                </div>
                {isDiscover && (
                  <div className="flex items-center max-w-md md:max-w-xl">
                    <div className="relative flex bg-amber-50 w-full">
                      <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-9 rounded-r-none focus-visible:ring-1 focus-visible:ring-offset-0 w-full h-9"
                      />
                    </div>
                    <Button size="sm" className="rounded-l-none h-9">
                      Go
                    </Button>
                  </div>
                )}
                <div className="flex">
                  <div className="flex justify-center items-center hover:bg-amber-100 p-3 rounded-full hover:text-amber-900">
                    <div className="relative flex justify-center items-center">
                      <Bell />
                      <div className="-top-2 -right-1 absolute flex justify-center items-center bg-amber-500 p-0.5 rounded-full w-5 h-5 font-roboto text-white text-xs">
                        +9
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className="flex flex-col flex-1 gap-4 bg-gray-50 p-4 pt-0">
              <Outlet />
            </div>
          </div>
          <div className="flex flex-col col-span-4 bg-[#e5d4ce]">
            <div className="flex justify-between items-center bg-white/30 backdrop-blur backdrop-filter px-4 py-6">
              <p className="font-raleway font-semibold text-xl">Chat</p>
              <div className="flex bg-white p-4 hover:border rounded-full">
                <LayoutList />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white/30 backdrop-blur backdrop-filterm-4 m-4 mb-0 p-4 rounded-md">
              Pinned Message
            </div>
            <div className="bg-[#e5d4ce] rounded-t-lg"></div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
