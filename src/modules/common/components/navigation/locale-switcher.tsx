"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { i18n, Locale } from "i18n.config";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const params = useParams();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center">
          <Globe size="20" />
          <span className="pl-2">
            {params.lang === "en" ? "English" : "Arabic"}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {i18n.locales.map((locale) => {
          return (
            <DropdownMenuItem key={locale}>
              <Link href={redirectedPathname(locale)}>
                {locale === "en" ? "English" : "Arabic"}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
