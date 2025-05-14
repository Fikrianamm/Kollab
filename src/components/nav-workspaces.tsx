import { Plus } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import useAuth from "@/stores/useAuth";

export function NavWorkspaces({
  projects,
}: {
  projects: {
    name: string;
    url: string;
  }[];
}) {
  const location = useLocation();
  const pathLocation = location.pathname.toLocaleLowerCase();
  const { dataUser } = useAuth();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="flex items-center justify-between">
        <SidebarGroupLabel className="uppercase">Workspace</SidebarGroupLabel>
        {dataUser?.role === "Leader" && (
          <Link to={"/workspaces/create"}>
            <Plus
              size={16}
              className="text-muted-foreground hover:text-foreground"
            />
          </Link>
        )}
      </div>
      <SidebarMenu className="gap-1">
        {projects.map((item) => (
          <Link to={item.url} key={item.name}>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathLocation.includes(item.url)}
                className="data-[active=true]:bg-blue-600 dark:data-[active=true]:bg-blue-600/20 data-[active=true]:font-medium data-[active=true]:text-white transition-all py-5"
              >
                <div
                  data-active={pathLocation.includes(item.url)}
                  className="dark:text-foreground bg-blue-50 dark:bg-blue-600 border-blue-600 border text-blue-600 px-2 py-[2px] rounded-sm data-[active=true]:border-white data-[active=true]:bg-transparent data-[active=true]:text-white transition-all"
                >
                  {item.name.slice(0, 1).toUpperCase()}
                </div>
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
