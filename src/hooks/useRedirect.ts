// hooks/useRedirect.ts
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useIsAuthenticated } from "../store/authStore";

export function useRedirect() {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isAuthenticated &&
      ["/login", "/register"].includes(location.pathname)
    ) {
      navigate({ to: "/layout/dashboard" });
    }
  }, [isAuthenticated, location.pathname, navigate]);
}
