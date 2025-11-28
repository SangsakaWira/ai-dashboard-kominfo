'use client'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOccupancyZones } from "@/services/occupancy.service";
import { format, formatDistanceToNow } from "date-fns";
import { TableIcon } from "lucide-react";
import React from "react";

type Props = {};

function TableSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 3 }).map((_, i) => (
        <TableRow key={i}>
          {/* Zone */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Current */}
          <TableCell>
            <Skeleton className="h-4 w-10" />
          </TableCell>

          {/* Capacity */}
          <TableCell>
            <Skeleton className="h-4 w-10" />
          </TableCell>

          {/* Utilization (bar + text) */}
          <TableCell>
            <div className="flex items-center space-x-2 w-full">
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-4 w-8" />
            </div>
          </TableCell>

          {/* Status Badge */}
          <TableCell>
            <Skeleton className="h-5 w-20 rounded-full" />
          </TableCell>

          {/* Peak Time */}
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>

          {/* Peak count */}
          <TableCell>
            <Skeleton className="h-4 w-10" />
          </TableCell>

          {/* Last Update */}
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default function ManagementPage({ }: Props) {
  const { data = [], isLoading } = useOccupancyZones()

  // const tableData = data.map((item) => ({
  //   id: 1,
  //   zone: "Kantor Kecamatan Plaju",
  //   currentOccupancy: 12,
  //   maxCapacity: 50,
  //   status: "Normal",
  //   lastUpdate: "2 min ago",
  //   peakTime: "12:30 PM",
  //   peakCount: 45,
  // }))
  // {
  //   id: 2,
  //   zone: "Kertapati",
  //   currentOccupancy: 24,
  //   maxCapacity: 100,
  //   status: "Normal",
  //   lastUpdate: "1 min ago",
  //   peakTime: "1:15 PM",
  //   peakCount: 78,
  // },
  // {
  //   id: 3,
  //   zone: "Cafeteria",
  //   currentOccupancy: 6,
  //   maxCapacity: 80,
  //   status: "Low",
  //   lastUpdate: "3 min ago",
  //   peakTime: "12:00 PM",
  //   peakCount: 65,
  // },
  // {
  //   id: 4,
  //   zone: "Meeting Rooms",
  //   currentOccupancy: 0,
  //   maxCapacity: 30,
  //   status: "Empty",
  //   lastUpdate: "5 min ago",
  //   peakTime: "10:30 AM",
  //   peakCount: 28,
  // },
  // {
  //   id: 5,
  //   zone: "Office Area",
  //   currentOccupancy: 35,
  //   maxCapacity: 40,
  //   status: "High",
  //   lastUpdate: "1 min ago",
  //   peakTime: "2:00 PM",
  //   peakCount: 38,
  // },

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return <Badge variant="secondary">Normal</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "critical":
        return <Badge className="bg-blue-500">Low</Badge>;
      case "empty":
        return <Badge variant="outline">Empty</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  return (
    <div>
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
                {isLoading ? <TableSkeleton /> : (
                  <TableBody>
                    {data.map((row:any) => {
                      // const utilization = Math.round(
                      //   (row.current / row.capacity) * 100
                      // );
                      return (
                        <TableRow key={row.id}>
                          {/* <TableCell className="font-medium">
                            {row.zone}
                          </TableCell>
                          <TableCell>{row.current}</TableCell>
                          <TableCell>{row.capacity}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${row.utilization > 80
                                    ? "bg-red-500"
                                    : row.utilization > 60
                                      ? "bg-orange-500"
                                      : "bg-green-500"
                                    }`}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">
                                {row.utilization}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(row.status)}</TableCell>
                          <TableCell>{format(new Date(row.peak_time), "hh:mm a")}</TableCell>
                          <TableCell>{row.peak}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDistanceToNow(new Date(row.last_update), { addSuffix: true })}
                          </TableCell> */}
                          <span></span>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )}
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <TabsContent value="table">
      </TabsContent> */}
    </div>
  );
}
