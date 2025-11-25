"use client";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import AlertAction from "./AlertAction";
import { useRemove } from "@/hooks/useRemove";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface ActionCellProps {
  // onEdit: () => void;
  // onDelete: () => void;
  edit: string;
  pathDelete: string;
  itemId: number;
  detail?: string;
}

export const ActionCell = ({
  edit,
  pathDelete,
  itemId,
  detail,
}: ActionCellProps) => {
  const [openAlert, setOpenAlert] = React.useState(false);
  const router = useRouter();
  const removeItem = useRemove(pathDelete, itemId);

  const handleDelete = async () => {
    await removeItem.remove();
    setOpenAlert(false);
  };
  return (
    <>
      <div className="flex items-center gap-2">
        {detail && (
          <TooltipComp content="See Detail">
            <Button onClick={() => router.push(detail)} size={"sm"}>
              <Eye size={16} />
            </Button>
          </TooltipComp>
        )}
        <TooltipComp content="Edit">
          <Button
            onClick={() => router.push(edit)}
            variant={"secondary"}
            size={"sm"}
          >
            <Pencil size={16} />
          </Button>
        </TooltipComp>
        <TooltipComp content="Delete">
          <Button
            onClick={() => setOpenAlert(true)}
            variant={"destructive"}
            size={"sm"}
          >
            <Trash2 size={16} />
          </Button>
        </TooltipComp>
      </div>
      <AlertAction
        showDeleteDialog={openAlert}
        setShowDeleteDialog={setOpenAlert}
        onAction={handleDelete}
      />
    </>
  );
};

const TooltipComp = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
