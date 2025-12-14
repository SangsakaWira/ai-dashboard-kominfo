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
import { CCTVPayload } from "@/types";
import dynamic from "next/dynamic";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

const MapPicker = dynamic(() => import("@/components/parts/MapPicker"), {
  ssr: false,
});

type Props = {
  onSubmit: (payload: CCTVPayload) => void;
  defaultValues: CCTVPayload;
  isMutating?: boolean;
  mode: "create" | "edit";
};

export function CctvForm({ defaultValues, mode, onSubmit, isMutating }: Props) {
  const form = useForm<any>({
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
                <FormLabel>Nama</FormLabel>
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
                {/* <FormLabel>Stream URL (Youtube: https://youtube.com/embed/[code]?autoplay=1&mute=1&controls=1)</FormLabel> */}
                <FormLabel className="flex items-center gap-x-1 !mb-[1.1rem]">
                  <span>Stream URL</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon size={14} className="text-neutral-300" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Example:
                          https://youtube.com/embed/[code]?autoplay=1&mute=1&controls=1
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example https://youtube.com/embed/[code]?..."
                    {...field}
                  />
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
                <FormLabel>Lokasi</FormLabel>
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
          {/* <FormField
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
          /> */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="Catatan kondisi jalan, cuaca, atau info penting lain..."
                    {...field}
                  />
                </FormControl>
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
                <FormLabel>Kategori</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <FormLabel>Status Perangkat</FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {field.value ? "Aktif (online)" : "Tidak aktif (offline)"}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="resolution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resolusi</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ""} // biar nggak undefined
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih resolution" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1080p">1080p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Name */}
        <FormField
          control={form.control}
          name="location_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lokasi</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-2">
          <ButtonCancel href="/cctv" isLoading={isMutating} />
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
