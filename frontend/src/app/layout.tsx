import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Menon - YouTube to courses",
  description: "Transform any YouTube playlist into structured courses",
  icons: [
    {
      rel: "apple-touch-icon",
      url: `/apple-touch-icon.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: `/favicon-32x32.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: `/favicon-16x16.png`,
    },
    {
      rel: "icon",
      url: `/favicon.ico`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
