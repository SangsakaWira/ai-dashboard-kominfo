"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import OccupancyPanel from "@/components/dashboard/OccupancyPanel";
import HeatMapVisualization from "@/components/dashboard/HeatMapVisualization";
import TimeSeriesGraph from "@/components/dashboard/TimeSeriesGraph";
import AlertSystem from "@/components/dashboard/AlertSystem";
import {
  BarChart3,
  Users,
  Activity,
  AlertTriangle,
  Settings,
  HelpCircle,
  Home,
  TrendingUp,
  Map,
  Clock,
  Menu,
  X,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("overview");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "occupancy", label: "Occupancy", icon: Users },
    { id: "heatmap", label: "Heat Map", icon: Map },
    { id: "historical", label: "Historical", icon: Clock },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Analytics</span>
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
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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
              <h1 className="text-2xl font-bold">People Analytics Dashboard</h1>
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

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <ScrollArea className="h-full">
            <div className="p-6">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-card border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Users className="mr-2 h-4 w-4 text-primary" />
                          Current Occupancy
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-foreground">
                          42
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                          +12% from average
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Activity className="mr-2 h-4 w-4 text-primary" />
                          Peak Today
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-foreground">
                          78
                        </div>
                        <p className="text-xs text-muted-foreground">
                          At 12:30 PM
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                          Active Alerts
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-foreground">
                          3
                        </div>
                        <p className="text-xs text-muted-foreground">
                          2 high priority
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <OccupancyPanel />
                      <TimeSeriesGraph />
                    </div>
                    <div className="space-y-6">
                      <AlertSystem />
                      <Card className="bg-card border">
                        <CardHeader>
                          <CardTitle>Zone Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span>Entrance</span>
                              <span className="font-medium">12 people</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Main Hall</span>
                              <span className="font-medium">24 people</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Cafeteria</span>
                              <span className="font-medium">6 people</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Meeting Rooms</span>
                              <span className="font-medium">0 people</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="occupancy">
                  <div className="grid grid-cols-1 gap-6">
                    <OccupancyPanel />
                  </div>
                </TabsContent>

                <TabsContent value="heatmap">
                  <div className="grid grid-cols-1 gap-6">
                    <HeatMapVisualization />
                  </div>
                </TabsContent>

                <TabsContent value="historical">
                  <div className="grid grid-cols-1 gap-6">
                    <TimeSeriesGraph />
                  </div>
                </TabsContent>

                <TabsContent value="alerts">
                  <div className="grid grid-cols-1 gap-6">
                    <AlertSystem />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>

        {/* Footer */}
        <footer className="border-t py-3 bg-card/50">
          <div className="px-6 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2023 People Analytics Dashboard. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
