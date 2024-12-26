import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";
import { projects, navSecondary, navMainByUserType } from "./data/data-sidebar";
import logo from "@/images/logo.png";

const data = { projects, navSecondary };

export function AppSidebar({
  user,
  userType,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { name: string; email: string; avatar: string };
  userType: keyof typeof navMainByUserType;
}) {
  const navMain = navMainByUserType[userType];

  const getUserGreeting = () => {
    if (userType === "user" || userType === "provider") {
      return `Hi, ${user.name.split(' ').slice(-1)}!`;
    } else if (userType === "admin") {
      return "Admin";
    } else {
      return "Welcome to Game Market";
    }
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square items-center justify-center rounded-lg">
                  <img src={logo} alt="Logo" className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-base leading-tight">
                  <span className="truncate font-semibold">Game Market</span>
                  <span className="truncate text-xs">{getUserGreeting()}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} userType={userType} />
      </SidebarFooter>
    </Sidebar>
  );
}