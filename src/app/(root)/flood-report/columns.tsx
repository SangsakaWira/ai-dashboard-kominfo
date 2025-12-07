"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { floodReportService } from "@/services/api.service";
import { FloodReport } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";

export const floodReportColumns: ColumnDef<FloodReport>[] = [
    {
    id: "no",
    header: () => <div className="text-center">No</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div>
    ),
  },
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
    accessorKey: "reporter_name",
    header: "Reported by",
  },
  {
    accessorKey: "reporter_phone",
    header: "Reporter phone",
  },
  {
    accessorKey: "depth",
    header: "Kedalaman (cm)",
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
    header: "Created at",
    cell: ({ row }) => (
      <p>
        {formatDistanceToNow(new Date(row.original.created_at), {
          addSuffix: true,
        })}
      </p>
    ),
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
