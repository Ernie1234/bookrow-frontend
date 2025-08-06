"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../components/ui/sidebar";
import UserAvatar from "./UserAvatar";

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  userImage?: string;
}

export interface ITeam {
  team: IUser | null;
}

export function TeamSwitcher({ team }: ITeam) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-amber-200 hover:bg-amber-100 data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex justify-center items-center rounded-full size-8 aspect-square text-amber-900 text-sidebar-primary-foreground">
                <UserAvatar user={team} />
              </div>
              <div className="flex-1 grid text-sm text-left leading-tight">
                <span className="font-medium truncate">{team?.username}</span>
                <span className="text-xs truncate">{team?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="rounded-lg w-(--radix-dropdown-menu-trigger-width) min-w-56"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Reading Group Members
            </DropdownMenuLabel>
            {/* {teams.map((team) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex justify-center items-center border rounded-full size-6">
                  <team.logo className="size-3.5 shrink-0" />
                </div>
                {team.name}
              </DropdownMenuItem>
            ))} */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex justify-center items-center bg-transparent border rounded-md size-6">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
