// hooks/useVerifyToken.ts
import axios from "axios";

export function useVerifyToken() {
  const verifyToken = async (token: string) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.valid;
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  };

  return { verifyToken };
}
