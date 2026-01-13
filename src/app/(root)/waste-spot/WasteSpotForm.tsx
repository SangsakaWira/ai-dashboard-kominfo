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
import { WasteSpotSchemaPayload, wasteSpotSchema } from "@/schemas";
import { ButtonCancel } from "@/components/parts/ButtonCancel";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/parts/MapPicker"), {
    ssr: false,
});

type Props = {
    onSubmit: (payload: WasteSpotSchemaPayload) => void;
    defaultValues: WasteSpotSchemaPayload;
    isMutating?: boolean;
    mode: "create" | "edit";
};

export function WasteSpotForm({
    onSubmit,
    defaultValues,
    isMutating = false,
    mode,
}: Props) {
    const form = useForm<WasteSpotSchemaPayload>({
        resolver: zodResolver(wasteSpotSchema),
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

                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Titik Rawan Sampah</FormLabel>
                            <FormControl>
                                <Input placeholder="Nama titik" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Waste Type Select */}
                    <FormField
                        control={form.control}
                        name="waste_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jenis Sampah</FormLabel>
                                <Select
                                    onValueChange={(v) => field.onChange(v)}
                                    value={field.value ? String(field.value) : undefined}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis sampah" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"organik"}>Organik</SelectItem>
                                        <SelectItem value={"anorganik"}>Anorganik</SelectItem>
                                        <SelectItem value={"b3"}>B3 (Berbahaya)</SelectItem>
                                        <SelectItem value={"campuran"}>Campuran</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Severity Select */}
                    <FormField
                        control={form.control}
                        name="severity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tingkat Keparahan</FormLabel>
                                <Select
                                    onValueChange={(v) => field.onChange(v)}
                                    value={field.value ? String(field.value) : undefined}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tingkat keparahan" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"ringan"}>Ringan</SelectItem>
                                        <SelectItem value={"sedang"}>Sedang</SelectItem>
                                        <SelectItem value={"berat"}>Berat</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Volume Estimate */}
                    <FormField
                        control={form.control}
                        name="volume_estimate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estimasi Volume</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Contoh: 5 m³"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Status Select */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={(v) => field.onChange(v)}
                                    value={field.value ? String(field.value) : undefined}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"aktif"}>Aktif</SelectItem>
                                        <SelectItem value={"dalam_penanganan"}>Dalam Penanganan</SelectItem>
                                        <SelectItem value={"dibersihkan"}>Dibersihkan</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Image URL */}
                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL Gambar</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
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
                                <Textarea placeholder="Tulis deskripsi titik rawan sampah..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-x-3">
                    <ButtonCancel href="/waste-spot" isLoading={isMutating} />
                    <Button type="submit" disabled={isMutating}>
                        {isMutating
                            ? mode === "create"
                                ? "Menyimpan..."
                                : "Menyimpan..."
                            : mode === "create"
                                ? "Buat Titik Rawan Sampah"
                                : "Simpan Perubahan"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
