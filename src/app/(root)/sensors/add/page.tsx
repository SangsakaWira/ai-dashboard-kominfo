"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useApiMutation } from "@/hooks/useApiMutation";
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
import {} from "@/schemas";
import { SensorForm } from "../SensorForm";
import { useCreateSensor } from "@/hooks/sensor";
import { SensorPayload } from "@/types";

type Props = {};

export default function AddSensorPage({}: Props) {
  const locations = useAllLocation();
  const { createSensor, isMutating } = useCreateSensor();
  const router = useRouter();

  const handleCreate = async (payload: SensorPayload) => {
    await createSensor(payload);
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
