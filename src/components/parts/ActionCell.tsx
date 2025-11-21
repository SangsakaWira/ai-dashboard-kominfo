'use client'
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import AlertAction from "./AlertAction";
import { useRemove } from "@/hooks/useRemove";

interface ActionCellProps {
  // onEdit: () => void;
  // onDelete: () => void;
  edit: string
  pathDelete: string
  itemId: number
}

export const ActionCell = ({ edit, pathDelete, itemId }: ActionCellProps) => {
  const [openAlert, setOpenAlert] = React.useState(false);
  const router = useRouter()
  const removeItem = useRemove(pathDelete, itemId)

  const handleDelete = async () => {
    await removeItem.remove()
    setOpenAlert(false);
  };
  return (
    <>
    <div className="flex items-center gap-2">
      <Button onClick={() => router.push(edit)} variant={"secondary"} size={"sm"}>
        <Pencil size={16} />
      </Button>
      <Button onClick={() => setOpenAlert(true)} variant={"destructive"} size={"sm"}>
        <Trash2 size={16} />
      </Button>
    </div>
    <AlertAction showDeleteDialog={openAlert} setShowDeleteDialog={setOpenAlert} onAction={handleDelete} />
    </>
  );
};
