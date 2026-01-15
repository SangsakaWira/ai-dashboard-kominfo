"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { wasteSpotService } from "@/services/api.service";
import { WasteSpot } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const wasteSpotColumns: ColumnDef<WasteSpot>[] = [
    {
        id: "no",
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => (
            <div className="text-center">{row.index + 1}</div>
        ),
    },
    {
        accessorKey: "name",
        header: "Nama Titik",
    },
    {
        accessorKey: "waste_type",
        header: "Jenis Sampah",
        cell: ({ row }) => {
            const wasteType = row.original.waste_type;
            if (!wasteType) return <span className="text-muted-foreground">—</span>;
            return <span>{wasteType}</span>;
        },
    },
    {
        accessorKey: "severity",
        header: "Tingkat Keparahan",
        cell: ({ row }) => {
            const severity = row.original.severity;
            if (!severity) return <span className="text-muted-foreground">—</span>;

            const colorClass =
                severity === "parah" || severity === "berat"
                    ? "bg-red-600"
                    : severity === "sedang"
                        ? "bg-yellow-500"
                        : "bg-green-600";

            return <Badge className={colorClass}>{severity}</Badge>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status || "aktif";

            const colorClass =
                status === "dibersihkan"
                    ? "bg-green-600"
                    : status === "dalam_penanganan"
                        ? "bg-yellow-500"
                        : "bg-red-600";

            const labelMap: Record<string, string> = {
                aktif: "Aktif",
                dalam_penanganan: "Dalam Penanganan",
                dibersihkan: "Dibersihkan",
            };

            return <Badge className={colorClass}>{labelMap[status] || status}</Badge>;
        },
    },
    {
        accessorKey: "volume_estimate",
        header: "Estimasi Volume",
        cell: ({ row }) => {
            const volume = row.original.volume_estimate;
            if (!volume) return <span className="text-muted-foreground">—</span>;
            return <span>{volume}</span>;
        },
    },
    {
        accessorKey: "description",
        header: "Deskripsi",
        cell: ({ row }) => {
            const desc = row.original.description ?? "";
            if (!desc) return <span className="text-muted-foreground">—</span>;

            const short =
                desc.length > 50 ? desc.slice(0, 50).trimEnd() + "…" : desc;

            return <span title={desc}>{short}</span>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const wasteSpot = row.original;

            return (
                <ActionCell
                    edit={`/waste-spot/edit/${wasteSpot.id}`}
                    pathDelete={wasteSpotService.list}
                    itemId={wasteSpot.id}
                    detail={`/waste-spot/${wasteSpot.id}`}
                />
            );
        },
    },
];
