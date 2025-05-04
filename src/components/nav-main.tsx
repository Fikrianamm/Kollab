"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();
  const pathLocation = location.pathname.toLocaleLowerCase();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Link to={item.url} key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={pathLocation.includes(item.url)}
                className="data-[active=true]:bg-blue-600 data-[active=true]:font-medium data-[active=true]:text-white transition-all"
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
