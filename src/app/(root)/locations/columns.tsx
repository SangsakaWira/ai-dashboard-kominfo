"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { floodSpotService, locationService } from "@/services/api.service";
import { Location } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const locationsColumns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: "Location",
  },
  {
    accessorKey: "zone_type",
    header: "Zone Type",
    cell: ({ row }) => {
      const location = row.original;
      return <p className="capitalize">{location.zone_type}</p>;
    },
  },
  {
    accessorKey: "capacity_building",
    header: "Capacity Building",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const location = row.original;

      return (
        <ActionCell
          edit={`/locations/edit/${location.id}`}
          pathDelete={locationService.list}
          itemId={location.id}
          // detail={`/flood-spot/${flood.id}`}
        />
      );
    },
  },
];
