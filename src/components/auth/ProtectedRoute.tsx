
import { Navigate } from '@tanstack/react-router';
import React from 'react';
import { useIsAuthenticated } from '../../store/authStore';

/**
 * A component that protects routes by redirecting unauthenticated users to the login page.
 * It uses a Zustand store to check the authentication status.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The children to render if the user is authenticated.
 * @returns {React.ReactNode} The protected content or a redirection to the login page.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Retrieve the authentication status from your Zustand store.
  // The useIsAuthenticated hook should return a boolean.
  const isAuthenticated = useIsAuthenticated();
  
  // If the user is not authenticated, redirect them to the '/login' route.
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If the user is authenticated, render the children of this component.
  return <>{children}</>;
}

export default ProtectedRoute;
