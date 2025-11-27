"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { TableIcon } from "lucide-react";
import Link from "next/link";
import { floodReportColumns } from "./columns";
import { useFloodReport } from "@/hooks/flood-report";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { SelectFilter } from "@/components/parts/SelectFilter";
import { useAllLocation } from "@/hooks/locations";

type Props = {};

export default function FloodReportPage({}: Props) {
  const { page, setPage, limit, setLimit } = usePaginationParams(1, 10);
  const [filters, setFilters] = useState<{
    status?: "pending" | "verified" | "rejected" | "resolved";
    source?: "masyarakat" | "petugas" | "sensor_auto";
    location_id?: string;
  }>({});
  const {
    data = [],
    isLoading,
    meta,
    links,
  } = useFloodReport({
    page,
    limit,
    status: filters.status,
    location_id: filters.location_id ? Number(filters.location_id) : undefined,
    source: filters.source,
  });
  const { data: locations, isLoading: locationLoading } = useAllLocation();

  return (
    <Card className="bg-card border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <TableIcon className="mr-2 h-5 w-5" />
            Flood Report Table
          </CardTitle>
          <Button>
            <Link href={"/flood-report/add"}>Create Flood Report</Link>
          </Button>
        </div>

        <div className="flex gap-x-2">
          <SelectFilter
            value={filters.location_id ?? "all"}
            onChange={(v) =>
              setFilters((prev) => ({ ...prev, location_id: v }))
            }
            placeholder="Location"
            allLabel="All Location"
            // label="Location"
            options={
              locations?.map((item) => ({
                label: item.name,
                value: item.id.toString(),
              })) ?? []
            }
          />
          <SelectFilter
            value={filters.status ?? "all"}
            onChange={(v) =>
              setFilters((prev) => ({
                ...prev,
                status:
                  v === "all"
                    ? undefined
                    : (v as "pending" | "verified" | "rejected" | "resolved"),
              }))
            }
            placeholder="Status"
            allLabel="All Status"
            // label="Severity"
            options={[
              {
                label: "Pending",
                value: "pending",
              },
              {
                label: "Verified",
                value: "verified",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
              {
                label: "Resolved",
                value: "resolved",
              },
            ]}
          />
          <SelectFilter
            value={filters.source ?? "all"}
            onChange={(v) =>
              setFilters((prev) => ({
                ...prev,
                source:
                  v === "all"
                    ? undefined
                    : (v as "masyarakat" | "petugas" | "sensor_auto"),
              }))
            }
            placeholder="Source"
            allLabel="All Source"
            // label="Severity"
            options={[
              {
                label: "Masyarakat",
                value: "masyarakat",
              },
              {
                label: "Petugas",
                value: "petugas",
              },
              {
                label: "Sensor Auto",
                value: "sensor_auto",
              },
            ]}
          />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={floodReportColumns}
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
  );
}
