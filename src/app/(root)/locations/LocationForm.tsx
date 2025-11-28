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
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import {
  LocationPayload,
  locationSchema,
} from "@/schemas";
import { ButtonCancel } from "@/components/parts/ButtonCancel";

type Props = {
  onSubmit: (payload: LocationPayload) => void;
  defaultValues: LocationPayload;
//   locations: Location[];
  isMutating?: boolean;
  mode: "create" | "edit";
};

export function LocationForm({
  onSubmit,
  defaultValues,
//   locations,
  isMutating = false,
  mode,
}: Props) {
  const form = useForm<LocationPayload>({
    resolver: zodResolver(locationSchema),
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Latitude */}
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input placeholder="-2.98..." {...field} />
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
                  <Input placeholder="104.74..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Depth */}
          <FormField
            control={form.control}
            name="capacity_building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity Building</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Capacity Building"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Longitude */}
          <FormField
            control={form.control}
            name="zone_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone Type</FormLabel>
                <FormControl>
                  <Input placeholder="Zone Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tulis deskripsi laporan..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-x-3">
          <ButtonCancel href="/locations" />
          <Button type="submit" disabled={isMutating}>
            {isMutating
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create Location"
                : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
