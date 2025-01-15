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

import { usePathname } from "next/navigation";
import Link from "next/link";

import logo from "@/assets/logo.svg";
import { useTranslation } from "react-i18next";

type Props = {
  locale: string;
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & Props) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const data = {
    navMain: [
      {
        title: t("menu_orders_header"),
        items: [
          {
            title: t("menu_orders_subheader"),
            url: "/orders",
            icon: TrendingUp,
          },
        ],
      },
      {
        title: t("menu_users_header"),
        items: [
          {
            title: t("menu_users_subheader"),
            url: "/users",
            icon: Users,
          },
          {
            title: t("menu_roles_subheader"),
            url: "/roles",
            icon: Users,
          },
        ],
      },
    ],
  };
  return (
    <Sidebar {...props} side={props.locale === "ar" ? "right" : "left"}>
      <SidebarHeader className="flex-col h-16 shrink-0 items-center gap-2 px-4">
        <Link href="/">
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
                          <Link href={`${item.url}`}>
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
