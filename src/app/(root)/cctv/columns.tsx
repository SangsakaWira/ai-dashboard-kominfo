"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { CCTV } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const cctvColumns: ColumnDef<CCTV>[] = [
  {
    accessorKey: "name",
    header: "CCTV Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          className={
            row.original.status === "online" ? "bg-green-500" : "bg-red-500"
          }
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "location_name",
    header: "Location",
  },
  // {
  //   accessorKey: "latitude",
  //   header: "Latitude",
  // },
  // {
  //   accessorKey: "longitude",
  //   header: "Longtitude",
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const cctv = row.original;

      return (
        <ActionCell
          edit={`/cctv/edit/${cctv.id}`}
          pathDelete={`/cctv`}
          itemId={cctv.id}
        />
      );
    },
  },
];
