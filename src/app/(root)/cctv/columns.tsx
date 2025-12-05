"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { CCTV } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const cctvColumns: ColumnDef<CCTV>[] = [
{
    id: "no",
    header: () => <div className="text-center">No</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "CCTV Name",
  },

  {
    accessorKey: "resolution",
    header: "Resolution",
    cell: ({ row }) => (
      <span>{row.original.resolution || "-"}</span>
    ),
  },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       return (
//         <Badge
//           className={
//             row.original.status === "online" ? "bg-green-500" : "bg-red-500"
//           }
//         >
//           {row.original.status}
//         </Badge>
//       );
//     },
//   },
 {
    id: "status",
    header: "Status Perangkat",
    cell: ({ row }) => {
      const isActive = row.original.is_active;

      return (
        <Badge className={isActive ? "bg-green-500" : "bg-red-500"}>
          {isActive ? "Aktif" : "Tidak Aktif"}
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.original.description || "";
      if (!desc) return <span className="text-muted-foreground">—</span>;

      const short =
        desc.length > 60 ? desc.slice(0, 60).trimEnd() + "…" : desc;

      return <span title={desc}>{short}</span>;
    },
  },
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
