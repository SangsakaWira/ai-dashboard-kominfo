"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WasteSpotForm } from "../../WasteSpotForm";
import { useUpdateWasteSpot, useWasteSpotDetail } from "@/hooks/waste-spot";
import { WasteSpotSchemaPayload } from "@/schemas";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditWasteSpotPage() {
    const params = useParams();
    const id = Number(params.id);
    const router = useRouter();
    const { data: wasteSpot, isLoading } = useWasteSpotDetail(id);
    const { updateWasteSpot, isMutating } = useUpdateWasteSpot(id);

    const handleSubmit = async (payload: WasteSpotSchemaPayload) => {
        try {
            await updateWasteSpot(payload);
            toast.success("Titik rawan sampah berhasil diperbarui");
            router.push("/waste-spot");
        } catch (error) {
            toast.error("Gagal memperbarui titik rawan sampah");
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-6">
                <Card className="bg-card border">
                    <CardHeader>
                        <Skeleton className="h-8 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!wasteSpot) {
        return (
            <div className="container mx-auto py-6">
                <Card className="bg-card border">
                    <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground">Data tidak ditemukan</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const defaultValues: WasteSpotSchemaPayload = {
        name: wasteSpot.name || "",
        latitude: wasteSpot.latitude || "",
        longitude: wasteSpot.longitude || "",
        severity: wasteSpot.severity || "",
        waste_type: wasteSpot.waste_type || "",
        volume_estimate: wasteSpot.volume_estimate || "",
        status: wasteSpot.status || "aktif",
        description: wasteSpot.description || "",
        image_url: wasteSpot.image_url || "",
    };

    return (
        <div className="container mx-auto py-6">
            <Card className="bg-card border">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Trash2 className="mr-2 h-5 w-5" />
                        Edit Titik Rawan Sampah
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <WasteSpotForm
                        onSubmit={handleSubmit}
                        defaultValues={defaultValues}
                        isMutating={isMutating}
                        mode="edit"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
