import { Card } from "@/components/ui/card";
import { Outlet } from "react-router";
import { useTheme } from "../theme-provider";

export default function AuthLayout() {
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/LogoDark.svg" : "/LogoLight.svg";
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <img
            alt="Kollab Logo"
            className="mx-auto w-[156px]"
            width={100}
            height={100}
            src={logoSrc}
          />
          <Card>
            <Outlet />
          </Card>
        </div>
      </div>
    </div>
  );
}
