import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthWrapper } from "@/modules/common/authorization/AuthWrapper";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

import "../globals.css";
import DirectionProvider from "@/providers/DirectionProvider";

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Tradeling Portal",
  description:
    "Tradeling, the largest B2B digital marketplace in the MENA region",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const urlParams = await params;
  const lang = urlParams.lang;
  const direction = lang === "ar" ? "rtl" : "ltr";
  console.log("lang::", lang);
  return (
    <html lang={lang} dir={direction}>
      <body className={` antialiased bg-gray-100`}>
        <SessionProvider>
          <AuthWrapper>
            <QueryProvider>
              <DirectionProvider dir={direction}>{children}</DirectionProvider>
            </QueryProvider>
          </AuthWrapper>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
