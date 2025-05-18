import useAuth from "@/stores/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function ProtectedRoute() {
  const { getUser, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/auth/login", { replace: true });
  }

  return <Outlet />;
}
