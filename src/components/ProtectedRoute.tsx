import { Outlet } from "react-router";

export default function ProtectedRoute() {
  //   const isAuthenticated = !!localStorage.getItem("authToken");

  //   if (!isAuthenticated) {
  //     return <Navigate to="/auth/login" replace />;
  //   }

  return <Outlet />;
}
