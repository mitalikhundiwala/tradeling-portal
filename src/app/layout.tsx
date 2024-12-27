import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthWrapper } from "@/modules/common/authorization/AuthWrapper";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, Bounce } from "react-toastify";
import QueryProvider from "@/providers/QueryProvider";

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
        <SessionProvider>
          <AuthWrapper>
            <QueryProvider>{children}</QueryProvider>
          </AuthWrapper>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
