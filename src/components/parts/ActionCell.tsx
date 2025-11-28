"use client";
import { MoreHorizontalIcon } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {detail && (
              <DropdownMenuItem onClick={() => router.push(detail)}>View Detail</DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => router.push(edit)}>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive hover:!text-destructive hover:!bg-destructive/15" onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
