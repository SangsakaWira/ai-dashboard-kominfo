"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useAllCctv } from "@/hooks/cctv";
import { TableIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cctvColumns } from "./columns";

type Props = {};

export default function SensorsPage({}: Props) {
  const { data = [], isLoading } = useAllCctv();
  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
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
          </CardHeader>
          <CardContent>
            <DataTable columns={cctvColumns} data={data} loading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
