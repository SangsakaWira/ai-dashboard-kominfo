"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { TableIcon } from "lucide-react";
import Link from "next/link";
import { useFloodSpot } from "@/hooks/flood-spot";
import { floodSpotColumns } from "./columns";

type Props = {};

export default function FloodReportPage({}: Props) {
  const { data = [], isLoading } = useFloodSpot();

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
      </CardHeader>
      <CardContent>
        <DataTable
          columns={floodSpotColumns}
          data={data}
          loading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
