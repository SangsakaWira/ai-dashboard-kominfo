"use client";
import { useFloodReportDetail } from "@/hooks/flood-report";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DetailTitle } from "@/components/parts/DetailTitle";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/components/parts/LocationMap"), {
  ssr: false,
});

type Props = {
  id: string;
};

export function DetailFloodReportContent({ id }: Props) {
  const { data: report } = useFloodReportDetail(Number(id));

  if (!report) return <p>Loading...</p>;
  return (
    <Card className="bg-card border">
      <CardHeader>
        <DetailTitle backUrl="/flood-report" title="Flood Report" />
        {/* <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">Detail Report</CardTitle>
        </div> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {report?.photo_url && (
              <Image
                src={report.photo_url}
                alt={report.description}
                width={500}
                height={500}
                className="w-full md:w-72 rounded-lg object-cover border"
              />
            )}

            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-semibold">{report.reporter_name}</h2>
              <p className="text-sm text-muted-foreground">
                {report.reporter_phone}
              </p>

              <p className="text-sm">{report.description}</p>

              <div className="text-sm">
                <strong>Status:</strong>{" "}
                <Badge
                  className={
                    report.status === "pending"
                      ? "bg-yellow-500"
                      : report.status === "approved"
                        ? "bg-green-600"
                        : "bg-red-600"
                  }
                >
                  {report.status}
                </Badge>
              </div>

              <div className="text-sm">
                <strong>Dilaporkan:</strong>{" "}
                {new Date(report.created_at).toLocaleString("id-ID")}
              </div>
            </div>
          </div>

          {/* MAP */}
          <div>
            <h3 className="font-semibold mb-2">Lokasi Kejadian</h3>
            <LocationMap
              data={report}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
