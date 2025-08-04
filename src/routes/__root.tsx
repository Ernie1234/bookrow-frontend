import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";

import { Toaster } from "../components/ui/sonner";
import NavBar from "../components/shared/NavBar";
import { useScrolledPast } from "../hooks/useScrolled";

const NAV_HEIGHT = 20;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const scrolledPast = useScrolledPast(NAV_HEIGHT);
  const { pathname } = useLocation();

  console.log(pathname);

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forget-password";

  return (
    <ThemeProvider>
      {!isAuthPage && <NavBar scrollPast={scrolledPast} />}
      <Toaster />
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeProvider>
  );
}
