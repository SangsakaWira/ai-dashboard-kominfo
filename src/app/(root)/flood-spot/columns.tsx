"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { floodSpotService } from "@/services/api.service";
import { FloodSpot } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const floodSpotColumns: ColumnDef<FloodSpot>[] = [
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const flood = row.original;
      return (
        <Badge
          className={
            flood.severity === "sedang"
              ? "bg-yellow-500"
              : flood.severity === "ringan"
                ? "bg-green-600"
                : "bg-red-600"
          }
        >
          {flood.severity}
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
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "description",
    header: "Description",
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
