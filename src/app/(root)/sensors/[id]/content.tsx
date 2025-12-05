"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationMap } from "@/components/parts/LocationMap";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useSensorDetail } from "@/hooks/sensor";
import { useLocationDetail } from "@/hooks/locations";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { DetailTitle } from "@/components/parts/DetailTitle";

type Props = {
  id: string;
};

export function DetailSensorContent({ id }: Props) {
  const { data: sensor } = useSensorDetail(Number(id));
  const { data: location } = useLocationDetail(Number(sensor?.location_id));

  if (!sensor) return <p>Loading...</p>;
  return (
    <Card className="bg-card border">
      <CardHeader>
        <DetailTitle backUrl="/sensors" title="Sensor" />
        <div className="flex items-center gap-x-3">
          {/* <Button variant={'ghost'}><ArrowLeftIcon /></Button> */}
          <div className="flex items-center gap-x-2">
            <CardTitle className="flex items-center">{sensor.name}</CardTitle>
            <Badge variant={sensor.is_active ? "default" : "secondary"}>
              {sensor.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <p className="text-sm">Lokasi: {location?.name || "-"}</p>
              <p className="text-sm">Threshold (Low): {sensor.threshold_low}</p>
              <p className="text-sm">
                Threshold (High): {sensor.threshold_high}
              </p>
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
