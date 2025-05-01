import { Outlet } from "react-router";
import { ThemeProvider } from "./components/theme-provider";

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default RootLayout;
