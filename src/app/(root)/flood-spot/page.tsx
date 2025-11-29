"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { TableIcon } from "lucide-react";
import Link from "next/link";
import { useFloodSpot } from "@/hooks/flood-spot";
import { floodSpotColumns } from "./columns";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useAllLocation } from "@/hooks/locations";
import { SelectFilter } from "@/components/parts/SelectFilter";

type Props = {};

export default function FloodReportPage({}: Props) {
  const { page, setPage, limit, setLimit } = usePaginationParams(1, 10);
  const [filters, setFilters] = useState<{
    severity?: "ringan" | "sedang" | "parah";
    source?: "masyarakat" | "petugas" | "sensor_auto";
    location_id?: string;
  }>({});
  const {
    data = [],
    isLoading,
    meta,
    links,
  } = useFloodSpot({
    page,
    limit,
    severity: filters.severity,
    source: filters.source,
    location_id: filters.location_id ? Number(filters.location_id) : undefined,
  });
  const { data: locations, isLoading: locationLoading } = useAllLocation();

  return (
    <Card className="bg-card border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <TableIcon className="mr-2 h-5 w-5" />
            Flood Spot Table
          </CardTitle>
          <Button>
            <Link href={"/flood-spot/add"}>Create Flood Spot</Link>
          </Button>
        </div>

        <div className="flex gap-x-2">
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
          <SelectFilter
            value={filters.severity ?? "all"}
            onChange={(v) =>
              setFilters((prev) => ({
                ...prev,
                severity:
                  v === "all"
                    ? undefined
                    : (v as "ringan" | "sedang" | "parah"),
              }))
            }
            placeholder="Severity"
            allLabel="All Severity"
            // label="Severity"
            options={[
              {
                label: "Ringan",
                value: "ringan",
              },
              {
                label: "Sedang",
                value: "sedang",
              },
              {
                label: "Berat",
                value: "berat",
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
          columns={floodSpotColumns}
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
