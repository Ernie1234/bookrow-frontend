// components/AuthInitializer.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { useVerifyToken } from "../../hooks/useVerifyToken";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const {
    accessToken,
    refreshToken,
    setAuthState,
    logout,
    initialize,
    setLoading,
  } = useAuthStore();
  const { verifyToken } = useVerifyToken();

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // Case 1: No tokens exist
        if (!accessToken && !refreshToken) {
          console.log("No tokens found, initializing as guest");
          initialize();
          return;
        }

        // Case 2: Verify existing access token
        if (accessToken) {
          const isValid = await verifyToken(accessToken);

          if (isValid) {
            console.log("Access token is valid");
            initialize();
            return;
          }
        }

        // Case 3: Attempt refresh with refresh token
        if (refreshToken) {
          try {
            console.log("Attempting token refresh");
            const { data } = await axios.post(
              `${import.meta.env.VITE_API_URL}/auth/refresh`,
              { refreshToken },
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            );

            setAuthState({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            });
            initialize();
            return;
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
          }
        }

        // Case 4: All auth attempts failed
        console.log("Authentication failed, logging out");
        logout();
      } catch (error) {
        console.error("Auth initialization error:", error);
        logout();
      } finally {
        setLoading(false);
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  if (isInitializing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        loading in authInitializer...
      </div>
    );
  }

  return <>{children}</>;
}
