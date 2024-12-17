import React, { ReactNode } from "react";

export const metadata = {
  title: "My App",
  description: "Custom Root Layout in Next.js with TypeScript",
};

interface RootLayoutProps {
  children: ReactNode; // Ensures children is a valid React node
}

const AuthLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default AuthLayout;
