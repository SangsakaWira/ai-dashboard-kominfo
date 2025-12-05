"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { floodSpotService } from "@/services/api.service";
import { FloodSpot } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const floodSpotColumns: ColumnDef<FloodSpot>[] = [
  {
    id: "no",
    header: () => <div className="text-center">No</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div>
  ),
  },
  {
    accessorKey: "name",
    header: "Titik Banjir",
  },
//   {
//     accessorKey: "severity",
//     header: "Severity",
//     cell: ({ row }) => {
//       const flood = row.original;
//       return (
//         <Badge
//           className={
//             flood.severity === "sedang"
//               ? "bg-yellow-500"
//               : flood.severity === "ringan"
//                 ? "bg-green-600"
//                 : "bg-red-600"
//           }
//         >
//           {flood.severity}
//         </Badge>
//       );
//     },
//   },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status, severity } = row.original;

      // status utama dari BE
      const effectiveStatus = (status || "normal") as
        | "normal"
        | "warning"
        | "danger";

      const labelMap: Record<typeof effectiveStatus, string> = {
        normal: "Normal",
        warning: "Peringatan",
        danger: "Bahaya",
      };

      const colorClass =
        effectiveStatus === "danger"
          ? "bg-red-600"
          : effectiveStatus === "warning"
          ? "bg-yellow-500"
          : "bg-green-600";

      return (
        <Badge className={colorClass}>
          {labelMap[effectiveStatus]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "depth",
    header: "Depth",
    cell: ({row}) => {
        const flood = row.original
        return <p>{flood.depth} cm</p>
    }
  },
//   {
//     accessorKey: "source",
//     header: "Source",
//   },
//   {
//     accessorKey: "description",
//     header: "Description",
//   },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      const desc = row.original.description ?? "";
      if (!desc) return <span className="text-muted-foreground">—</span>;

      const short =
        desc.length > 60 ? desc.slice(0, 60).trimEnd() + "…" : desc;

      return <span title={desc}>{short}</span>;
    },
  },
//   {
//     accessorKey: "created_at",
//     header: "Date",
//     cell: ({row}) => (
//     <p>{new Date(row.original.created_at).toLocaleString("id-ID")}</p>)
//   },
  {
    id: "actions",
    cell: ({ row }) => {
      const flood = row.original;

      return (
        <ActionCell
          edit={`/flood-spot/edit/${flood.id}`}
          pathDelete={floodSpotService.list}
          itemId={flood.id}
          detail={`/flood-spot/${flood.id}`}
        />
      );
    },
  },
];
