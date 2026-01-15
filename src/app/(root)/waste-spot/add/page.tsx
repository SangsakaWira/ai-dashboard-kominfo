"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WasteSpotForm } from "../WasteSpotForm";
import { useCreateWasteSpot } from "@/hooks/waste-spot";
import { WasteSpotSchemaPayload } from "@/schemas";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddWasteSpotPage() {
    const router = useRouter();
    const { createWasteSpot, isMutating } = useCreateWasteSpot();

    const handleSubmit = async (payload: WasteSpotSchemaPayload) => {
        try {
            await createWasteSpot(payload);
            toast.success("Titik rawan sampah berhasil ditambahkan");
            router.push("/waste-spot");
        } catch (error) {
            toast.error("Gagal menambahkan titik rawan sampah");
            console.error(error);
        }
    };

    const defaultValues: WasteSpotSchemaPayload = {
        name: "",
        latitude: "",
        longitude: "",
        severity: "",
        waste_type: "",
        volume_estimate: "",
        status: "aktif",
        description: "",
        image_url: "",
    };

    return (
        <div className="container mx-auto py-6">
            <Card className="bg-card border">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Trash2 className="mr-2 h-5 w-5" />
                        Tambah Titik Rawan Sampah
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <WasteSpotForm
                        onSubmit={handleSubmit}
                        defaultValues={defaultValues}
                        isMutating={isMutating}
                        mode="create"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
