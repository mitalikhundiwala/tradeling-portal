import React, { ReactNode } from "react";
import { AppSidebar } from "@/modules/common/components/navigation/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import DropdownMenuComponent from "@/modules/common/components/navigation/drop-down-menu";

export const metadata = {
  title: "My App",
  description: "Custom Root Layout in Next.js with TypeScript",
};

interface RootLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <DropdownMenuComponent />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AuthLayout;
