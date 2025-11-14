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
import { OccupancyChart } from "@/types";
import { useOccupancyChart } from "@/services/occupancy.service";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Legend } from "recharts";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface TimeSeriesGraphProps {
  title?: string;
  description?: string;
  // data: OccupancyChart[];
  timeRanges?: {
    name: string
    value: string
  }[]
  onExport?: () => void;
  onRefresh?: () => void;
  onCompare?: (period1: string, period2: string) => void;
}

interface TimeSeriesData {
  timestamp: string;
  value: number;
  zone?: string;
}

type TimeRange = "hourly" | "daily" | "weekly"

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-md border bg-popover px-3 py-2 shadow-lg",
        "min-w-[180px] animate-in fade-in"
      )}
    >
      {/* HEADER */}
      <div className="mb-2">
        <p className="text-xs font-medium text-foreground/80">{label}</p>
      </div>

      {/* BODY: list of values */}
      <div className="space-y-1.5">
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              {/* Series Color Badge */}
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ background: item.color }}
              ></span>

              <span className="text-foreground/70">{item.name}</span>
            </div>

            {/* Value */}
            <span className="font-medium text-foreground">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({
  title = "Historical Occupancy",
  description = "Analyze occupancy patterns over time",
  // data,
  timeRanges = [
    {
      name: "Today",
      value: "hourly"
    },
    {
      name: "Yesterday",
      value: "daily"
    },
    {
      name: "Last 7 days",
      value: "weekly"
    },
  ],
  onExport = () => console.log("Exporting data..."),
  onRefresh = () => console.log("Refreshing data..."),
  onCompare = (period1, period2) =>
    console.log(`Comparing ${period1} with ${period2}`),
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<"hourly" | "daily" | "weekly">("hourly");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<"hourly" | "daily" | "weekly">("hourly");
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleTimeRangeChange = (value: string) => {
    setSelectedTimeRange(value as TimeRange);
  };

  const handleComparisonPeriodChange = (value: string) => {
    setComparisonPeriod(value as TimeRange);
  };

  const { data = [], isLoading } = useOccupancyChart({ view: selectedTimeRange })

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
  const maxValue = data && data.length > 0
    ? Math.max(...data.map((item) => item.count_in)) * 1.2
    : 100;

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
                onValueChange={handleTimeRangeChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.name}
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
                  onValueChange={handleComparisonPeriodChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select comparison period" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges
                      .filter((range) => range.value !== selectedTimeRange)
                      .map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="w-full">
              <Skeleton className="w-[250px] h-6 mb-4" />
              <div className="relative h-[300px] w-full border rounded-md p-4">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
          ) : (
            <Tabs defaultValue="line" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="line">Line Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                <TabsTrigger value="area">Area Chart</TabsTrigger>
              </TabsList>

              <TabsContent value="line" className="w-full">
                <div className="relative h-[300px] w-full border rounded-md p-4">
                  {/* Line Chart Visualization */}
                  {/* <div className="absolute inset-0 p-4">
                    <div className="flex h-full">
                      <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2">
                        <span>{maxValue}</span>
                        <span>{Math.round(maxValue * 0.75)}</span>
                        <span>{Math.round(maxValue * 0.5)}</span>
                        <span>{Math.round(maxValue * 0.25)}</span>
                        <span>0</span>
                      </div>

                      <div className="flex-1 relative">
                        <div className="absolute inset-0 grid grid-cols-1 grid-rows-4 h-full w-full">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="border-t border-muted h-full"
                            ></div>
                          ))}
                        </div>

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
                                  `${(i / (data.length - 1)) * 100}%,${100 - (point.count_in / maxValue) * 100}%`,
                              )
                              .join(" ")}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />

                          {data.map((point, i) => (
                            <circle
                              key={i}
                              cx={`${(i / (data.length - 1)) * 100}%`}
                              cy={`${100 - (point.count_in / maxValue) * 100}%`}
                              r="3"
                              fill="hsl(var(--primary))"
                            />
                          ))}

                          {compareMode && (
                            <polyline
                              points={data
                                .map(
                                  (point, i) =>
                                    `${(i / (data.length - 1)) * 100}%,${100 - ((point.count_in * 0.8) / maxValue) * 100}%`,
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

                        <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-xs text-muted-foreground">
                          {data
                            .filter(
                              (_, i) =>
                                i % Math.ceil(data.length / 6) === 0 ||
                                i === data.length - 1,
                            )
                            .map((point, i) => (
                              <span key={i}>{point.label}</span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 12 }}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis
                        domain={[0, maxValue]}
                        tick={{ fontSize: 12 }}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                      />
                      <Line
                        type="monotone"
                        dataKey="count_in"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="count_out"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
                  {/* <div className="absolute inset-0 p-4">
                    <div className="flex h-full">
                      <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2">
                        <span>{maxValue}</span>
                        <span>{Math.round(maxValue * 0.75)}</span>
                        <span>{Math.round(maxValue * 0.5)}</span>
                        <span>{Math.round(maxValue * 0.25)}</span>
                        <span>0</span>
                      </div>

                      <div className="flex-1 relative">
                        <div className="absolute inset-0 grid grid-cols-1 grid-rows-4 h-full w-full">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="border-t border-muted h-full"
                            ></div>
                          ))}
                        </div>

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
                                  height: `${(point.count_in / maxValue) * 100}%`,
                                }}
                              ></div>
                              {compareMode && (
                                <div
                                  className="w-[60%] bg-secondary rounded-t absolute bottom-0 left-[20%]"
                                  style={{
                                    height: `${((point.count_in * 0.8) / maxValue) * 100}%`,
                                    transform: `translateX(${i * (100 / data.length)}%)`,
                                  }}
                                ></div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-xs text-muted-foreground">
                          {data
                            .filter(
                              (_, i) =>
                                i % Math.ceil(data.length / 6) === 0 ||
                                i === data.length - 1,
                            )
                            .map((point, i) => (
                              <span key={i}>{point.label}</span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 12 }}
                        tickMargin={10}
                      />
                      <YAxis domain={[0, maxValue]} tick={{ fontSize: 12 }} />
                      <Tooltip
                        content={<CustomTooltip />}
                      />

                      <Bar
                        dataKey="count_in"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="count_out"
                        fill="hsl(var(--secondary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
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
                  {/* <div className="absolute inset-0 p-4">
                    <div className="flex h-full">
                      <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2">
                        <span>{maxValue}</span>
                        <span>{Math.round(maxValue * 0.75)}</span>
                        <span>{Math.round(maxValue * 0.5)}</span>
                        <span>{Math.round(maxValue * 0.25)}</span>
                        <span>0</span>
                      </div>

                      <div className="flex-1 relative">
                        <div className="absolute inset-0 grid grid-cols-1 grid-rows-4 h-full w-full">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="border-t border-muted h-full"
                            ></div>
                          ))}
                        </div>

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

                          <path
                            d={`M0,100% ${data
                              .map(
                                (point, i) =>
                                  `L${(i / (data.length - 1)) * 100}%,${100 - (point.count_in / maxValue) * 100}%`,
                              )
                              .join(" ")} L100%,100% Z`}
                            fill="url(#areaGradient)"
                          />

                          <polyline
                            points={data
                              .map(
                                (point, i) =>
                                  `${(i / (data.length - 1)) * 100}%,${100 - (point.count_in / maxValue) * 100}%`,
                              )
                              .join(" ")}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />

                          {data.map((point, i) => (
                            <circle
                              key={i}
                              cx={`${(i / (data.length - 1)) * 100}%`}
                              cy={`${100 - (point.count_in / maxValue) * 100}%`}
                              r="3"
                              fill="hsl(var(--primary))"
                            />
                          ))}

                          {compareMode && (
                            <>
                              <path
                                d={`M0,100% ${data
                                  .map(
                                    (point, i) =>
                                      `L${(i / (data.length - 1)) * 100}%,${100 - ((point.count_in * 0.8) / maxValue) * 100}%`,
                                  )
                                  .join(" ")} L100%,100% Z`}
                                fill="url(#comparisonGradient)"
                              />

                              <polyline
                                points={data
                                  .map(
                                    (point, i) =>
                                      `${(i / (data.length - 1)) * 100}%,${100 - ((point.count_in * 0.8) / maxValue) * 100}%`,
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

                        <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-xs text-muted-foreground">
                          {data
                            .filter(
                              (_, i) =>
                                i % Math.ceil(data.length / 6) === 0 ||
                                i === data.length - 1,
                            )
                            .map((point, i) => (
                              <span key={i}>{point.label}</span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 12 }}
                        tickMargin={10}
                      />

                      <YAxis domain={[0, maxValue]} tick={{ fontSize: 12 }} />

                      <Tooltip
                        content={<CustomTooltip />}
                      />

                      <Area
                        type="monotone"
                        dataKey="count_in"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#colorPrimary)"
                      />
                      <Area
                        type="monotone"
                        dataKey="count_out"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={2}
                        fill="url(#colorPrimary)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesGraph;
