"use client";

import { ActionCell } from "@/components/parts/ActionCell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMarkRead, useRemoveAlert } from "@/hooks/alerts";
import { Alert } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { TrashIcon } from "lucide-react";

const getLevelColor = (level: string) => {
  switch (level) {
    case "danger":
      return "bg-red-600 text-white";
    case "warning":
      return "bg-yellow-500 text-black";
    default:
      return "bg-blue-500 text-white";
  }
};

export const alertColumns: ColumnDef<Alert>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = row.original.level;
      return (
        <Badge className={getLevelColor(level)}>{level.toUpperCase()}</Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <span>
          {formatDistanceToNow(new Date(row.original.created_at), {
            addSuffix: true,
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const alert = row.original;

      const { updateRead, isMutating } = useMarkRead(alert.id);
      const { deleteAlert, isMutating: deleteMutating } = useRemoveAlert(
        alert.id
      );

      const markRead = async () => {
        await updateRead();
      };

      const handleDelete = async () => {
        await deleteAlert();
      };

      // if () {
      //   return
      // }

      return (
        <div className="flex items-center gap-x-2">
          {alert.is_read ? (
            <Badge variant="outline">Read</Badge>
          ) : (
            <Button size="sm" onClick={markRead} disabled={isMutating}>
              {isMutating ? "..." : "Mark as Read"}
            </Button>
          )}
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={handleDelete}
            disabled={deleteMutating}
          >
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
