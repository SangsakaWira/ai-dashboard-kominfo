import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  showDeleteDialog: boolean;
  setShowDeleteDialog: (open: boolean) => void;
  onAction?: () => void;
  title?: string;
  description?: string;
  button_action?: string;
  isLoading?: boolean;
};

export default function AlertAction({
  showDeleteDialog,
  setShowDeleteDialog,
  onAction,
  isLoading = false,
  button_action = "Delete",
  title = "Delete Item",
  description = "Deleting this item is permanent and cannot be undone. All related content will be removed."
}: Props) {
  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={onAction} disabled={isLoading}>
            {isLoading ? "Loading.." : button_action}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}