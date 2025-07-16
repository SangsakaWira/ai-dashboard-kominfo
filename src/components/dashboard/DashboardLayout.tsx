"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Settings, BarChart3, Home } from "lucide-react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps = {}) {
  return (
    <div className="flex flex-col h-full min-h-screen bg-background">
      {/* Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex w-64 flex-col bg-card border-r p-4 space-y-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Bell className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold">Flood Monitor</h2>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-accent text-accent-foreground"
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span>Alerts</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </nav>

          <div className="mt-auto">
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Current Status</h3>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Flood Detection Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor water levels and receive alerts in real-time
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cameras">Cameras</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2">
                  <CardContent className="p-0">
                    <div className="bg-muted h-[400px] flex items-center justify-center">
                      <p className="text-muted-foreground">Live Feed Panel</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-0">
                    <div className="bg-muted h-[400px] flex items-center justify-center">
                      <p className="text-muted-foreground">Alert System</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="bg-muted h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">Map View</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cameras">
              <Card>
                <CardContent>
                  <h2 className="text-xl font-semibold mb-4">
                    Camera Management
                  </h2>
                  <p className="text-muted-foreground">
                    Configure and manage your CCTV cameras here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardContent>
                  <h2 className="text-xl font-semibold mb-4">
                    Analytics Dashboard
                  </h2>
                  <p className="text-muted-foreground">
                    View historical water level data and prediction models.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardContent>
                  <h2 className="text-xl font-semibold mb-4">
                    System Settings
                  </h2>
                  <p className="text-muted-foreground">
                    Configure alert thresholds and notification preferences.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {children}
        </main>
      </div>
    </div>
  );
}
