import * as React from "react";
import { House, LayoutGrid, Users } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavWorkspaces } from "@/components/nav-workspaces";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: House,
    },
    {
      title: "People",
      url: "/peoples",
      icon: Users,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: LayoutGrid,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
    },
    {
      name: "Sales & Marketing",
      url: "#",
    },
    {
      name: "Travel",
      url: "#",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();
  const logoSrc =
    theme === "light" ? "/LogoSimpleLight.svg" : "/LogoSimpleDark.svg";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary dark:bg-white text-sidebar-primary-foreground">
            <img
              alt="Kollab Logo"
              className="m-0 mb-1"
              width={25}
              height={25}
              src={logoSrc}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-xl">Kollab</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavWorkspaces projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
