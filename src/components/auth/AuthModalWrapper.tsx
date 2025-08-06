// components/auth/AuthModalWrapper.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

import { useIsAuthenticated } from "../../store/authStore";
import { Dialog } from "../ui/dialog";
import { LoginForm } from "./login-form";

interface AuthModalWrapperProps {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
  onAction: () => void;
}

function AuthModalWrapper({ children, onAction }: AuthModalWrapperProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAction = () => {
    if (isAuthenticated) {
      onAction();
    } else {
      // Store the current path if it's not an auth page
      if (!["/login", "/register"].includes(location.pathname)) {
        setRedirectPath(location.pathname);
      }
      setShowAuthModal(true);
    }
  };

  return (
    <>
      {React.cloneElement(children, { onClick: handleAction })}

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <LoginForm
          onSuccess={() => {
            setShowAuthModal(false);
            if (redirectPath) {
              navigate({ to: redirectPath });
              // Small delay to ensure navigation completes before action
              setTimeout(onAction, 100);
            } else {
              navigate({ to: "/dashboard/discover" });
            }
          }}
        />
      </Dialog>
    </>
  );
}

export default AuthModalWrapper;

// Usage example:
{
  /* <AuthModalWrapper onAction={() => handleLikeBook()}>
  <Button>Like this book</Button>
</AuthModalWrapper>; */
}
