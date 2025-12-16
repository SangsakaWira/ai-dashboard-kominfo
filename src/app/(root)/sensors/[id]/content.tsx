"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSensorDetail } from "@/hooks/sensor";
import { useLocationDetail } from "@/hooks/locations";
import { DetailTitle } from "@/components/parts/DetailTitle";
import dynamic from "next/dynamic";
import { formatDateTime } from "@/lib/utils";
import {
  ActivitySquareIcon,
  BatteryIcon,
  CalendarClockIcon,
  RadioIcon,
} from "lucide-react";

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
    <div className="bg-card space-y-5">
      <DetailTitle backUrl="/sensors" title="Kembali ke Daftar Sensor" />

      <Card className="border mt-10">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            {sensor.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sensor Type: <span className="font-medium">{sensor.key}</span>
          </p>
        </CardHeader>
        {sensor.image_url && (
          <CardContent className="pt-0">
            <img
              src={sensor.image_url}
              alt={sensor.name}
              className="mt-2 h-40 w-full max-w-md rounded-md object-cover border"
            />
          </CardContent>
        )}
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <ActivitySquareIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  sensor.is_active
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {sensor.is_active ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <RadioIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Signal</p>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  sensor.signal >= 75
                    ? "bg-green-200 text-green-700"
                    : sensor.signal >= 40
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-red-200 text-red-700"
                }`}
              >
                {sensor.signal ?? "-"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BatteryIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Battery</p>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  sensor.battery >= 80
                    ? "bg-green-200 text-green-700"
                    : sensor.battery >= 40
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-red-200 text-red-700"
                }`}
              >
                {sensor.battery ?? "-"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <CalendarClockIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Last Connected</p>
              {sensor?.last_connected ? (
                <p className="font-semibold">
                  {formatDateTime(sensor.last_connected)} WIB
                </p>
              ) : (
                <p>-</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="grid md:grid-cols-3 gap-4 pt-6">
          <div>
            <p className="text-xs text-muted-foreground">Threshold Low</p>
            <p className="font-semibold">
              {sensor?.threshold_low ?? "-"} {sensor?.unit}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Threshold High</p>
            <p className="font-semibold">
              {sensor?.threshold_high ?? "-"} {sensor?.unit}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Max Level</p>
            <p className="font-semibold">
              {sensor?.max_level ?? "-"} {sensor?.unit}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Lokasi Sensor</h3>
          <LocationMap
              data={sensor}
            />
        </CardContent>
      </Card>
      {/* <div>
        <div className="space-y-6 mt-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <h3 className="text-base font-semibold">{sensor.name}</h3>
              <div className="text-sm flex items-center gap-x-2">
                <strong>Status: </strong>
                <Badge variant={sensor.is_active ? "default" : "secondary"}>
                  {sensor.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="text-sm">
                <strong>Threshold (Low):</strong> {sensor.threshold_low}
              </div>
              <div className="text-sm">
                <strong>Threshold (High):</strong> {sensor.threshold_high}
              </div>
              <div className="text-sm">
                <strong>Update Terakhir:</strong>{" "}
                {formatDateTime(sensor.updated_at)} WIB
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
