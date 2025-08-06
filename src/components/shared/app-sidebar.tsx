import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Heart,
  LayoutPanelLeft,
  Play,
  Timer,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "../../components/ui/sidebar";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import { useCurrentUser } from "../../store/authStore";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Discover",
      url: "/dashboard/discover",
      icon: LayoutPanelLeft,
      isActive: true,
    },
    {
      title: "Continue",
      url: "/dashboard/continue",
      icon: Play,
      isActive: true,
    },
    {
      title: "Schedule",
      url: "/dashboard/schedule",
      icon: Timer,
      isActive: true,
    },
    {
      title: "Favorites",
      url: "/dashboard/favorites",
      icon: Heart,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useCurrentUser();
  console.log("AppSidebar user: ", user);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-amber-50">
        <TeamSwitcher team={user} />
      </SidebarHeader>
      <SidebarContent className="bg-amber-50">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
