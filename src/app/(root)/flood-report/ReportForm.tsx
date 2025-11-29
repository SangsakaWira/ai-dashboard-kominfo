"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
import { FloodReportPayload, Location } from "@/types";
import { ReportPayload, reportSchema } from "@/schemas";
import { uploadFile } from "@/hooks/requestHelper";
import { ButtonCancel } from "@/components/parts/ButtonCancel";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/parts/MapPicker"), {
  ssr: false,
});

type Props = {
  onSubmit: (payload: FloodReportPayload) => void;
  defaultValues: FloodReportPayload;
  locations: Location[];
  isMutating?: boolean;
  mode: "create" | "edit";
};

export function ReportForm({
  onSubmit,
  defaultValues,
  locations,
  isMutating = false,
  mode,
}: Props) {
  const form = useForm<ReportPayload>({
    resolver: zodResolver(reportSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          {/* Location Select */}
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

          {/* Source */}
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reporter Name */}
          <FormField
            control={form.control}
            name="reporter_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pelapor</FormLabel>
                <FormControl>
                  <Input placeholder="Nama lengkap..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reporter Phone */}
          <FormField
            control={form.control}
            name="reporter_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No Telepon</FormLabel>
                <FormControl>
                  <Input placeholder="08xxxx..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea placeholder="Tulis deskripsi laporan..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Photo URL */}
        <FormField
          control={form.control}
          name="photo_url"
          render={({ field }) => (
            <FormItem className="w-fit">
              <FormLabel>Foto</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  // disabled={isUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    field.onChange(file);

                    const res = await uploadFile(file);

                    form.setValue("photo_url", res.data.secure_url);
                  }}
                />
              </FormControl>

              {form.watch("photo_url") && (
                <img
                  src={form.watch("photo_url")}
                  className="h-32 w-32 mt-2 rounded-md object-cover"
                />
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-2">
          <ButtonCancel href="/flood-report" />
          <Button type="submit" disabled={isMutating}>
            {isMutating
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create Report"
                : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
