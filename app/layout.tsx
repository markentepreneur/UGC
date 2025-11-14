import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import ClientRootLayout from "./components/ClientRootLayout";

export const metadata: Metadata = {
  title: "UGC Creators School - Школа для создателей контента",
  description: "Школа для создателей контента",
  themeColor: "#ffffff",
  // manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UGC School",
  },
  icons: [
    { rel: "apple-touch-icon", url: "/icon-192.png" },
    { rel: "apple-touch-icon", sizes: "192x192", url: "/icon-192.png" },
    { rel: "apple-touch-icon", sizes: "512x512", url: "/icon-512.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
