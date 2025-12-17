"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Users,
  TrendingUp,
  TrendingDown,
  Settings,
  WavesIcon,
} from "lucide-react";
import { Location, WaterLevel } from "@/types";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Skeleton } from "../ui/skeleton";

interface OccupancyPanelProps {
  zones?: Location[];
  currentOccupancy?: number;
  maxCapacity?: number;
  trend?: "up" | "down" | "stable";
  alertThreshold?: number;
  hourly?: WaterLevel;
  hourlyLoading?: boolean;
  daily?: WaterLevel;
  dailyLoading?: boolean;
  weekly?: WaterLevel;
  weeklyLoading?: boolean;
  selectedZone: string
  setSelectedZone: (value: string) => void
}

function formatChartData(source?: WaterLevel) {
  const { labels = [], values = [] } = source || {};
  return labels.map((label, i) => ({
    name: label,
    value: values[i] ?? 0,
  }));
}

export function OccupancyPanel({
  zones = [],
  currentOccupancy = 42,
  maxCapacity = 100,
  trend = "up",
  alertThreshold = 80,
  daily,
  hourly,
  weekly,
  hourlyLoading,
  weeklyLoading,
  dailyLoading,
  selectedZone,
  setSelectedZone
}: OccupancyPanelProps) {
  // const [selectedZone, setSelectedZone] = useState(zones?.[0]?.name);
  const [threshold, setThreshold] = useState(alertThreshold);

  const occupancyPercentage = (currentOccupancy / maxCapacity) * 100;
  const isNearCapacity = occupancyPercentage >= threshold;

  return (
    <Card className="w-full bg-background shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
          Availibility Sensor AWLR
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              {zones.map((zone) => (
                <SelectItem key={zone.id} value={zone.name}>
                  {zone.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Current Water Level
                </h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{currentOccupancy}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    / {maxCapacity}
                  </span>
                </div>
              </div>
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <WavesIcon className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {trend === "up" && (
                <Badge
                  variant="outline"
                  className="flex items-center space-x-1 bg-orange-100 text-orange-800 border-orange-200"
                >
                  <TrendingUp className="h-3 w-3" />
                  <span>Increasing</span>
                </Badge>
              )}
              {trend === "down" && (
                <Badge
                  variant="outline"
                  className="flex items-center space-x-1 bg-green-100 text-green-800 border-green-200"
                >
                  <TrendingDown className="h-3 w-3" />
                  <span>Decreasing</span>
                </Badge>
              )}
              {trend === "stable" && (
                <Badge
                  variant="outline"
                  className="flex items-center space-x-1 bg-blue-100 text-blue-800 border-blue-200"
                >
                  <span>Stable</span>
                </Badge>
              )}

              {isNearCapacity && (
                <Badge
                  variant="outline"
                  className="flex items-center space-x-1 bg-red-100 text-red-800 border-red-200"
                >
                  <AlertCircle className="h-3 w-3" />
                  <span>Near Capacity</span>
                </Badge>
              )}
            </div>

            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${isNearCapacity ? "bg-red-500" : "bg-primary"}`}
                style={{ width: `${occupancyPercentage}%` }}
              ></div>
            </div>

            <div className="text-xs text-muted-foreground">
              {occupancyPercentage.toFixed(0)}% of maximum capacity
            </div>
          </div>

          <div>
            <Tabs defaultValue="hourly" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
              </TabsList>
              <TabsContent value="hourly" className="pt-4">
                {hourlyLoading ? (
                  <ChartSkeleton />
                ) : !hourly || !hourly.values || hourly.values.length === 0 ? (
                  <ChartEmptyState label="Tidak ada data" />
                ) : (
                  <WaterLevelBarChart
                    data={formatChartData(hourly)}
                    threshold={threshold}
                  />
                )}
              </TabsContent>
              <TabsContent value="daily" className="pt-4">
                {/* {!daily ? (
                  <div className="h-[180px] flex items-end justify-between space-x-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day, i) => {
                        const height = Math.floor(Math.random() * 100);
                        return (
                          <div key={i} className="flex flex-col items-center">
                            <div
                              className={`w-8 ${height > threshold ? "bg-red-500" : "bg-primary"} rounded-t`}
                              style={{ height: `${height}px` }}
                            ></div>
                            <span className="text-xs mt-1">{day}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <WaterLevelBarChart
                    data={formatChartData(daily)}
                    threshold={threshold}
                  />
                )} */}
                {dailyLoading ? (
                  <ChartSkeleton />
                ) : !daily || !daily.values || daily.values.length === 0 ? (
                  <ChartEmptyState label="Tidak ada data" />
                ) : (
                  <WaterLevelBarChart
                    data={formatChartData(daily)}
                    threshold={threshold}
                  />
                )}
              </TabsContent>
              <TabsContent value="weekly" className="pt-4">
                {/* {!weekly ? (
                  <div className="h-[180px] flex items-end justify-between space-x-4">
                    {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => {
                      const height = Math.floor(Math.random() * 100);
                      return (
                        <div key={i} className="flex flex-col items-center">
                          <div
                            className={`w-12 ${height > threshold ? "bg-red-500" : "bg-primary"} rounded-t`}
                            style={{ height: `${height}px` }}
                          ></div>
                          <span className="text-xs mt-1">{week}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <WaterLevelBarChart
                    data={formatChartData(weekly)}
                    threshold={threshold}
                  />
                )} */}
                {weeklyLoading ? (
                  <ChartSkeleton />
                ) : !weekly || !weekly.values || weekly.values.length === 0 ? (
                  <ChartEmptyState label="Tidak ada data" />
                ) : (
                  <WaterLevelBarChart
                    data={formatChartData(weekly)}
                    threshold={threshold}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Alert Threshold</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{threshold}%</span>
              <input
                type="range"
                min="10"
                max="100"
                value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                className="w-32"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WaterLevelBarChart({
  data,
  threshold,
}: {
  data: { name: string; value: number }[];
  threshold: number;
}) {
  return (
    <div className="h-[180px] flex items-end justify-between space-x-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval={Math.max(0, Math.floor(data.length / 8))}
          />

          <YAxis
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            width={40}
          />

          <Tooltip
            formatter={(value: any) => `${value} cm`}
            labelFormatter={(label: any) => `Waktu: ${label}`}
          />

          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.value > threshold ? "#ef4444" : "#fafafa"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartEmptyState({ label }: { label: string }) {
  return (
    <div className="h-[180px] flex flex-col items-center justify-center text-muted-foreground">
      <div className="flex items-end gap-2 mb-2 opacity-40">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-10 bg-muted rounded-t"
            style={{ height: `${20 + i * 15}px` }}
          />
        ))}
      </div>
      <p className="text-sm">{label}</p>
    </div>
  );
}

function ChartSkeleton() {
  return (
      <Skeleton className="w-full h-[150px]" />
    // <div className="h-[180px]">
    //   {Array.from({ length: 5 }).map((_, i) => (
    //     <div key={i} className="flex flex-col items-center gap-2">
    //       <Skeleton
    //         className="w-6 rounded-t"
    //         style={{
    //           height: `${40 + (i % 5) * 20}px`,
    //         }}
    //       />
    //       <Skeleton className="h-3 w-5" />
    //     </div>
    //   ))}
    // </div>
  );
}