"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useSensors } from "@/hooks/sensor";
import { format, formatDistanceToNow } from "date-fns";
import { TableIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { sensorColumns } from "./columns";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useAllLocation } from "@/hooks/locations";
import { SearchInput } from "@/components/parts/SearchInput";
import { SelectFilter } from "@/components/parts/SelectFilter";
import { SortFilter } from "@/components/parts/SortFilter";

type Props = {};

export default function SensorsPage({}: Props) {
  const { page, setPage, limit, setLimit } = usePaginationParams(1, 10);
  const [filters, setFilters] = useState<{
    name?: string;
    created?: string;
    location_id?: string;
  }>({});
  const {
    data = [],
    isLoading,
    meta,
    links,
  } = useSensors({
    page,
    limit,
    sort: filters.created,
    location_id:
      filters.location_id && filters.location_id !== "all"
        ? Number(filters.location_id)
        : undefined,
    name: filters.name,
  });
  // const { data: locations, isLoading: locationLoading } = useAllLocation();

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

            <div className="flex gap-x-2">
              <SearchInput
                placeholder="Search..."
                value={filters.name}
                onChange={(v) => setFilters((prev) => ({ ...prev, name: v }))}
              />
              <SortFilter
                value={filters.created}
                onChange={(sortObj) =>
                  setFilters((prev) => ({
                    ...prev,
                    created: sortObj.created,
                  }))
                }
              />
              {/* <SelectFilter
                value={filters.location_id ?? "all"}
                onChange={(v) =>
                  setFilters((prev) => ({ ...prev, location_id: v }))
                }
                placeholder="Location"
                allLabel="All Location"
                options={
                  locations?.map((item) => ({
                    label: item.name,
                    value: item.id.toString(),
                  })) ?? []
                }
              /> */}
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
