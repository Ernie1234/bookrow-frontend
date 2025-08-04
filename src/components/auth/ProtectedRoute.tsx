// components/auth/ProtectedRoute.tsx
import { Navigate } from "@tanstack/react-router";
import { useAuthStore } from "../../store/authStore";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isInitialized, isAuthenticated, isLoading } = useAuthStore();

  if (!isInitialized || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        loading in protectedRoute...
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}
