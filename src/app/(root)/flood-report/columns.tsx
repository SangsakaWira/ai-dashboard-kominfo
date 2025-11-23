"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { floodReportService } from "@/services/api.service";
import { FloodReport } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const floodReportColumns: ColumnDef<FloodReport>[] = [
  {
    accessorKey: "photo_url",
    header: "Image",
    cell: ({ row }) => {
      const flood = row.original;
      return (
        <>
          {flood.photo_url ? (
            <img
              src={flood.photo_url}
              className="h-12 w-20 rounded-md object-cover border"
            />
          ) : (
            <span className="text-muted-foreground text-xs">No Photo</span>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const flood = row.original;
      return (
        <Badge
          className={
            flood.status === "pending"
              ? "bg-yellow-500"
              : flood.status === "approved"
                ? "bg-green-600"
                : "bg-red-600"
          }
        >
          {flood.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({row}) => (
    <p>{new Date(row.original.created_at).toLocaleString("id-ID")}</p>)
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const flood = row.original;

      return (
        <ActionCell
          edit={`/flood-report/edit/${flood.id}`}
          pathDelete={floodReportService.list}
          itemId={flood.id}
          detail={`/flood-report/${flood.id}`}
        />
      );
    },
  },
];
