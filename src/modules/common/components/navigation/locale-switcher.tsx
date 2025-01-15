"use client";

import { Button } from "@/components/ui/button";
import i18nConfig from "@/i18nConfig";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  locale: string;
};

export default function LocaleSwitcher(props: Props) {
  const router = useRouter();
  const currentPathname = usePathname();
  const { locale: currentLocale } = props;

  const handleClick = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;
    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }
    router.refresh();
  };

  return (
    <div className="flex items-center">
      <Button
        variant="link"
        onClick={() => {
          handleClick(currentLocale === "en" ? "ar" : "en");
        }}
      >
        {currentLocale === "en" ? "العربية" : "English"}
      </Button>
    </div>
  );
}
