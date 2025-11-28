"use client";

import React, { useState } from "react";
import { useAllLocation } from "@/hooks/locations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { TableIcon } from "lucide-react";
import Link from "next/link";
import { SelectFilter } from "@/components/parts/SelectFilter";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { SearchInput } from "@/components/parts/SearchInput";
import { locationsColumns } from "./columns";
import { LocationsMap } from "./map";

type Props = {};

export default function LocationsPage({}: Props) {
  const { page, limit, setPage } = usePaginationParams(1, 10);
  const [filters, setFilters] = useState<{
    name?: string;
  }>({});
  const {
    data = [],
    isLoading,
    links,
    meta,
  } = useAllLocation({
    page,
    limit,
    name: null,
  });
  return (
    <div className="space-y-8 pb-10">
      <Card className="bg-card border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <TableIcon className="mr-2 h-5 w-5" />
              Locations Table
            </CardTitle>
            <Button>
              <Link href={"/locations/add"}>Create Location</Link>
            </Button>
          </div>

          <div className="flex gap-x-2">
            <SearchInput
              placeholder="Search..."
              value={filters.name}
              onChange={(v) => setFilters((prev) => ({ ...prev, name: v }))}
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={locationsColumns}
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

      <LocationsMap data={data} isLoading={isLoading} />
    </div>
  );
}
