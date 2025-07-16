"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Maximize2, Minimize2, AlertTriangle } from "lucide-react";

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: "normal" | "warning" | "danger";
  waterLevel: number;
  imageUrl: string;
}

const LiveFeedPanel = ({ feeds = defaultFeeds }: { feeds?: CameraFeed[] }) => {
  const [selectedCamera, setSelectedCamera] = useState<CameraFeed | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleCameraSelect = (camera: CameraFeed) => {
    setSelectedCamera(camera);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card
      className={`bg-card ${isFullScreen ? "fixed inset-0 z-50" : "h-full"}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Live CCTV Feeds</CardTitle>
        <div className="flex items-center gap-2">
          {selectedCamera && (
            <Badge variant="outline" className="flex gap-1 items-center">
              <span
                className={`h-2 w-2 rounded-full ${getStatusColor(selectedCamera.status)}`}
              ></span>
              {selectedCamera.status.toUpperCase()}
            </Badge>
          )}
          <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
            {isFullScreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {selectedCamera ? (
          <div className="space-y-4">
            <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
              <img
                src={selectedCamera.imageUrl}
                alt={selectedCamera.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{selectedCamera.name}</h3>
                  <p className="text-xs opacity-80">
                    {selectedCamera.location}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">Water Level:</span>
                    <span className="font-bold">
                      {selectedCamera.waterLevel}m
                    </span>
                  </div>
                  {selectedCamera.status !== "normal" && (
                    <div className="flex items-center gap-1 text-xs">
                      <AlertTriangle className="h-3 w-3 text-yellow-400" />
                      <span>
                        {selectedCamera.status === "warning"
                          ? "Rising Water Level"
                          : "Flood Risk"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={() => setSelectedCamera(null)}>
              Back to All Cameras
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="grid" className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {feeds.map((camera) => (
                  <div
                    key={camera.id}
                    className="cursor-pointer group relative aspect-video bg-muted rounded-md overflow-hidden"
                    onClick={() => handleCameraSelect(camera)}
                  >
                    <img
                      src={camera.imageUrl}
                      alt={camera.name}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">{camera.name}</h3>
                        <Badge className={getStatusColor(camera.status)}>
                          {camera.waterLevel}m
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="list" className="w-full">
              <div className="space-y-2">
                {feeds.map((camera) => (
                  <div
                    key={camera.id}
                    className="cursor-pointer flex items-center gap-3 p-2 rounded-md hover:bg-muted"
                    onClick={() => handleCameraSelect(camera)}
                  >
                    <div className="relative h-16 w-24 bg-muted rounded overflow-hidden">
                      <img
                        src={camera.imageUrl}
                        alt={camera.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{camera.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {camera.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className={getStatusColor(camera.status)}>
                        {camera.status}
                      </Badge>
                      <span className="text-sm font-medium">
                        {camera.waterLevel}m
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

// Default mock data
const defaultFeeds: CameraFeed[] = [
  {
    id: "cam-001",
    name: "Downtown Bridge",
    location: "Main Street Bridge",
    status: "normal",
    waterLevel: 1.2,
    imageUrl:
      "https://images.unsplash.com/photo-1545641203-7d072a14e3b2?w=800&q=80",
  },
  {
    id: "cam-002",
    name: "Riverside Park",
    location: "East River Park",
    status: "warning",
    waterLevel: 2.8,
    imageUrl:
      "https://images.unsplash.com/photo-1544813545-4827b64fcacb?w=800&q=80",
  },
  {
    id: "cam-003",
    name: "Industrial Zone",
    location: "North Industrial Area",
    status: "danger",
    waterLevel: 3.5,
    imageUrl:
      "https://images.unsplash.com/photo-1621551122354-e96737d64b21?w=800&q=80",
  },
  {
    id: "cam-004",
    name: "City Center",
    location: "Central Plaza",
    status: "normal",
    waterLevel: 0.8,
    imageUrl:
      "https://images.unsplash.com/photo-1506125840744-167167210587?w=800&q=80",
  },
  {
    id: "cam-005",
    name: "Harbor View",
    location: "South Harbor",
    status: "warning",
    waterLevel: 2.3,
    imageUrl:
      "https://images.unsplash.com/photo-1518156677180-95a2893f3fdb?w=800&q=80",
  },
  {
    id: "cam-006",
    name: "Residential Area",
    location: "West Neighborhood",
    status: "normal",
    waterLevel: 1.0,
    imageUrl:
      "https://images.unsplash.com/photo-1625464264698-fafb68a82e88?w=800&q=80",
  },
];

export default LiveFeedPanel;
