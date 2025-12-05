"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAllLocation } from "@/hooks/locations";
// import {} from "@/schemas";
import { SensorForm } from "../SensorForm";
import { useCreateSensor } from "@/hooks/sensor";
import { SensorPayload } from "@/types";
import { toast } from "sonner";

type Props = {};

export default function AddSensorPage({}: Props) {
  const locations = useAllLocation();
  const { createSensor, isMutating } = useCreateSensor();
  const router = useRouter();

  const handleCreate = async (payload: SensorPayload) => {
    await toast.promise(createSensor(payload), {
      loading: "Menyimpan data Sensor...",
      success: "Data Sensor berhasil ditambahkan!",
      error: "Gagal menambahkan Sensor, coba lagi.",
    });
    router.push("/sensors");
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Create Sensor</h1>

      <SensorForm
        onSubmit={handleCreate}
        locations={locations?.data || []}
        isMutating={isMutating}
        defaultValues={{
          name: "",
          key: "",
          latitude: undefined,
          longitude: undefined,
          unit: "",
          threshold_low: undefined,
          threshold_high: undefined,
          location_id: undefined,
          is_active: true,
        }}
        mode="create"
      />
    </div>
  );
}
