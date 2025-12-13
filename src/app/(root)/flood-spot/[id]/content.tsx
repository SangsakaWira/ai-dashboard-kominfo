"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFloodSpotDetail } from "@/hooks/flood-spot";
import { DetailTitle } from "@/components/parts/DetailTitle";
import dynamic from "next/dynamic";
import {
  AlertTriangleIcon,
  AlignLeftIcon,
  BookmarkIcon,
  DropletIcon,
  InfoIcon,
  MapPinIcon,
  WavesIcon,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";

const LocationMap = dynamic(() => import("@/components/parts/LocationMap"), {
  ssr: false,
});

type Props = {
  id: string;
};

export function DetailFloodSpotContent({ id }: Props) {
  const { data: spot } = useFloodSpotDetail(Number(id));

  const severityColor: Record<string, string> = {
    ringan: "bg-yellow-100 text-yellow-700",
    sedang: "bg-orange-100 text-orange-700",
    berat: "bg-red-100 text-red-700",
  };

  const conditionColor: Record<string, string> = {
    reported: "bg-blue-100 text-blue-700",
    ongoing: "bg-orange-100 text-orange-700",
    resolved: "bg-green-100 text-green-700",
  };

  // const effectiveStatus = (spot?.status || "normal") as
  //   | "normal"
  //   | "warning"
  //   | "danger";

  // const labelMap: Record<typeof effectiveStatus, string> = {
  //   normal: "Normal",
  //   warning: "Peringatan",
  //   danger: "Bahaya",
  // };

  // const colorClass =
  //   effectiveStatus === "danger"
  //     ? "bg-red-600"
  //     : effectiveStatus === "warning"
  //       ? "bg-yellow-500"
  //       : "bg-green-600";

  if (!spot) return <p>Loading...</p>;
  return (
    <div className="bg-card space-y-5">
      <DetailTitle backUrl="/flood-spot" title="Kembali ke daftar Flood Spot" />

      <Card className="border mt-10">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <WavesIcon className="h-6 w-6 text-primary" />
            {spot.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPinIcon className="w-4 h-4 text-muted-foreground" /> Lokasi
            Banjir
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangleIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Severity</p>
              <span
                className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                  severityColor[spot.severity] || "bg-gray-100 text-gray-700"
                }`}
              >
                {spot.severity}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <InfoIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <span
                className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                  conditionColor[spot.condition_status] ||
                  "bg-gray-200 text-gray-700"
                }`}
              >
                {spot.condition_status}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <DropletIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Kedalaman</p>
              <p className="font-semibold">{spot.depth} cm</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlignLeftIcon className="h-5 w-5 text-primary" /> Detail Informasi
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Sumber Laporan</p>
            <p className="font-semibold capitalize flex items-center gap-1">
              {/* <BookmarkIcon className="w-4 h-4 text-muted-foreground" /> */}
              {spot?.source ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Waktu Laporan</p>
            <p className="font-semibold">{formatDateTime(spot.created_at)} WIB</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs text-muted-foreground">Deskripsi</p>
            <p className="font-medium">{spot.description || "-"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Lokasi</h3>
          <LocationMap data={spot} />
        </CardContent>
      </Card>

      {/* <div>
        <div className="space-y-6 mt-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <h3 className="text-base font-semibold">{spot?.name || "-"}</h3>
              <div className="flex items-center gap-x-2 text-sm">
                <strong className="text-sm">Keparahan: </strong>
                {spot?.severity ? (
                  <Badge
                    className={
                      spot.severity === "sedang"
                        ? "bg-yellow-500"
                        : spot.severity === "ringan"
                          ? "bg-green-600"
                          : "bg-red-600"
                    }
                  >
                    {spot.severity}
                  </Badge>
                ) : (
                  "-"
                )}
              </div>

              <div className="text-sm">
                <strong>Kedalaman:</strong> {spot?.depth || "-"} cm
              </div>
              <div className="text-sm">
                <strong>Sumber:</strong> {spot?.source || "-"}
              </div>
              <div className="text-sm">
                <strong>Deskripsi:</strong> {spot?.description || "-"}
              </div>
              <div className="text-sm">
                <strong>Status Kondisi:</strong>{" "}
                <span className="capitalize">
                  {spot?.condition_status || "-"}
                </span>
              </div>
            </div>
          </div>

          <div>
            
          </div>
        </div>
      </div> */}
    </div>
  );
}
