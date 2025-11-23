"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { TableIcon } from "lucide-react";
import Link from "next/link";
import { floodReportColumns } from "./columns";
import { useFloodReport } from "@/hooks/flood-report";

type Props = {};

export default function FloodReportPage({}: Props) {
  const { data = [], isLoading } = useFloodReport();

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
        />
      </CardContent>
    </Card>
  );
}
