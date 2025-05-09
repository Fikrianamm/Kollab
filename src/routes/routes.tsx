import RootLayout from "@/App";
import AuthLayout from "@/components/layouts/AuthLayout";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginPage from "@/pages/auth/login/Page";
import RegisterPage from "@/pages/auth/register/Page";
import DashboardPage from "@/pages/dashboard/Page";
import LandingPage from "@/pages/LandingPage";
import PeoplesPage from "@/pages/people/Page";
import SettingPage from "@/pages/settings/Page";
import TasksPage from "@/pages/tasks/Page";
import WorkspacePage from "@/pages/workspace/Page";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterPage },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <SidebarLayout />,
            children: [
              { path: "settings", element: <SettingPage /> },
              { path: "dashboard", element: <DashboardPage /> },
              { path: "peoples", element: <PeoplesPage /> },
              { path: "tasks", element: <TasksPage /> },
              { path: "/workspaces/:id", element: <WorkspacePage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
