// store/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  userImage?: string;
}

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setAuthState: (tokens: { accessToken: string; refreshToken: string }) => void;
  setUser: (user: IUser) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  initialize: () => void;
  refreshAccessToken: (newToken: string) => void;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setAuthState: ({ accessToken, refreshToken }) => {
        try {
          const decoded = jwtDecode<IUser>(accessToken);
          set({
            user: {
              id: decoded.id,
              username: decoded.username || "",
              email: decoded.email || "",
              role: decoded.role || "USER",
              userImage: decoded.userImage,
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
      },

      initialize: () => set({ isInitialized: true }),

      refreshAccessToken: (newToken) => {
        try {
          const decoded = jwtDecode<IUser>(newToken);
          set({
            accessToken: newToken,
            user: {
              id: decoded.id,
              username: decoded.username || "",
              email: decoded.email || "",
              role: decoded.role || "USER",
              userImage: decoded.userImage,
            },
          });
        } catch (error) {
          console.log(error);
          set({ error: "Failed to refresh token" });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);

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
