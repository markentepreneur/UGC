"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface ClientRootLayoutProps {
  children: React.ReactNode;
}

const ClientRootLayout: React.FC<ClientRootLayoutProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientRootLayout;
