"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useWasteSpot } from "@/hooks/waste-spot";
import { wasteSpotColumns } from "./columns";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { SelectFilter } from "@/components/parts/SelectFilter";
import { SortFilter } from "@/components/parts/SortFilter";

type Props = {};

export default function WasteSpotPage({ }: Props) {
    const { page, setPage, limit, setLimit } = usePaginationParams(1, 10);
    const [filters, setFilters] = useState<{
        severity?: string;
        waste_type?: string;
        status?: string;
        created?: string;
    }>({});
    const {
        data = [],
        isLoading,
        meta,
        links,
    } = useWasteSpot({
        page,
        limit,
        sort: filters.created,
        severity: filters.severity,
        waste_type: filters.waste_type,
        status: filters.status,
    });

    return (
        <div>
            <div className="grid grid-cols-1 gap-6">
                <Card className="bg-card border">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                                <Trash2 className="mr-2 h-5 w-5" />
                                Titik Rawan Sampah
                            </CardTitle>
                            <Button>
                                <Link href={"/waste-spot/add"}>Tambah Titik Baru</Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <SelectFilter
                                value={filters.waste_type ?? "all"}
                                onChange={(v) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        waste_type: v === "all" ? undefined : v,
                                    }))
                                }
                                placeholder="Jenis Sampah"
                                allLabel="Semua Jenis"
                                options={[
                                    { label: "Organik", value: "organik" },
                                    { label: "Anorganik", value: "anorganik" },
                                    { label: "B3", value: "b3" },
                                    { label: "Campuran", value: "campuran" },
                                ]}
                            />
                            <SelectFilter
                                value={filters.severity ?? "all"}
                                onChange={(v) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        severity: v === "all" ? undefined : v,
                                    }))
                                }
                                placeholder="Keparahan"
                                allLabel="Semua Keparahan"
                                options={[
                                    { label: "Ringan", value: "ringan" },
                                    { label: "Sedang", value: "sedang" },
                                    { label: "Berat", value: "berat" },
                                ]}
                            />
                            <SelectFilter
                                value={filters.status ?? "all"}
                                onChange={(v) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        status: v === "all" ? undefined : v,
                                    }))
                                }
                                placeholder="Status"
                                allLabel="Semua Status"
                                options={[
                                    { label: "Aktif", value: "aktif" },
                                    { label: "Dalam Penanganan", value: "dalam_penanganan" },
                                    { label: "Dibersihkan", value: "dibersihkan" },
                                ]}
                            />
                            <SortFilter
                                value={filters.created}
                                onChange={(sortObj) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        created: sortObj.created,
                                    }))
                                }
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={wasteSpotColumns}
                            data={data}
                            loading={isLoading}
                            currentPage={meta?.currentPage ?? 1}
                            totalPages={meta?.totalPages ?? 1}
                            hasNext={!!links?.next}
                            hasPrev={!!links?.prev}
                            onPageChange={setPage}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
