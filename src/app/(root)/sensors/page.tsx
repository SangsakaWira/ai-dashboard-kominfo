"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useSensors } from "@/hooks/sensor";
import { format, formatDistanceToNow } from "date-fns";
import { TableIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { sensorColumns } from "./columns";
import { usePaginationParams } from "@/hooks/usePaginationParams";

type Props = {};

export default function SensorsPage({}: Props) {
  const { page, setPage, limit, setLimit } = usePaginationParams(1, 10);
  const {
    data = [],
    isLoading,
    meta,
    links,
  } = useSensors({
    page,
    limit,
  });

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
            <DataTable
              columns={sensorColumns}
              data={data}
              loading={isLoading}
              currentPage={meta?.currentPage ?? 1}
              totalPages={meta?.totalPages ?? 1}
              hasNext={!!links?.next}
              hasPrev={!!links?.prev}
              onPageChange={setPage}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
