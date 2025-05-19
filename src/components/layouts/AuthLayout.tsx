import { Card } from "@/components/ui/card";
import { Outlet } from "react-router";
import { useTheme } from "../theme-provider";

export default function AuthLayout() {
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/LogoDark.svg" : "/LogoLight.svg";
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <img
        src="/blob.svg"
        alt="blob"
        className="absolute left-0 z-0 blur-3xl opacity-25 h-screen"
      />
      <img
        src="/blob.svg"
        alt="blob"
        className="absolute right-0 z-0 blur-3xl opacity-25 h-3/5"
      />

      <div className="w-full max-w-sm z-50">
        <div className="flex flex-col gap-6">
          <img
            alt="Kollab Logo"
            className="mx-auto w-[156px]"
            width={100}
            height={100}
            src={logoSrc}
          />
          <Card className="bg-card/50">
            <Outlet />
          </Card>
        </div>
      </div>
    </div>
  );
}
