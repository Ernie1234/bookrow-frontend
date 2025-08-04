// components/auth/SuperAdminRoute.tsx
import { Navigate } from "@tanstack/react-router";
import { useIsSuperAdmin, useIsAuthenticated } from "../../store/authStore";

function SuperAdminRoute({ children }: { children: React.ReactNode }) {
  const isSuperAdmin = useIsSuperAdmin();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isSuperAdmin) return <Navigate to="/not-authorized" />;

  return <>{children}</>;
}
export default SuperAdminRoute;
