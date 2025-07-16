"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, MapPin, Info, Eye } from "lucide-react";

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  riskLevel: "low" | "medium" | "high" | "critical";
  cameraId: string;
}

interface MapViewProps {
  locations?: Location[];
  onLocationSelect?: (locationId: string) => void;
  onCameraSelect?: (cameraId: string) => void;
}

const MapView = ({
  locations = [
    {
      id: "loc1",
      name: "Downtown Bridge",
      coordinates: [40.7128, -74.006],
      riskLevel: "high",
      cameraId: "cam1",
    },
    {
      id: "loc2",
      name: "Riverside Park",
      coordinates: [40.7135, -74.0101],
      riskLevel: "medium",
      cameraId: "cam2",
    },
    {
      id: "loc3",
      name: "Harbor District",
      coordinates: [40.7145, -74.0082],
      riskLevel: "low",
      cameraId: "cam3",
    },
    {
      id: "loc4",
      name: "Industrial Zone",
      coordinates: [40.7118, -74.0045],
      riskLevel: "critical",
      cameraId: "cam4",
    },
  ],
  onLocationSelect = () => {},
  onCameraSelect = () => {},
}: MapViewProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("map");

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    onLocationSelect(location.id);
  };

  const handleViewCamera = (cameraId: string) => {
    onCameraSelect(cameraId);
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-500 hover:bg-green-600";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "high":
        return "bg-orange-500 hover:bg-orange-600";
      case "critical":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Map View</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-0">
            <div className="relative w-full h-[350px] bg-muted rounded-md overflow-hidden">
              {/* Map placeholder - in a real implementation, this would be replaced with a mapping library like Leaflet or Google Maps */}
              <div className="absolute inset-0 bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt="Map background"
                  className="w-full h-full object-cover opacity-50"
                />

                {/* Location markers */}
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className={`absolute w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getRiskBadgeColor(location.riskLevel)}`}
                    style={{
                      // This is just for demonstration - in a real app, you'd use proper map coordinates
                      left: `${(location.coordinates[1] + 74.01) * 5000}%`,
                      top: `${(40.72 - location.coordinates[0]) * 5000}%`,
                    }}
                    onClick={() => handleLocationClick(location)}
                  >
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>

              {/* Location details panel */}
              {selectedLocation && (
                <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm p-4 border-t">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {selectedLocation.name}
                        <Badge
                          className={getRiskBadgeColor(
                            selectedLocation.riskLevel,
                          )}
                        >
                          {selectedLocation.riskLevel.toUpperCase()}
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Coordinates:{" "}
                        {selectedLocation.coordinates[0].toFixed(4)},{" "}
                        {selectedLocation.coordinates[1].toFixed(4)}
                      </p>
                    </div>
                    <button
                      className="flex items-center gap-1 text-sm bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-primary/90"
                      onClick={() =>
                        handleViewCamera(selectedLocation.cameraId)
                      }
                    >
                      <Eye className="w-4 h-4" /> View Camera
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2 justify-end">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Low Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Medium Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs">High Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">Critical Risk</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="border rounded-md divide-y max-h-[350px] overflow-y-auto">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="p-3 hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{location.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Coordinates: {location.coordinates[0].toFixed(4)},{" "}
                        {location.coordinates[1].toFixed(4)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRiskBadgeColor(location.riskLevel)}>
                        {location.riskLevel.toUpperCase()}
                      </Badge>
                      <button
                        className="p-1 rounded-md hover:bg-muted"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewCamera(location.cameraId);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MapView;
