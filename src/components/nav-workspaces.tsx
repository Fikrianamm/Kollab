import { Plus } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

export function NavWorkspaces({
  projects,
}: {
  projects: {
    name: string;
    url: string;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="flex items-center justify-between">
        <SidebarGroupLabel className="uppercase">Workspace</SidebarGroupLabel>
        <Link to={"/workspaces/create"}>
          <Plus
            size={16}
            className="text-muted-foreground hover:text-foreground"
          />
        </Link>
      </div>
      <SidebarMenu className="gap-4">
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <div className="dark:text-white bg-blue-50 dark:bg-blue-600 border-blue-600 border text-blue-600 px-2 py-1 rounded-sm">
                  {item.name.slice(0, 1).toUpperCase()}
                </div>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
