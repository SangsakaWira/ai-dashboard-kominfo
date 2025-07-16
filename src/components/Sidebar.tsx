"use client";
import React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Users,
  AlertTriangle,
  Settings,
  HelpCircle,
  Home,
  Map,
  Clock,
  X,
  Table as TableIcon,
  GlassesIcon,
  Video,
  MapIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    sidebarOpen: boolean
    setSidebarOpen: (isOpen: boolean) => void
};

export function Sidebar({sidebarOpen,setSidebarOpen}: Props) {
  const pathname = usePathname()

  const sidebarItems = [
    { id: "overview", label: "Overview", link: "/", icon: Home },
    { id: "cctv", label: "Streams", link: "/streams", icon: Video },
    { id: "locations", label: "Locations", link: "/locations", icon: MapIcon },
    {
      id: "vandalism",
      label: "Crime Detections",
      link: "/crime-detections",
      icon: GlassesIcon,
    },
    {
      id: "occupancy",
      label: "People Analytics",
      link: "/people-analytics",
      icon: Users,
    },
    {
      id: "flood-detection",
      label: "Flood Detection",
      link: "/flood-detection",
      icon: Map,
    },
    { id: "table", label: "Management", link: "/management", icon: TableIcon },
    { id: "historical", label: "Historical", link: "/historical", icon: Clock },
    { id: "alerts", label: "Alerts", link: "/alerts", icon: AlertTriangle },
  ];
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg"></img>
            {/* <BarChart3 className="h-8 w-8 text-primary" /> */}
            {/* <span className="text-xl font-bold">Analytics</span> */}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  href={item.link}
                  key={item.id}
                  className="block"
                >
                  <Button className="w-full justify-start" variant={pathname === item.link ? "default" : "ghost"}>
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-3 h-4 w-4" />
              Help
            </Button>
          </div>
        </ScrollArea>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
