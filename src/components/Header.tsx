'use client'
import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

type Props = {
    setSidebarOpen: (isOpen: boolean) => void
};

export default function Header({setSidebarOpen}: Props) {
  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        </div>

        <div className="flex items-center space-x-2">
          <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Custom Range</option>
          </select>
          <Button size="sm">Export Data</Button>
        </div>
      </div>
    </header>
  );
}
