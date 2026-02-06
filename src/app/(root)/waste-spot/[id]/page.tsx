"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWasteSpotDetail } from "@/hooks/waste-spot";
import { Trash2, MapPin, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/components/parts/LocationMap"), {
    ssr: false,
});

export default function WasteSpotDetailPage() {
    const params = useParams();
    const id = Number(params.id);
    const router = useRouter();
    const { data: wasteSpot, isLoading } = useWasteSpotDetail(id);

    if (isLoading) {
        return (
            <div className="container mx-auto py-6">
                <Card className="bg-card border">
                    <CardHeader>
                        <Skeleton className="h-8 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-20 w-full" />
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

    const severityColor =
        wasteSpot.severity === "berat" || wasteSpot.severity === "parah"
            ? "bg-red-600"
            : wasteSpot.severity === "sedang"
                ? "bg-yellow-500"
                : "bg-green-600";

    const statusColor =
        wasteSpot.status === "dibersihkan"
            ? "bg-green-600"
            : wasteSpot.status === "dalam_penanganan"
                ? "bg-yellow-500"
                : "bg-red-600";

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold">Detail Titik Rawan Sampah</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Info Card */}
                <Card className="bg-card border">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Trash2 className="mr-2 h-5 w-5" />
                            {wasteSpot.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Jenis Sampah</p>
                                <p className="font-medium">{wasteSpot.waste_type || "-"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Estimasi Volume</p>
                                <p className="font-medium">{wasteSpot.volume_estimate || "-"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tingkat Keparahan</p>
                                {wasteSpot.severity ? (
                                    <Badge className={severityColor}>{wasteSpot.severity}</Badge>
                                ) : (
                                    <span>-</span>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                {wasteSpot.status ? (
                                    <Badge className={statusColor}>{wasteSpot.status}</Badge>
                                ) : (
                                    <span>-</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Koordinat</p>
                            <p className="font-medium flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {wasteSpot.latitude}, {wasteSpot.longitude}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Deskripsi</p>
                            <p className="font-medium">{wasteSpot.description || "-"}</p>
                        </div>

                        {wasteSpot.image_url && (
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Gambar</p>
                                <img
                                    src={wasteSpot.image_url}
                                    alt={wasteSpot.name}
                                    className="rounded-lg max-h-64 object-cover"
                                />
                            </div>
                        )}

                        <div className="flex gap-2 pt-4">
                            <Button asChild>
                                <Link href={`/waste-spot/edit/${wasteSpot.id}`}>Edit</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/waste-spot">Kembali ke Daftar</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Map Card */}
                <Card className="bg-card border">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <MapPin className="mr-2 h-5 w-5" />
                            Lokasi
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] rounded-lg overflow-hidden">
                            <LocationMap
                                data={{
                                    latitude: wasteSpot.latitude,
                                    longitude: wasteSpot.longitude,
                                    name: wasteSpot.name,
                                    status: wasteSpot.status,
                                    description: wasteSpot.description,
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
