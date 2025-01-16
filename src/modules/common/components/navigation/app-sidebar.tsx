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
import classNames from "classnames";

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
        icon: <TrendingUp size={20} />,
        items: [
          {
            title: t("menu_orders_subheader"),
            url: "/orders",
          },
        ],
      },
      {
        title: t("menu_users_header"),
        icon: <Users size={20} />,
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
    <Sidebar {...props} side={props.locale === "ar" ? "right" : "left"}>
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
      <SidebarContent className="mt-10 gap-0">
        {data.navMain.map((item) => {
          const isGroupActive = item.items.some(
            (item) => pathname === item.url,
          );

          return (
            <Collapsible
              className="group/collapsible"
              key={item.title}
              defaultOpen={isGroupActive}
            >
              <SidebarGroup className="p-0 border-b border-b-gray-700 text-md">
                <SidebarGroupLabel
                  className={classNames("text-sm font-bold h-10 pt-0", {
                    "bg-white rounded-none text-black": isGroupActive, // Add active class
                  })}
                >
                  <CollapsibleTrigger className="flex [&[data-state=open]>div>div>svg]:rotate-180 mb-1 w-full">
                    <div className="flex w-full">
                      <span className="mr-4">{item.icon}</span>
                      <p className="flex items-center">{item.title}</p>
                      <div
                        className="ml-4 flex items-center flex-1 justify-end"
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
                  <SidebarGroupContent className="pl-2 py-2">
                    <SidebarMenu className="ml-[09px] border-l border-gray-600 pl-6">
                      {item.items.map((item) => {
                        const isActive = pathname === item.url;
                        return (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              className={classNames({
                                "font-bold underline text-orange-500": isActive,
                              })}
                            >
                              <Link
                                href={`${item.url}`}
                                className="hover:bg-transparent hover:text-orange-500 active:bg-transparent active:text-inherit"
                              >
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
