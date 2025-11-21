"use client";
import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useSensors } from "@/hooks/sensor";
import { format, formatDistanceToNow } from "date-fns";
import { TableIcon } from "lucide-react";
import Link from "next/link";
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
  );
}

export default function SensorsPage({}: Props) {
  const { data = [], isLoading } = useSensors();

  // const getThresholdBadge = (status: string) => {
  //   switch (status.toLowerCase()) {
  //     case "normal":
  //       return <Badge variant="secondary">Normal</Badge>;
  //     case "high":
  //       return <Badge className="bg-orange-500">High</Badge>;
  //     case "critical":
  //       return <Badge className="bg-blue-500">Low</Badge>;
  //     case "empty":
  //       return <Badge variant="outline">Empty</Badge>;
  //     default:
  //       return <Badge>Unknown</Badge>;
  //   }
  // };
  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-card border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <TableIcon className="mr-2 h-5 w-5" />
                Sensor Table
              </CardTitle>
              <Button>
                <Link href={"/sensors/add"}>Create Sensor</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sensor Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Threshold (Low)</TableHead>
                    <TableHead>Threshold (High)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  <TableBody>
                    {data.map((row) => {
                      return (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">
                            {row.name}
                          </TableCell>
                          <TableCell>{row.key}</TableCell>
                          <TableCell>{row.unit}</TableCell>
                          <TableCell>{row.threshold_low}</TableCell>
                          <TableCell>{row.threshold_high}</TableCell>
                          <TableCell>
                            {row.is_active ? (
                              <Badge className="bg-green-500">Active</Badge>
                            ) : (
                              <Badge variant="destructive">Inactive</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <ActionCell
                              edit={`/sensors/edit/${row.id}`}
                              onDelete={() => console.log("Delete")}
                              pathDelete={`/sensor`}
                              itemId={row.id}
                            />
                          </TableCell>
                          {/* <TableCell>{format(new Date(row.peak_time), "hh:mm a")}</TableCell>
                          <TableCell>{row.peak}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDistanceToNow(new Date(row.last_update), { addSuffix: true })}
                          </TableCell> */}
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
    </div>
  );
}
