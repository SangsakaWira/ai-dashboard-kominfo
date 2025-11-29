"use client";
import { useSensorDetail, useUpdateSensor } from "@/hooks/sensor";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllLocation } from "@/hooks/locations";
import { ButtonCancel } from "@/components/parts/ButtonCancel";
import { MapPicker } from "@/components/parts/MapPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { sensorSchema } from "@/schemas";
import { SensorPayload } from "@/types";
import { SensorForm } from "../../SensorForm";

type Props = {
  id: string;
};

export function EditSensorContent({ id }: Props) {
  const { data: sensor } = useSensorDetail(Number(id));
  const { updateSensor, isMutating } = useUpdateSensor(Number(id));
  const locations = useAllLocation();
  const router = useRouter();

  const handleUpdate = async (payload: SensorPayload) => {
    await updateSensor(payload);
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
