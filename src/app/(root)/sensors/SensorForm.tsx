"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { ButtonCancel } from "@/components/parts/ButtonCancel";
import { sensorSchema } from "@/schemas";
import { Location, SensorPayload } from "@/types";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/parts/MapPicker"), {
  ssr: false,
});

type Props = {
  onSubmit: (payload: SensorPayload) => void;
  defaultValues: SensorPayload;
  locations?: Location[]
  isMutating?: boolean;
  mode: "create" | "edit";
};

export function SensorForm({
  defaultValues,
  mode,
  locations,
  onSubmit,
  isMutating,
}: Props) {
  const form = useForm<SensorPayload>({
    resolver: zodResolver(sensorSchema),
    defaultValues,
  });

  return (
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

        <div className="space-y-4">
          {/* Map Picker */}
          <FormField
            control={form.control}
            name="latitude"
            render={() => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <MapPicker
                  value={{
                    lat: Number(form.getValues("latitude")) || 0,
                    lng: Number(form.getValues("longitude")) || 0,
                  }}
                  onChange={(pos) => {
                    form.setValue("latitude", pos.lat.toString());
                    form.setValue("longitude", pos.lng.toString());
                  }}
                />
              </FormItem>
            )}
          />

          {/* Display fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Latitude */}
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Longitude */}
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={(v) => field.onChange(Number(v))}
                  value={field.value ? String(field.value) : undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations?.map((loc) => (
                      <SelectItem key={loc.id} value={String(loc.id)}>
                        {loc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
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
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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

        <div className="flex items-center gap-x-3">
          <ButtonCancel href="/sensors" isLoading={isMutating} />
          <Button type="submit" disabled={isMutating}>
            {isMutating
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create Sensor"
                : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
