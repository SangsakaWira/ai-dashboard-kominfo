"use client";
import { useFloodReportDetail } from "@/hooks/flood-report";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DetailTitle } from "@/components/parts/DetailTitle";
import dynamic from "next/dynamic";
import { formatDateTime } from "@/lib/utils";

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
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col gap-6">
            {report?.photo_url && (
              <Image
                src={report.photo_url}
                alt={report.description}
                width={500}
                height={500}
                className="w-auto rounded-lg"
              />
            )}

            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-semibold">{report.name}</h2>
              <p className="text-sm">{report.description}</p>

              <div className="my-2 space-y-1">
                <div className="text-sm"><strong>Kedalaman:</strong> {report.depth} cm/{report.depth_label}</div>
                <div className="text-sm"><strong>Sumber:</strong> {report.source}</div>
              </div>

              <div className="text-base font-semibold">Pelapor:</div>
              <div className="mt-2 space-y-1">
                <div className="text-sm"><strong>Nama:</strong> {report.reporter_name}</div>
                <div className="text-sm"><strong>Telepon:</strong> {report.reporter_phone}</div>
                <div className="text-sm"><strong>Waktu Laporan:</strong> {formatDateTime(report.created_at)} WIB</div>
              </div>

              {/* <div className="text-sm">
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
              </div> */}
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
