// components/auth/AdminRoute.tsx
import { Navigate } from "@tanstack/react-router";
import { useIsAdmin, useIsAuthenticated } from "../../store/authStore";

function AdminRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = useIsAdmin();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/not-authorized" />;

  return <>{children}</>;
}
export default AdminRoute;
