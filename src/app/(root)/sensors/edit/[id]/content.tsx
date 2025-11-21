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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAllLocation } from "@/hooks/locations";

type Props = {
  id: string;
};

const sensorSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  key: z.string().min(1, "Key wajib diisi"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  unit: z.string().optional(),
  threshold_low: z.number().optional(),
  threshold_high: z.number().optional(),
  location_id: z.number().optional(),
  is_active: z.boolean().optional(),
});

type SensorFormType = z.infer<typeof sensorSchema>;

export function EditSensorContent({ id }: Props) {
  const { data: sensor, isLoading } = useSensorDetail(Number(id));
  const { updateSensor, isMutating } = useUpdateSensor(Number(id));
  const router = useRouter();

  const form = useForm<SensorFormType>({
    // resolver: zodResolver(sensorSchema),
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

  React.useEffect(() => {
    if (sensor) {
      form.reset({
        name: sensor.name ?? "",
        key: sensor.key ?? "",
        latitude: sensor.latitude ?? "",
        longitude: sensor.longitude ?? "",
        unit: sensor.unit ?? "",
        threshold_low: sensor.threshold_low ?? "",
        threshold_high: sensor.threshold_high ?? "",
        location_id: sensor.location_id ?? "",
        is_active: sensor.is_active ?? true,
      });
    }
  }, [sensor, form]);

  const onSubmit = async (values: SensorFormType) => {
    await updateSensor(values);
    router.push("/sensors");
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-8 py-6">
      <h1 className="text-2xl font-semibold">Edit Sensor</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          {/* Location */}
          <FormField
            control={form.control}
            name="location_id"
            render={({ field }) => {
              const { data: locations, isLoading } = useAllLocation();
              console.log(field.value)
              return (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value ? field.value.toString() : undefined}
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

          {/* Active Status */}
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between border p-3 rounded-lg">
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

          <Button type="submit" disabled={isMutating} className="w-full">
            {isMutating ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
