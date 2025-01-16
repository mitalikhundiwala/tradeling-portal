import { NextRequest } from "next/server";

function convertLocale(headerValue: string | null) {
  if (headerValue?.split(",")?.[0]?.includes("ar")) {
    return "ar";
  }
  return "en";
}

const i18nConfig = {
  locales: ["en", "ar"],
  defaultLocale: "en",
  prefixDefault: true,
  getLocale(request: NextRequest) {
    const headerValue = request.headers.get("accept-language");
    return convertLocale(headerValue);
  },
};

export default i18nConfig;
