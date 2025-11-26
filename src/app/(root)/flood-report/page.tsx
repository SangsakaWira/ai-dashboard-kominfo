"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { TableIcon } from "lucide-react";
import Link from "next/link";
import { floodReportColumns } from "./columns";
import { useFloodReport } from "@/hooks/flood-report";
import { usePaginationParams } from "@/hooks/usePaginationParams";

type Props = {};

export default function FloodReportPage({}: Props) {
  const { page, setPage, limit, setLimit } = usePaginationParams(1, 10);
  const { data = [], isLoading, meta, links } = useFloodReport();

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
