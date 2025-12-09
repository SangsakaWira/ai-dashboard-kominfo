"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSensorDetail } from "@/hooks/sensor";
import { useLocationDetail } from "@/hooks/locations";
import { DetailTitle } from "@/components/parts/DetailTitle";
import dynamic from "next/dynamic";
import { formatDateTime } from "@/lib/utils";

const LocationMap = dynamic(() => import("@/components/parts/LocationMap"), {
  ssr: false,
});

type Props = {
  id: string;
};

export function DetailSensorContent({ id }: Props) {
  const { data: sensor } = useSensorDetail(Number(id));
  // const { data: location } = useLocationDetail(Number(sensor?.location_id));

  if (!sensor) return <p>Loading...</p>;
  return (
    <Card className="bg-card border">
      <CardHeader>
        <DetailTitle backUrl="/sensors" title="Sensor" />
        {/* <div className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-2">
            <CardTitle className="flex items-center">{sensor.name}</CardTitle>
            <Badge variant={sensor.is_active ? "default" : "secondary"}>
              {sensor.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <h3 className="text-base font-semibold">{sensor.name}</h3>
              {/* <p className="text-sm">Lokasi: {location?.name || "-"}</p> */}
              <div className="text-sm flex items-center gap-x-2">
                <strong>Status:{" "}</strong>
                <Badge variant={sensor.is_active ? "default" : "secondary"}>
                  {sensor.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="text-sm"><strong>Threshold (Low):</strong> {sensor.threshold_low}</div>
              <div className="text-sm">
                <strong>Threshold (High):</strong> {sensor.threshold_high}
              </div>
              <div className="text-sm">
                <strong>Update Terakhir:</strong> {formatDateTime(sensor.updated_at)} WIB
              </div>
            </div>
          </div>

          {/* MAP */}
          <div>
            <h3 className="font-semibold mb-2">Lokasi Sensor</h3>
            <LocationMap
              data={sensor}
              // latitude={sensor.latitude}
              // longitude={sensor.longitude}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
