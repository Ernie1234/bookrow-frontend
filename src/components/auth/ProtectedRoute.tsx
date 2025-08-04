// components/auth/ProtectedRoute.tsx
import { Navigate } from "@tanstack/react-router";
import { useIsAuthenticated } from "../../store/authStore";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}
export default ProtectedRoute;
