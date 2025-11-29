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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CctvPayload, cctvSchema } from "@/schemas";
import { ButtonCancel } from "@/components/parts/ButtonCancel";
import { MapPicker } from "@/components/parts/MapPicker";
import { CCTVPayload } from "@/types";

type Props = {
  onSubmit: (payload: CCTVPayload) => void;
  defaultValues: CCTVPayload;
  isMutating?: boolean;
  mode: "create" | "edit";
};

export function CctvForm({
  defaultValues,
  mode,
  onSubmit,
  isMutating,
}: Props) {
  const form = useForm<CctvPayload>({
    resolver: zodResolver(cctvSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="CCTV Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stream URL */}
          <FormField
            control={form.control}
            name="stream_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stream URL</FormLabel>
                <FormControl>
                  <Input placeholder="Stream URL" {...field} />
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
          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="public-area">Public Area</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location Name */}
        <FormField
          control={form.control}
          name="location_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-2">
          <ButtonCancel href="/cctv" />
          <Button type="submit" disabled={isMutating}>
            {isMutating
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create CCTV"
                : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
