
import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

export default function ConfirmDialog({ open, onOpenChange, onConfirm, onCancel, title = "Are you sure?", description = "This action cannot be undone.", confirmText = "Delete", cancelText = "Cancel" }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto">
          <DialogTitle className="text-lg font-bold mb-2">{title}</DialogTitle>
          <div className="mb-4 text-gray-600">{description}</div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">{cancelText}</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">{confirmText}</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
