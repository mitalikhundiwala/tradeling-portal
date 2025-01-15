import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthWrapper } from "@/modules/common/authorization/AuthWrapper";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tradeling Portal",
  description:
    "Tradeling, the largest B2B digital marketplace in the MENA region",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <AuthWrapper>
          <QueryProvider>{children}</QueryProvider>
        </AuthWrapper>
        <Toaster />
      </body>
    </html>
  );
}
