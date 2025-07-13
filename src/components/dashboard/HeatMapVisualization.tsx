"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeatMapVisualizationProps {
  data?: any;
  timeRange?: string;
  onTimeRangeChange?: (range: string) => void;
}

const HeatMapVisualization = ({
  data = generateMockHeatMapData(),
  timeRange = "today",
  onTimeRangeChange = () => {},
}: HeatMapVisualizationProps) => {
  const [selectedView, setSelectedView] = useState("traffic");
  const [selectedZone, setSelectedZone] = useState("all");

  const handleExport = () => {
    // Placeholder for export functionality
    console.log("Exporting heat map data...");
  };

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">
          Heat Map Visualization
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export heat map data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Tabs defaultValue="traffic" onValueChange={setSelectedView}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="traffic">Traffic Density</TabsTrigger>
              <TabsTrigger value="dwell">Dwell Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="entrance">Entrance</SelectItem>
              <SelectItem value="checkout">Checkout Area</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-100 rounded-sm mr-1"></div>
              <span className="text-xs">Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-300 rounded-sm mr-1"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-700 rounded-sm mr-1"></div>
              <span className="text-xs">Very High</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {selectedView === "traffic"
                      ? "Traffic density shows how many people visited each area"
                      : "Dwell time shows how long people stayed in each area"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="relative w-full h-[300px] border rounded-md overflow-hidden">
          {/* Heat map visualization would be rendered here */}
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="grid grid-cols-10 grid-rows-6 gap-1 w-full h-full p-4">
              {renderHeatMapCells(data, selectedView)}
            </div>

            {/* Floor plan overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="border-2 border-gray-400 m-8 h-[calc(100%-4rem)] rounded-md opacity-30"></div>
              <div className="absolute top-8 left-8 w-16 h-8 border-2 border-gray-400 rounded-md opacity-30"></div>
              <div className="absolute bottom-8 right-8 w-32 h-16 border-2 border-gray-400 rounded-md opacity-30"></div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Data shown for {getTimeRangeText(timeRange)} in{" "}
            {selectedZone === "all" ? "all zones" : selectedZone}.
          </p>
          <p className="mt-1">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper functions
function getTimeRangeText(range: string): string {
  switch (range) {
    case "today":
      return "today";
    case "yesterday":
      return "yesterday";
    case "week":
      return "the last 7 days";
    case "month":
      return "the last 30 days";
    default:
      return range;
  }
}

function generateMockHeatMapData() {
  const cells = [];
  for (let i = 0; i < 60; i++) {
    cells.push({
      id: i,
      traffic: Math.floor(Math.random() * 4), // 0-3 for intensity levels
      dwell: Math.floor(Math.random() * 4),
    });
  }
  return cells;
}

function renderHeatMapCells(data: any[], view: string) {
  return data.map((cell) => {
    const intensity = view === "traffic" ? cell.traffic : cell.dwell;
    let bgColor = "bg-blue-100";

    if (intensity === 1) bgColor = "bg-blue-300";
    else if (intensity === 2) bgColor = "bg-blue-500";
    else if (intensity === 3) bgColor = "bg-blue-700";

    return (
      <div
        key={cell.id}
        className={`${bgColor} rounded-sm`}
        style={{ opacity: 0.7 + intensity * 0.1 }}
      />
    );
  });
}

export default HeatMapVisualization;
