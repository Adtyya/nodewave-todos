import NavigationUser from "@/components/ui/dashboard/navigation_user";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationUser />
      {children}
    </>
  );
}
