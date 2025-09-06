import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vision AI - Dashboard Palembang",
  description: "A modern full-stack starter template powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={`${inter.className} dark bg-background text-foreground`}>
        <MainLayout>
          {children}
        </MainLayout>
        <TempoInit />
      </body>
    </html>
  );
}
