"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TrendingUp, Users } from "lucide-react";
import { NavUser } from "./nav-user";
import Image from "next/image";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import logo from "@/assets/logo.svg";

const data = {
  navMain: [
    {
      title: "Order Management",
      items: [
        {
          title: "Orders",
          url: "/orders",
          icon: TrendingUp,
        },
      ],
    },
    {
      title: "User Management",
      items: [
        {
          title: "Users",
          url: "/users",
          icon: Users,
        },
        {
          title: "Roles",
          url: "/roles",
          icon: Users,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { lang } = useParams();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex-col h-16 shrink-0 items-center gap-2 px-4">
        <Link href={`/${lang}/`}>
          <span className="grow inline-block align-middle">
            <Image
              src={logo.src}
              alt="Icon"
              width="200"
              height="200"
              priority={true}
            />
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => {
          return (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel className="text-sm font-bold">
                {item.title}
              </SidebarGroupLabel>
              <SidebarGroupContent className="pl-2">
                <SidebarMenu>
                  {item.items.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={`/${lang}${item.url}`}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
