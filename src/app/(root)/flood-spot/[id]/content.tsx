"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationMap } from "@/components/parts/LocationMap";
import { Badge } from "@/components/ui/badge";
import { useFloodSpotDetail } from "@/hooks/flood-spot";
import { DetailTitle } from "@/components/parts/DetailTitle";

type Props = {
  id: string;
};

export function DetailFloodSpotContent({ id }: Props) {
  const { data: spot } = useFloodSpotDetail(Number(id));

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
              <div className="flex items-center gap-x-2">
                <p className="text-sm">Severity: </p>
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
                ) : "-"}
              </div>

              <p className="text-sm">Depth: {spot?.depth || "-"} cm</p>
              <p className="text-sm">Source: {spot?.source || "-"}</p>
              <p className="text-sm">Description: {spot?.description || "-"}</p>
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
