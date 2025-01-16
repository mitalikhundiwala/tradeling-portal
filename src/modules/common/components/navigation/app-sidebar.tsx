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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TrendingUp, Users, ChevronDown } from "lucide-react";
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
        icon: <TrendingUp />,
        items: [
          {
            title: t("menu_orders_subheader"),
            url: "/orders",
          },
        ],
      },
      {
        title: t("menu_users_header"),
        icon: <Users size={24} />,
        items: [
          {
            title: t("menu_users_subheader"),
            url: "/users",
          },
          {
            title: t("menu_roles_subheader"),
            url: "/roles",
          },
        ],
      },
    ],
  };
  return (
    <Sidebar
      {...props}
      side={props.locale === "ar" ? "right" : "left"}
      collapsible="icon"
    >
      <SidebarHeader className="flex-col h-16 shrink-0 items-center  px-4">
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
      <SidebarContent className="mt-10">
        {data.navMain.map((item) => {
          return (
            <Collapsible className="group/collapsible" key={item.title}>
              <SidebarGroup className="p-0">
                <SidebarGroupLabel className="text-sm font-bold">
                  <CollapsibleTrigger className="flex [&[data-state=open]>div>div>svg]:rotate-180 mb-1">
                    <div className="flex w-full ali">
                      <span className="mr-4">{item.icon}</span>
                      <p className="flex items-center">{item.title}</p>
                      <div
                        className="ml-4 flex items-center"
                        // className={cn(
                        //   "whitespace-nowrap",
                        //   isOpen
                        //     ? "translate-x-0 opacity-100"
                        //     : "-translate-x-96 opacity-0"
                        // )}
                      >
                        <ChevronDown
                          size={18}
                          className="transition-transform duration-200"
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <SidebarGroupContent className="pl-2">
                    <SidebarMenu>
                      {item.items.map((item) => {
                        const isActive = pathname === item.url;
                        return (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={isActive}>
                              <Link href={`${item.url}`}>
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
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
