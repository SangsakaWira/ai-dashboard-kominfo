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

type Props = {};

const sensorSchema = z.object({
  name: z.string().min(1, "Nama sensor wajib diisi"),
  key: z.string().min(1, "Key wajib diisi"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  unit: z.string().optional(),

  threshold_low: z.string().optional(),
  threshold_high: z.string().optional(),
  location_id: z.string().optional(),

  is_active: z.boolean().optional(),
});

export type SensorPayload = z.infer<typeof sensorSchema>;

export default function AddSensorPage({}: Props) {
  const router = useRouter();

  const form = useForm<SensorPayload>({
    resolver: zodResolver(sensorSchema),
    defaultValues: {
      name: "",
      key: "",
      latitude: "",
      longitude: "",
      unit: "",
      threshold_low: undefined,
      threshold_high: undefined,
      location_id: undefined,
      is_active: true,
    },
  });

  const { trigger, isMutating } = useApiMutation("/sensor");

  const onSubmit = async (values: SensorPayload) => {
    const payload = {
      ...values,
      threshold_low: values.threshold_low ? Number(values.threshold_low) : null,
      threshold_high: values.threshold_high
        ? Number(values.threshold_high)
        : null,
      location_id: values.location_id ? Number(values.location_id) : null,
    };
    try {
      await trigger({
        method: "POST",
        data: payload,
      });

      router.push("/sensors");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-5xl space-y-8 py-6">
      <h1 className="text-2xl font-semibold">Create Sensor</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sensor Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Sensor Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Key */}
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Latitude & Longitude */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Latitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Longitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Unit */}
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input placeholder="Unit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Location */}
            <FormField
              control={form.control}
              name="location_id"
              render={({ field }) => {
                const { data: locations, isLoading } = useAllLocation();
                return (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih lokasi" />
                        </SelectTrigger>

                        <SelectContent>
                          {isLoading && (
                            <SelectItem value="loading" disabled>
                              Loading...
                            </SelectItem>
                          )}

                          {locations?.map((loc) => (
                            <SelectItem key={loc.id} value={loc.id.toString()}>
                              {loc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Thresholds */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="threshold_low"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Threshold Low</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="threshold_high"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Threshold High</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Active Status */}
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-1">
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-2">
            <ButtonCancel href="/sensors" />
            <Button type="submit" disabled={isMutating}>
              {isMutating ? "Saving..." : "Create Sensor"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
