import React from "react";

export default function PatientDetails({ selectedPatient, analysisResult, saveToHistory, handleSaveHistory }) {
  return (
    <div className="w-1/4 bg-white shadow-lg p-4 border-l">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Patient Details</h2>
      {selectedPatient ? (
        <div>
          <p>
            <strong>Name:</strong> {selectedPatient.name}
          </p>
          <p>
            <strong>Age:</strong> {selectedPatient.age}
          </p>
          <p>
            <strong>Gender:</strong> {selectedPatient.gender}
          </p>
          {analysisResult && saveToHistory && (
            <button
              onClick={handleSaveHistory}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Record
            </button>
          )}
          {analysisResult && (
            <div className="mt-6 p-3 border rounded-lg bg-gray-50">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Analysis Results</h3>
              <p>
                <strong>Status:</strong> {analysisResult.success ? "Success" : "Failed"}
              </p>
              <p>
                <strong>Message:</strong> {analysisResult.message}</p>
              <p>
                <strong>Tumor Detected:</strong>{" "}
                {analysisResult.tumorDetected ? "Yes" : "No"}
              </p>
              <p>
                <strong>Tumor Type:</strong> {analysisResult.tumorType || "N/A"}
              </p>
              <p>
                <strong>Confidence:</strong>{" "}
                {analysisResult.confidence
                  ? (analysisResult.confidence * 100).toFixed(2) + "%"
                  : "N/A"}
              </p>
              <div className="mt-4 border-t pt-2 text-sm text-gray-600">
                <p><strong>Report Summary:</strong></p>
                <p>Analysis Type: {analysisResult.type || "Unknown"}</p>
                <p>Patient: {selectedPatient.name}</p>
                <p>Date: {new Date().toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Select a patient to view details</p>
      )}
    </div>
  );
}
