import React from "react";
import { FaCog } from "react-icons/fa";

export default function SettingsModal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
          aria-label="Close settings"
        >
          &times;
        </button>
        <div className="flex items-center gap-2 mb-4">
          <FaCog className="text-2xl text-blue-600" />
          <h2 className="text-lg font-bold">Settings</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
