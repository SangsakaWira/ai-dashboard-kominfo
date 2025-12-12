"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimeSeriesGraph from "@/components/dashboard/TimeSeriesGraph";
import AlertSystem from "@/components/dashboard/AlertSystem";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  GlassWaterIcon,
  CameraIcon,
  TrendingDown,
} from "lucide-react";
import { OccupancyPanel } from "@/components/dashboard/OccupancyPanel";
// import { authService } from "@/services/auth.service";
import { useDashboardSummary } from "@/services/dashboard.service";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { useWaterLevel } from "@/hooks/water-level";
import { useAllLocation } from "@/hooks/locations";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: locations } = useAllLocation();
  const [selectedLocation, setSelectedLocation] = React.useState(
    locations?.[0].name
  );
  const { data: waterLevelLast12Hours } = useWaterLevel(
    { location: selectedLocation ?? "" },
    "/water-level/last-12-hours"
  );
  const { data: waterLevelHourly } = useWaterLevel(
    { location: selectedLocation ?? "" },
    "/water-level/hourly"
  );
  const { data: waterLevelDaily } = useWaterLevel(
    { location: selectedLocation ?? "" },
    "/water-level/daily"
  );
  const { data: waterLevelLastWeek } = useWaterLevel(
    { location: selectedLocation ?? "" },
    "/water-level/last-week"
  );
  const { data: waterLevelWeekly } = useWaterLevel(
    { location: selectedLocation ?? "" },
    "/water-level/weekly"
  );

  const summaryCards = [
    {
      title: "Jumlah CCTV",
      value: summary?.cctv_total ?? 0,
      icon: <CameraIcon className="mr-2 h-4 w-4 text-primary" />,
      subtitle: "+12% from average",
      trendIcon: <TrendingUp className="mr-1 h-3 w-3 text-green-500" />,
      isLoading: summaryLoading,
    },
    {
      title: "CCTV Offline",
      value: summary?.cctv_offline ?? 0,
      icon: <Activity className="mr-2 h-4 w-4 text-primary" />,
      subtitle: "3%",
      trendIcon: <TrendingDown className="mr-1 h-3 w-3 text-red-500" />,
      isLoading: summaryLoading,
    },
    {
      title: "Banjir Terdeteksi",
      value: summary?.flood_detection ?? 0,
      icon: <GlassWaterIcon className="mr-2 h-4 w-4 text-primary" />,
      subtitle: "2 high priority",
      isLoading: summaryLoading,
    },
    {
      title: "Peringatan",
      value: summary?.alert ?? 0,
      icon: <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />,
      subtitle: "2 high priority",
      isLoading: summaryLoading,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {summaryCards.map((item, i) => (
          <SummaryCard key={i} {...item} />
        ))}

        {/* <Card className="bg-card border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CameraIcon className="mr-2 h-4 w-4 text-primary" />
              Jumlah CCTV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{summary?.cctv_total ?? 0}</div>
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
            <div className="text-3xl font-bold text-foreground">{summary?.cctv_offline ?? 0}</div>
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
            <div className="text-3xl font-bold text-foreground">{summary?.flood_detection ?? 0}</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
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
            <div className="text-3xl font-bold text-foreground">{summary?.alert ?? 0}</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
          </CardContent>
        </Card> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* {!waterLevelHourly || !waterLevelDaily || !waterLevelWeekly ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">
                <Skeleton className="w-56 h-7" />
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Skeleton className="w-40 h-7" />
                <Skeleton className="w-10 h-7" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-4">
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-20 h-10" />
                  <Skeleton className="w-20 h-6" />
                  <Skeleton className="w-full h-3" />
                  <Skeleton className="w-40 h-3" />
                </div>

                <div>
                  <Skeleton className="w-full h-40" />
                </div>
              </div>
              <div className="mt-10 pt-3 flex items-center justify-between border-t">
                <Skeleton className="w-20 h-5" />
                <Skeleton className="w-20 h-5" />
              </div>
            </CardContent>
          </Card>
          ) : (
          )} */}
          <OccupancyPanel
            zones={locations}
            hourly={waterLevelHourly}
            daily={waterLevelDaily}
            weekly={waterLevelWeekly}
          />
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
    </div>
  );
}
