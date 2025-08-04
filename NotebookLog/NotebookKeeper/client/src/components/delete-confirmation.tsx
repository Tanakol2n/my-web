import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { type Notebook } from "@shared/schema";

interface DeleteConfirmationProps {
  isOpen: boolean;
  notebook: Notebook | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function DeleteConfirmation({
  isOpen,
  notebook,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteConfirmationProps) {
  if (!notebook) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            Confirm Deletion
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this notebook entry? This action cannot be undone.
          </p>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-900">{notebook.assetCode}</p>
            <p className="text-sm text-gray-600">{notebook.model}</p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={onConfirm} 
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
