import React, { ReactNode, use } from "react";
import { AppSidebar } from "@/modules/common/components/navigation/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import DropdownMenuComponent from "@/modules/common/components/navigation/drop-down-menu";
import LocaleSwitcher from "@/modules/common/components/navigation/locale-switcher";
import TranslationsProvider from "@/providers/TranslationsProvider";
import initTranslations from "@/app/i18n";

export const metadata = {
  title: "My App",
  description: "Custom Root Layout in Next.js with TypeScript",
};

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

const i18nNamespaces = ["sidebar"];

const AuthLayout: React.FC<RootLayoutProps> = async ({
  children,
  params: { locale },
}) => {
  const { t, resources } = await initTranslations(locale, ["sidebar"]);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <SidebarProvider>
        <AppSidebar locale={locale} />
        <SidebarInset>
          <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex">
              <div className="flex ltr:mr-2">
                <LocaleSwitcher locale={locale} />
              </div>
              <div className="rtl:mr-2">
                <DropdownMenuComponent />
              </div>
            </div>
          </header>
          <main className="flex-1 px-6 bg-gray-100">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TranslationsProvider>
  );
};

export default AuthLayout;
