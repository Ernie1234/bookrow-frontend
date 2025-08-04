//app.tsx

// // In your root component or layout
// import { Navigate, Outlet, useRouter } from "@tanstack/react-router";
// import { useIsAuthenticated, useUserRole } from "./store/authStore";

// function AppLayout() {
//   const router = useRouter();
//   const isAuthenticated = useIsAuthenticated();
//   const role = useUserRole();

//   // Check if current route requires authentication
//   const routeMeta = router.state.currentMatches[0]?.routeContext?.meta;
//   const requiresAuth = routeMeta?.requiresAuth;
//   const requiredRole = routeMeta?.requiredRole;

//   if (requiresAuth && !isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (requiredRole && role !== requiredRole) {
//     return <Navigate to="/not-authorized" />;
//   }

//   return <Outlet />;
// }

// export default AppLayout;
