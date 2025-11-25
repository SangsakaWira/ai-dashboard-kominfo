"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { Sensor } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const sensorColumns: ColumnDef<Sensor>[] = [
  {
    accessorKey: "name",
    header: "Sensor Name",
  },
  {
    accessorKey: "key",
    header: "Key",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "threshold_low",
    header: "Threshold (Low)",
  },
  {
    accessorKey: "threshold_high",
    header: "Threshold (High)",
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          className={row.original.is_active ? "bg-green-500" : ""}
          variant={!row.original.is_active ? "destructive" : "default"}
        >
          Active
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sensor = row.original;

      return (
        <ActionCell
          edit={`/sensors/edit/${sensor.id}`}
          pathDelete={`/sensor`}
          itemId={sensor.id}
          detail={`/sensors/${sensor.id}`}
        />
      );
    },
  },
];
