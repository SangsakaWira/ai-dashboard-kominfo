"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useAllCctv } from "@/hooks/cctv";
import { TableIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { cctvColumns } from "./columns";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { SearchInput } from "@/components/parts/SearchInput";
import { SortFilter } from "@/components/parts/SortFilter";

type Props = {};

export default function CctvPage({}: Props) {
  const { page, setPage, limit, setLimit } = usePaginationParams(1, 10);
  const [filters, setFilters] = useState<{ name: string; created?: string }>({
    name: "",
  });

  const {
    data = [],
    isLoading,
    links,
    meta,
  } = useAllCctv({
    page,
    limit,
    sort: filters.created,
    name: filters.name,
  });

  return (
    <div>
      <Card className="bg-card border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <TableIcon className="mr-2 h-5 w-5" />
              CCTV Table
            </CardTitle>
            <Link href={"/cctv/add"}>
              <Button>Create CCTV</Button>
            </Link>
          </div>

          <div className="flex max-w-2xl gap-2">
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
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={cctvColumns}
            data={data}
            currentPage={meta?.currentPage ?? 1}
            totalPages={meta?.totalPages ?? 1}
            hasNext={!!links?.next}
            hasPrev={!!links?.prev}
            onPageChange={setPage}
            loading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
