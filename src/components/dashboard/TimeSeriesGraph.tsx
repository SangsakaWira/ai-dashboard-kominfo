"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

interface TimeSeriesGraphProps {
  title?: string;
  description?: string;
  data?: TimeSeriesData[];
  timeRanges?: string[];
  onExport?: () => void;
  onRefresh?: () => void;
  onCompare?: (period1: string, period2: string) => void;
}

interface TimeSeriesData {
  timestamp: string;
  value: number;
  zone?: string;
}

const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({
  title = "Historical Occupancy",
  description = "Analyze occupancy patterns over time",
  data = [
    { timestamp: "2023-05-01 08:00", value: 12, zone: "Entrance" },
    { timestamp: "2023-05-01 09:00", value: 25, zone: "Entrance" },
    { timestamp: "2023-05-01 10:00", value: 38, zone: "Entrance" },
    { timestamp: "2023-05-01 11:00", value: 42, zone: "Entrance" },
    { timestamp: "2023-05-01 12:00", value: 35, zone: "Entrance" },
    { timestamp: "2023-05-01 13:00", value: 28, zone: "Entrance" },
    { timestamp: "2023-05-01 14:00", value: 32, zone: "Entrance" },
    { timestamp: "2023-05-01 15:00", value: 45, zone: "Entrance" },
    { timestamp: "2023-05-01 16:00", value: 50, zone: "Entrance" },
    { timestamp: "2023-05-01 17:00", value: 48, zone: "Entrance" },
    { timestamp: "2023-05-01 18:00", value: 30, zone: "Entrance" },
  ],
  timeRanges = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "Custom"],
  onExport = () => console.log("Exporting data..."),
  onRefresh = () => console.log("Refreshing data..."),
  onCompare = (period1, period2) =>
    console.log(`Comparing ${period1} with ${period2}`),
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Today");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState("Yesterday");
  const [zoomLevel, setZoomLevel] = useState(1);

  const zones = [
    "All Zones",
    "Entrance",
    "Lobby",
    "Cafeteria",
    "Meeting Rooms",
    "Offices",
  ];

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.2, 0.5));
  };

  // Calculate the max value for the graph to set the height
  const maxValue = Math.max(...data.map((item) => item.value)) * 1.2;

  return (
    <Card className="w-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4 mr-1" />
            Zoom In
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4 mr-1" />
            Zoom Out
          </Button>
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between">
            <div className="flex space-x-2 items-center">
              <Select
                value={selectedTimeRange}
                onValueChange={setSelectedTimeRange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={compareMode ? "default" : "outline"}
                size="sm"
                onClick={() => setCompareMode(!compareMode)}
              >
                Compare
              </Button>

              {compareMode && (
                <Select
                  value={comparisonPeriod}
                  onValueChange={setComparisonPeriod}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select comparison period" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges
                      .filter((range) => range !== selectedTimeRange)
                      .map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <Tabs defaultValue="line" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="area">Area Chart</TabsTrigger>
            </TabsList>

            <TabsContent value="line" className="w-full">
              <div className="relative h-[300px] w-full border rounded-md p-4">
                {/* Line Chart Visualization */}
                <div className="absolute inset-0 p-4">
                  <div className="flex h-full">
                    {/* Y-axis labels */}
                    <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2">
                      <span>{maxValue}</span>
                      <span>{Math.round(maxValue * 0.75)}</span>
                      <span>{Math.round(maxValue * 0.5)}</span>
                      <span>{Math.round(maxValue * 0.25)}</span>
                      <span>0</span>
                    </div>

                    {/* Chart area */}
                    <div className="flex-1 relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0 grid grid-cols-1 grid-rows-4 h-full w-full">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="border-t border-muted h-full"
                          ></div>
                        ))}
                      </div>

                      {/* Line chart */}
                      <svg
                        className="absolute inset-0 h-full w-full"
                        style={{
                          transform: `scale(1, ${zoomLevel})`,
                          transformOrigin: "bottom",
                        }}
                      >
                        <polyline
                          points={data
                            .map(
                              (point, i) =>
                                `${(i / (data.length - 1)) * 100}%,${100 - (point.value / maxValue) * 100}%`,
                            )
                            .join(" ")}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />

                        {/* Data points */}
                        {data.map((point, i) => (
                          <circle
                            key={i}
                            cx={`${(i / (data.length - 1)) * 100}%`}
                            cy={`${100 - (point.value / maxValue) * 100}%`}
                            r="3"
                            fill="hsl(var(--primary))"
                          />
                        ))}

                        {/* Comparison line (if enabled) */}
                        {compareMode && (
                          <polyline
                            points={data
                              .map(
                                (point, i) =>
                                  `${(i / (data.length - 1)) * 100}%,${100 - ((point.value * 0.8) / maxValue) * 100}%`,
                              )
                              .join(" ")}
                            fill="none"
                            stroke="hsl(var(--secondary))"
                            strokeWidth="2"
                            strokeDasharray="4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                        )}
                      </svg>

                      {/* X-axis labels */}
                      <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-xs text-muted-foreground">
                        {data
                          .filter(
                            (_, i) =>
                              i % Math.ceil(data.length / 6) === 0 ||
                              i === data.length - 1,
                          )
                          .map((point, i) => (
                            <span key={i}>{point.timestamp.split(" ")[1]}</span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              {compareMode && (
                <div className="flex items-center justify-center mt-8 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">{selectedTimeRange}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                    <span className="text-sm">{comparisonPeriod}</span>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="bar" className="w-full">
              <div className="relative h-[300px] w-full border rounded-md p-4">
                <div className="absolute inset-0 p-4">
                  <div className="flex h-full">
                    {/* Y-axis labels */}
                    <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2">
                      <span>{maxValue}</span>
                      <span>{Math.round(maxValue * 0.75)}</span>
                      <span>{Math.round(maxValue * 0.5)}</span>
                      <span>{Math.round(maxValue * 0.25)}</span>
                      <span>0</span>
                    </div>

                    {/* Chart area */}
                    <div className="flex-1 relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0 grid grid-cols-1 grid-rows-4 h-full w-full">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="border-t border-muted h-full"
                          ></div>
                        ))}
                      </div>

                      {/* Bar chart */}
                      <div
                        className="absolute inset-0 flex items-end justify-between"
                        style={{
                          transform: `scaleY(${zoomLevel})`,
                          transformOrigin: "bottom",
                        }}
                      >
                        {data.map((point, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center"
                            style={{ width: `${100 / data.length}%` }}
                          >
                            <div
                              className="w-[60%] bg-primary rounded-t"
                              style={{
                                height: `${(point.value / maxValue) * 100}%`,
                              }}
                            ></div>
                            {compareMode && (
                              <div
                                className="w-[60%] bg-secondary rounded-t absolute bottom-0 left-[20%]"
                                style={{
                                  height: `${((point.value * 0.8) / maxValue) * 100}%`,
                                  transform: `translateX(${i * (100 / data.length)}%)`,
                                }}
                              ></div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* X-axis labels */}
                      <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-xs text-muted-foreground">
                        {data
                          .filter(
                            (_, i) =>
                              i % Math.ceil(data.length / 6) === 0 ||
                              i === data.length - 1,
                          )
                          .map((point, i) => (
                            <span key={i}>{point.timestamp.split(" ")[1]}</span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              {compareMode && (
                <div className="flex items-center justify-center mt-8 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">{selectedTimeRange}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                    <span className="text-sm">{comparisonPeriod}</span>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="area" className="w-full">
              <div className="relative h-[300px] w-full border rounded-md p-4">
                <div className="absolute inset-0 p-4">
                  <div className="flex h-full">
                    {/* Y-axis labels */}
                    <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2">
                      <span>{maxValue}</span>
                      <span>{Math.round(maxValue * 0.75)}</span>
                      <span>{Math.round(maxValue * 0.5)}</span>
                      <span>{Math.round(maxValue * 0.25)}</span>
                      <span>0</span>
                    </div>

                    {/* Chart area */}
                    <div className="flex-1 relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0 grid grid-cols-1 grid-rows-4 h-full w-full">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="border-t border-muted h-full"
                          ></div>
                        ))}
                      </div>

                      {/* Area chart */}
                      <svg
                        className="absolute inset-0 h-full w-full"
                        style={{
                          transform: `scale(1, ${zoomLevel})`,
                          transformOrigin: "bottom",
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="areaGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity="0.5"
                            />
                            <stop
                              offset="100%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity="0.1"
                            />
                          </linearGradient>
                          {compareMode && (
                            <linearGradient
                              id="comparisonGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="hsl(var(--secondary))"
                                stopOpacity="0.5"
                              />
                              <stop
                                offset="100%"
                                stopColor="hsl(var(--secondary))"
                                stopOpacity="0.1"
                              />
                            </linearGradient>
                          )}
                        </defs>

                        {/* Area fill */}
                        <path
                          d={`M0,100% ${data
                            .map(
                              (point, i) =>
                                `L${(i / (data.length - 1)) * 100}%,${100 - (point.value / maxValue) * 100}%`,
                            )
                            .join(" ")} L100%,100% Z`}
                          fill="url(#areaGradient)"
                        />

                        {/* Line */}
                        <polyline
                          points={data
                            .map(
                              (point, i) =>
                                `${(i / (data.length - 1)) * 100}%,${100 - (point.value / maxValue) * 100}%`,
                            )
                            .join(" ")}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />

                        {/* Data points */}
                        {data.map((point, i) => (
                          <circle
                            key={i}
                            cx={`${(i / (data.length - 1)) * 100}%`}
                            cy={`${100 - (point.value / maxValue) * 100}%`}
                            r="3"
                            fill="hsl(var(--primary))"
                          />
                        ))}

                        {/* Comparison area (if enabled) */}
                        {compareMode && (
                          <>
                            <path
                              d={`M0,100% ${data
                                .map(
                                  (point, i) =>
                                    `L${(i / (data.length - 1)) * 100}%,${100 - ((point.value * 0.8) / maxValue) * 100}%`,
                                )
                                .join(" ")} L100%,100% Z`}
                              fill="url(#comparisonGradient)"
                            />

                            <polyline
                              points={data
                                .map(
                                  (point, i) =>
                                    `${(i / (data.length - 1)) * 100}%,${100 - ((point.value * 0.8) / maxValue) * 100}%`,
                                )
                                .join(" ")}
                              fill="none"
                              stroke="hsl(var(--secondary))"
                              strokeWidth="2"
                              strokeDasharray="4"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                            />
                          </>
                        )}
                      </svg>

                      {/* X-axis labels */}
                      <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-xs text-muted-foreground">
                        {data
                          .filter(
                            (_, i) =>
                              i % Math.ceil(data.length / 6) === 0 ||
                              i === data.length - 1,
                          )
                          .map((point, i) => (
                            <span key={i}>{point.timestamp.split(" ")[1]}</span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              {compareMode && (
                <div className="flex items-center justify-center mt-8 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">{selectedTimeRange}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                    <span className="text-sm">{comparisonPeriod}</span>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesGraph;
