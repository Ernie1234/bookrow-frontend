import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  userId?: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  userImage?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setAuthState: (tokens: { accessToken: string; refreshToken: string }) => void;
  setUser: (user: User) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  refreshAccessToken: (newToken: string) => void;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setAuthState: ({ accessToken, refreshToken }) => {
        try {
          const decoded = jwtDecode<User>(accessToken);
          set({
            user: {
              id: decoded.userId || decoded.id,
              username: decoded.username || "",
              email: decoded.email || "",
              role: decoded.role || "USER",
              userImage:
                decoded.userImage ||
                "https://placehold.co/400x400/000000/FFFFFF?text=User",
            },
            accessToken,
            refreshToken,
            isAuthenticated: true,
            error: null,
          });
        } catch (error) {
          console.log(error);
          set({ error: "Invalid token" });
        }
      },

      setUser: (user) => set({ user }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      logout: () => {
        set(initialState);
        // Optional: Add API call to invalidate tokens on server
      },

      refreshAccessToken: (newToken) => {
        try {
          const decoded = jwtDecode<User>(newToken);
          set({
            accessToken: newToken,
            user: {
              id: decoded.userId || decoded.id,
              username: decoded.username || "",
              email: decoded.email || "",
              role: decoded.role || "USER",
              userImage:
                decoded.userImage ||
                "https://placehold.co/400x400/000000/FFFFFF?text=User",
            },
          });
        } catch (error) {
          console.error("Token refresh error:", error);
          set({ error: "Failed to refresh token" });
        }
      },
    }),
    {
      name: "auth-storage", // name for the storage
      storage: createJSONStorage(() => localStorage), // or sessionStorage
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);

// Helper hooks for easier access to store properties
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useCurrentUser = () => useAuthStore((state) => state.user);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useAuthActions = () =>
  useAuthStore((state) => ({
    setAuthState: state.setAuthState,
    setUser: state.setUser,
    logout: state.logout,
    refreshAccessToken: state.refreshAccessToken,
  }));
