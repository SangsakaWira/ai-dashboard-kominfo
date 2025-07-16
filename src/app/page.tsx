"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  GlassWaterIcon,
  Menu,
  X,
  Table as TableIcon,
  CameraIcon,
  VideotapeIcon,
  Video,
  MapIcon,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  TrendingDown,
} from "lucide-react";
import MyMap from "@/components/mapbox/Map";
// import MapboxMap from "@/components/mapbox/Map";
import { LatLngExpression } from "leaflet";
import MapView from "@/components/dashboard/MapView";

import dynamic from 'next/dynamic';
import LiveFeedPanel from "@/components/dashboard/LiveFeedPanel";

const MapWithNoSSR = dynamic(() => import('../components/mapbox/Map'), {
  ssr: false,
});

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [cctvPlaying, setCctvPlaying] = React.useState(true);
  const [cctvMuted, setCctvMuted] = React.useState(false);
  const [selectedCamera, setSelectedCamera] = React.useState("Camera 1");

  const center: LatLngExpression = [-2.9761, 104.7754]; // Koordinat pusat peta
  const zoom = 12;

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "cctv", label: "Streams", icon: Video },
    { id: "table", label: "Management", icon: TableIcon },
    { id: "locations", label: "Locations", icon: MapIcon },
    { id: "occupancy", label: "People Analytics", icon: Users },
    { id: "flood-detection", label: "Flood Detection", icon: Map },
    { id: "historical", label: "Historical", icon: Clock },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
  ];

  // Mock data for the table
  const tableData = [
    {
      id: 1,
      zone: "Kantor Kecamatan Plaju",
      currentOccupancy: 12,
      maxCapacity: 50,
      status: "Normal",
      lastUpdate: "2 min ago",
      peakTime: "12:30 PM",
      peakCount: 45,
    },
    {
      id: 2,
      zone: "Kertapati",
      currentOccupancy: 24,
      maxCapacity: 100,
      status: "Normal",
      lastUpdate: "1 min ago",
      peakTime: "1:15 PM",
      peakCount: 78,
    },
    {
      id: 3,
      zone: "Cafeteria",
      currentOccupancy: 6,
      maxCapacity: 80,
      status: "Low",
      lastUpdate: "3 min ago",
      peakTime: "12:00 PM",
      peakCount: 65,
    },
    {
      id: 4,
      zone: "Meeting Rooms",
      currentOccupancy: 0,
      maxCapacity: 30,
      status: "Empty",
      lastUpdate: "5 min ago",
      peakTime: "10:30 AM",
      peakCount: 28,
    },
    {
      id: 5,
      zone: "Office Area",
      currentOccupancy: 35,
      maxCapacity: 40,
      status: "High",
      lastUpdate: "1 min ago",
      peakTime: "2:00 PM",
      peakCount: 38,
    },
  ];

  const cameras = [
    {
      id: "cam1", name: "Camera 1 - Pintu Gerbang DPRD", status: "online", frame: <iframe
        src="https://cctv.balitower.co.id/Bendungan-Hilir-003-700014_3/embed.html"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen
      />
    },
    {
      id: "cam2", name: "Camera 2 - Jalan Ahmad Yani", status: "online", frame:
        <iframe
          src="https://cctv.balitower.co.id/Jati-Pulo-001-702017_2/embed.html"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
        >
        </iframe>
    },
    {
      id: "cam3", name: "Camera 3 - Kantor Walikota", status: "offline", frame:
        <iframe
          src="https://cctv.balitower.co.id/Senayan-004-705087_3/embed.html"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
        >
        </iframe>
    },
    {
      id: "cam4", name: "Camera 4 - Jalan Merdeka", status: "online", frame:
        <iframe
          src="https://cctv.balitower.co.id/Cengkareng-Barat-013-702131_2/embed.html"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
        >
        </iframe>
    },
    {
      id: "cam5", name: "Camera 5 - Jalan Kecamatan Plaju", status: "online", frame:
        // <iframe width="620" height="350" src="https://www.youtube.com/embed/yBKMI8-08Q4" title="APACE - 22037" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe
          src="https://www.youtube.com/embed/yBKMI8-08Q4?autoplay=1&mute=1"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
        >
        </iframe>
    },
    {
      id: "cam6", name: "Camera 6 - Pintu Gerbang DPRD Belakang", status: "online", frame:
        <iframe
          src="https://cctv.balitower.co.id/Gelora-017-700470_8/embed.html"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
        >
        </iframe>
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return <Badge variant="secondary">Normal</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>;
      case "empty":
        return <Badge variant="outline">Empty</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getCameraStatusBadge = (status: string) => {
    return status === "online" ? (
      <Badge className="bg-green-500">Online</Badge>
    ) : (
      <Badge variant="destructive">Offline</Badge>
    );
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-card border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <CameraIcon className="mr-2 h-4 w-4 text-primary" />
                          Jumlah CCTV
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
                          Jumlah CCTV Offline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-foreground">
                          3
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                          3%
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <GlassWaterIcon className="mr-2 h-4 w-4 text-primary" />
                          Banjir Terdeteksi
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
                    <Card className="bg-card border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                          Peringatan
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
                              <span>Seberang Ulu I</span>
                              <span className="font-medium">12 people</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Seberang Ulu II</span>
                              <span className="font-medium">24 people</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Kertapati</span>
                              <span className="font-medium">6 people</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Jakabaring</span>
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

                <TabsContent value="locations">
                  <div className="justify-between items-start h-[500px]">
                    <h1 className="mb-5 text-3xl font-bold">Lokasi CCTV</h1>
                    <MapWithNoSSR
                      zoom={zoom}
                      position={center}
                      title="Kantor Kami"
                    ></MapWithNoSSR>
                  </div>
                </TabsContent>

                <TabsContent value="heatmap">
                  <div className="grid grid-cols-1 gap-6">
                    <HeatMapVisualization />
                  </div>
                </TabsContent>

                <TabsContent value="flood-detection">
                  <main className="flex-1 overflow-auto p-6">
                    <div className="mb-6">
                      <h1 className="text-2xl font-bold">Flood Detection System</h1>
                      <p className="text-muted-foreground">
                        Monitor water levels and receive alerts in real-time
                      </p>
                    </div>

                    {/* Dashboard Content */}
                    <div className="space-y-6">
                      {/* Top Row - Live Feeds and Alerts */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="col-span-1 md:col-span-2">
                          <CardHeader>
                            <CardTitle>Live CCTV Feeds</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <LiveFeedPanel />
                          </CardContent>
                        </Card>

                        <Card className="col-span-1">
                          <CardContent className="p-0">
                            <AlertSystem />
                          </CardContent>
                        </Card>
                      </div>

                      {/* Middle Row - Map and Analytics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="col-span-1 md:col-span-2">
                          <CardContent className="p-0">
                            <MapView />
                          </CardContent>
                        </Card>

                        <Card className="col-span-1">
                          <CardHeader>
                            <CardTitle>Analytics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="h-[100px] flex items-center justify-center bg-muted rounded-md">
                                <div className="flex flex-col items-center gap-2">
                                  <BarChart3 className="h-6 w-6 text-muted-foreground" />
                                  <p className="text-xs text-muted-foreground">
                                    Water Level Chart
                                  </p>
                                </div>
                              </div>
                              <div className="h-[100px] flex items-center justify-center bg-muted rounded-md">
                                <div className="flex flex-col items-center gap-2">
                                  <BarChart3 className="h-6 w-6 text-muted-foreground" />
                                  <p className="text-xs text-muted-foreground">
                                    Prediction Models
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Bottom Row - Control Panel */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Control Panel</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border rounded-md">
                              <h3 className="font-medium mb-2">Alert Thresholds</h3>
                              <p className="text-sm text-muted-foreground">
                                Configure water level thresholds for alerts
                              </p>
                            </div>
                            <div className="p-4 border rounded-md">
                              <h3 className="font-medium mb-2">Notification Settings</h3>
                              <p className="text-sm text-muted-foreground">
                                Manage notification preferences
                              </p>
                            </div>
                            <div className="p-4 border rounded-md">
                              <h3 className="font-medium mb-2">Camera Settings</h3>
                              <p className="text-sm text-muted-foreground">
                                Configure CCTV camera parameters
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </main>
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

                <TabsContent value="table">
                  <div className="grid grid-cols-1 gap-6">
                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <TableIcon className="mr-2 h-5 w-5" />
                          Zone Data Table
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Zone</TableHead>
                                <TableHead>Current Occupancy</TableHead>
                                <TableHead>Max Capacity</TableHead>
                                <TableHead>Utilization</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Peak Time</TableHead>
                                <TableHead>Peak Count</TableHead>
                                <TableHead>Last Update</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {tableData.map((row) => {
                                const utilization = Math.round(
                                  (row.currentOccupancy / row.maxCapacity) *
                                  100,
                                );
                                return (
                                  <TableRow key={row.id}>
                                    <TableCell className="font-medium">
                                      {row.zone}
                                    </TableCell>
                                    <TableCell>
                                      {row.currentOccupancy}
                                    </TableCell>
                                    <TableCell>{row.maxCapacity}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center space-x-2">
                                        <div className="w-full bg-muted rounded-full h-2">
                                          <div
                                            className={`h-2 rounded-full ${utilization > 80
                                              ? "bg-red-500"
                                              : utilization > 60
                                                ? "bg-orange-500"
                                                : "bg-green-500"
                                              }`}
                                            style={{ width: `${utilization}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-sm font-medium">
                                          {utilization}%
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      {getStatusBadge(row.status)}
                                    </TableCell>
                                    <TableCell>{row.peakTime}</TableCell>
                                    <TableCell>{row.peakCount}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                      {row.lastUpdate}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="cctv">
                  <div className="grid grid-cols-1 gap-6">
                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Video className="mr-2 h-5 w-5" />
                            CCTV Live Streams
                          </div>
                          <div className="flex items-center space-x-2">
                            <select
                              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                              value={selectedCamera}
                              onChange={(e) =>
                                setSelectedCamera(e.target.value)
                              }
                            >
                              {cameras.map((camera) => (
                                <option key={camera.id} value={camera.name}>
                                  {camera.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Main Stream */}
                          <div className="lg:col-span-2">
                            <div className="relative bg-black rounded-lg overflow-hidden">
                              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                {/* <iframe width="620" height="350" src="https://www.youtube.com/embed/3gjO-Ifaig0" title="APACE - 22.033.11K" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                                <iframe
                                  src="https://www.youtube.com/embed/3gjO-Ifaig0?autoplay=1&mute=1"
                                  width="100%"
                                  height="100%"
                                  style={{ border: "none" }}
                                  allowFullScreen
                                />
                              </div>

                              {/* Stream Controls */}
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-white hover:bg-white/20"
                                      onClick={() =>
                                        setCctvPlaying(!cctvPlaying)
                                      }
                                    >
                                      {cctvPlaying ? (
                                        <Pause className="h-4 w-4" />
                                      ) : (
                                        <Play className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-white hover:bg-white/20"
                                      onClick={() => setCctvMuted(!cctvMuted)}
                                    >
                                      {cctvMuted ? (
                                        <VolumeX className="h-4 w-4" />
                                      ) : (
                                        <Volume2 className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-white hover:bg-white/20"
                                    >
                                      <RotateCcw className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-white text-sm">
                                      {new Date().toLocaleTimeString()}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-white hover:bg-white/20"
                                    >
                                      <Maximize className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Camera Grid */}
                          <div className="lg:col-span-2">
                            <h3 className="text-lg font-semibold mb-4">
                              Semua Kamera
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {cameras.map((camera) => (
                                <div
                                  key={camera.id}
                                  className={`relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedCamera === camera.name
                                    ? "ring-2 ring-primary"
                                    : "hover:ring-1 ring-gray-400"
                                    }`}
                                  onClick={() => setSelectedCamera(camera.name)}
                                >
                                  <div className="aspect-video bg-gray-800 flex items-center justify-center">
                                    {/* <div className="text-center text-white">
                                      <Video className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                      <p className="text-xs opacity-75">
                                        {camera.name.split(" - ")[0]}
                                      </p>
                                    </div> */}
                                    {camera.frame}
                                  </div>
                                  <div className="absolute top-2 right-2">
                                    {getCameraStatusBadge(camera.status)}
                                  </div>
                                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                                    <p className="text-white text-xs truncate">
                                      {camera.name.split(" - ")[1]}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
              © 2025 People Analytics Dashboard. KOMDIGI Kominfo Kota Palembang
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
