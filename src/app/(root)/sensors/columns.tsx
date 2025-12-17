"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { Sensor } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

const sensorLabelMap: Record<string, string> = {
  water_level: "Water Level",
  temperature_sensor: "Temperature",
  rainfall: "Rainfall",
  humidity: "Humidity",
  battery: "Battery",
};

const sensorTypeColorMap: Record<string, string> = {
  water_level: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  temperature_sensor: "bg-red-500/20 text-red-300 border-red-500/40",
  rainfall: "bg-sky-500/20 text-sky-300 border-sky-500/40",
  humidity: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  battery: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
};

function formatSensorLabel(key?: string | null) {
  if (!key) return "-";
  if (sensorLabelMap[key]) return sensorLabelMap[key];
  const cleaned = key.replace(/[-_]+/g, " ");
  return cleaned
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function getSensorTypeBadgeClass(key?: string | null) {
  if (!key) {
    return "bg-slate-500/20 text-slate-200 border-slate-500/40";
  }

  return sensorTypeColorMap[key] ?? "bg-slate-500/20 text-slate-200 border-slate-500/40";
}

export const sensorColumns: ColumnDef<Sensor>[] = [
  {
    id: "no",
    header: () => <div className="text-center">No</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: "photo_url",
    header: "Image",
    cell: ({ row }) => {
      const sensor = row.original;
      return (
        <>
          {sensor.image_url ? (
            <img src={sensor.image_url} className="h-12 w-20 rounded-md object-cover border" />
          ) : (
            <span className="text-muted-foreground text-xs">No Photo</span>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Sensor Name",
  },
  {
    accessorKey: "key",
    header: "Type",
    cell: ({ row }) => (
      <Badge className={getSensorTypeBadgeClass(row.original.key)}>{formatSensorLabel(row.original.key)}</Badge>
    ),
  },
  {
    accessorKey: "codenumber",
    header: "Code Number",
    cell: ({ row }) => <div>{row.original.codenumber || "-"}</div>,
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => <div>{row.original.unit || "-"}</div>,
  },
  {
    accessorKey: "latest_value",
    header: "Latest Reading",
    cell: ({ row }) => {
      const value = row.original.latest_value as number | string | null | undefined;
      if (value === null || value === undefined || value === "") {
        return <div>-</div>;
      }
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "threshold_low",
    header: "Threshold (Low)",
    cell: ({ row }) => {
      const value = row.original.threshold_low as number | string | null | undefined;
      if (value === null || value === undefined || value === "") {
        return <div>-</div>;
      }
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "threshold_high",
    header: "Threshold (High)",
    cell: ({ row }) => {
      const value = row.original.threshold_high as number | string | null | undefined;
      if (value === null || value === undefined || value === "") {
        return <div>-</div>;
      }
      return <div>{value}</div>;
    },
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
