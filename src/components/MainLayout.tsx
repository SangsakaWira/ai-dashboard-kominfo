"use client";
import React from "react";
import Footer from "./Footer";
import { ScrollArea } from "./ui/scroll-area";
import { Sidebar } from "./Sidebar";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay for mobile */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <ScrollArea className="h-full">
            <div className="p-6">{children}</div>
          </ScrollArea>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
