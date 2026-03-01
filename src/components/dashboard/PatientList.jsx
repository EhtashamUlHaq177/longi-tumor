

import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import ConfirmDialog from "../ui/ConfirmDialog";

export default function PatientList({ patients, selectedPatient, setSelectedPatient, setAnalysisResult, editPatientId, setEditPatientId, editAge, setEditAge, handleUpdateAge, handleDeletePatient, setShowPatientModal }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleDeleteClick = (e, patientId) => {
    e.stopPropagation();
    setPendingDeleteId(patientId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      handleDeletePatient(pendingDeleteId);
      setPendingDeleteId(null);
      setConfirmOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setPendingDeleteId(null);
    setConfirmOpen(false);
  };

  return (
    <div className="w-1/4 bg-white shadow-lg p-4 border-r">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Patient History</h2>
      <ul className="space-y-2">
        {patients.map((p) => (
          <li
            key={p._id}
            onClick={() => {
              setSelectedPatient(p);
              setAnalysisResult(null);
            }}
            className={`p-2 rounded-lg cursor-pointer flex items-center justify-between ${selectedPatient?._id === p._id ? "bg-red-100" : "hover:bg-gray-100"}`}
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">
                Age: {editPatientId === p._id ? (
                  <input
                    type="number"
                    value={editAge}
                    onChange={e => setEditAge(e.target.value)}
                    onBlur={() => handleUpdateAge(p._id)}
                    className="w-16 p-1 border rounded ml-2"
                    autoFocus
                  />
                ) : (
                  <span>{p.age}</span>
                )}, Gender: {p.gender}
              </p>
            </div>
            <button
              onClick={e => {
                e.stopPropagation();
                setEditPatientId(p._id);
                setEditAge(p.age);
              }}
              className="ml-2 text-blue-500 hover:text-blue-700"
              title="Edit age"
            >
              <FaEdit />
            </button>
            <button
              onClick={e => handleDeleteClick(e, p._id)}
              className="ml-2 text-red-500 hover:text-red-700"
              title="Delete patient"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowPatientModal(true)}
        className="mt-4 w-full bg-[var(--medical-red)] text-white py-2 rounded-lg hover:bg-red-700 cursor-pointer"
      >
        + Add Patient
      </button>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Patient?"
        description="Are you sure you want to delete this patient and all their reports? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
