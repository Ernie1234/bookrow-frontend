// routes/__root.tsx

import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";

import { Toaster } from "../components/ui/sonner";
import NavBar from "../components/shared/NavBar";
import { useScrolledPast } from "../hooks/useScrolled";
import NotFound from "../components/dashboard/NotFound";

const NAV_HEIGHT = 20;

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  const scrolledPast = useScrolledPast(NAV_HEIGHT);
  const { pathname } = useLocation();

  console.log(pathname);

  const isAuthPage = pathname === "/" || pathname === "/feed";

  return (
    <ThemeProvider>
      {isAuthPage && <NavBar scrollPast={scrolledPast} />}
      <Toaster />
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeProvider>
  );
}
