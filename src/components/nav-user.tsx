"use client";

import { ChevronsUpDown, LogOut, Settings2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import useAuth from "@/stores/useAuth";
import { useEffect } from "react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { isAuthenticated, getUser, dataUser, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth/login", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { success } = await logout();
    if (success) {
      navigate("/auth/login", { replace: true });
    }
  };

  return (
    <Dialog>
      {/* Confirmation Logout */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmation logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out of your account? Your session will
            expire.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={loading}>
              Back
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleLogout}
            disabled={loading}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={dataUser?.avatar} alt={dataUser?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{dataUser?.name}</span>
                  <span className="truncate text-xs">{dataUser?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={dataUser?.avatar} alt={dataUser?.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {dataUser?.name}
                    </span>
                    <span className="truncate text-xs">{dataUser?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <Link to={"/settings"}>
                  <DropdownMenuItem>
                    <Settings2 />
                    Settings
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </Dialog>
  );
}
