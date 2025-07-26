import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NavBar from "../components/shared/NavBar";
import { useScrolledPast } from "../hooks/useScrolled";

const NAV_HEIGHT = 20;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const scrolledPast = useScrolledPast(NAV_HEIGHT);

  return (
    <>
      <NavBar scrollPast={scrolledPast} />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
