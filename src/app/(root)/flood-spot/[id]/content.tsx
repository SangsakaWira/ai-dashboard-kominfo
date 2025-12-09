"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFloodSpotDetail } from "@/hooks/flood-spot";
import { DetailTitle } from "@/components/parts/DetailTitle";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/components/parts/LocationMap"), {
  ssr: false,
});

type Props = {
  id: string;
};

export function DetailFloodSpotContent({ id }: Props) {
  const { data: spot } = useFloodSpotDetail(Number(id));

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
    <Card className="bg-card border">
      <CardHeader>
        <DetailTitle backUrl="/flood-spot" title="Flood Spot" />
        {/* <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">Detail Spot</CardTitle>
        </div> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
              {/* <div className="text-sm flex items-center gap-x-2">
                <strong>Status:</strong>{" "}
                <Badge className={colorClass}>
                  {labelMap[effectiveStatus]}
                </Badge>
              </div> */}
              <div className="text-sm">
                <strong>Status Kondisi:</strong> <span className="capitalize">{spot?.condition_status || "-"}</span>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div>
            <h3 className="font-semibold mb-2">Lokasi</h3>
            <LocationMap
              data={spot}
              // latitude={spot.latitude}
              // longitude={spot.longitude}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
