import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type {
  LoginData,
  RegisterData,
} from "../validation/authValidationSchema";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";

export interface RegisterApiPayload {
  username: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  adminToken?: string;
}

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

interface RegisterResponse {
  message: string;
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: "USER" | "ADMIN";
    userImage?: string;
  };
}

interface LoginResponse {
  message: string;
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: "USER" | "ADMIN" | "SUPER_ADMIN";
    userImage?: string;
  };
}

export const useRegisterUser = (options?: {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const { setAuthState } = useAuthStore();

  return useMutation({
    mutationFn: async (data: RegisterData | RegisterApiPayload) => {
      const payload: RegisterApiPayload =
        "role" in data
          ? data
          : {
              username: data.username,
              email: data.email,
              password: data.password,
              role: data.isAdmin ? "ADMIN" : "USER",
              ...(data.isAdmin && { adminToken: data.adminToken }),
            };

      const response = await axios.post<RegisterResponse>(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      setAuthState({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      useAuthStore.getState().setUser(data.user);

      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(data.message);

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      let errorMessage = "Registration failed. Please try again.";

      if (error.response) {
        if (error.response.data.errors) {
          const firstError = Object.values(error.response.data.errors)[0][0];
          errorMessage = firstError || errorMessage;
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }

      const formattedError = new Error(errorMessage);
      toast.error(errorMessage);

      if (options?.onError) {
        options.onError(formattedError);
      }
    },
  });
};

export const useLogin = (options?: {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const { setAuthState } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      setAuthState({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(data.message);

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      const formattedError = new Error(errorMessage);
      toast.error(errorMessage);

      if (options?.onError) {
        options.onError(formattedError);
      }
    },
  });
};
