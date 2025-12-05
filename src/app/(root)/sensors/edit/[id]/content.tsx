"use client";
import { useSensorDetail, useUpdateSensor } from "@/hooks/sensor";
import { useRouter } from "next/navigation";
import React from "react";
import { useAllLocation } from "@/hooks/locations";
import { SensorPayload } from "@/types";
import { SensorForm } from "../../SensorForm";
import { toast } from "sonner";

type Props = {
  id: string;
};

export function EditSensorContent({ id }: Props) {
  const { data: sensor } = useSensorDetail(Number(id));
  const { updateSensor, isMutating } = useUpdateSensor(Number(id));
  const locations = useAllLocation();
  const router = useRouter();

  const handleUpdate = async (payload: SensorPayload) => {
    await toast.promise(updateSensor(payload), {
      loading: "Menyimpan data Sensor...",
      success: "Data Sensor berhasil diupdate!",
      error: "Gagal edit Sensor, coba lagi.",
    });
    router.push("/sensors");
  };

  if (!sensor) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Edit Sensor</h1>

      <SensorForm
        onSubmit={handleUpdate}
        locations={locations?.data || []}
        isMutating={isMutating}
        defaultValues={{
          name: sensor.name,
          key: sensor.name,
          latitude: sensor.latitude,
          longitude: sensor.longitude,
          unit: sensor.unit,
          threshold_low: sensor.threshold_low,
          threshold_high: sensor.threshold_high,
          location_id: sensor.location_id,
          is_active: sensor.is_active,
        }}
        mode="edit"
      />
    </div>
  );
}
