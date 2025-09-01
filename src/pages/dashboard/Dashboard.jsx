// Dashboard.js
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", date: "2025-08-01" },
    { id: 2, name: "Sarah Khan", date: "2025-07-20" },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [exploreFile, setExploreFile] = useState(null);
  const [compareFiles, setCompareFiles] = useState([]);
  const [saveToHistory, setSaveToHistory] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

  const [showIntro, setShowIntro] = useState(true);

  const handleAddPatient = () => {
    const name = prompt("Enter patient name:");
    if (name) {
      setPatients([...patients, { id: Date.now(), name, date: new Date().toISOString().split("T")[0] }]);
      toast.success("Patient added successfully");
    }
  };

  const handleExploreUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExploreFile(file);
      toast.info("Single MRI uploaded for Explore");
    }
  };

  const handleCompareUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 2) {
      toast.error("Please upload at least 2 MRI scans for Compare");
      return;
    }
    setCompareFiles(files);
    toast.info("Multiple MRIs uploaded for Compare");
  };



  // const handleRunAnalysis = (type) => {
  //   if (type === "explore" && !exploreFile) {
  //     toast.error("Please upload a single MRI for Explore");
  //     return;
  //   }
  //   if (type === "compare" && compareFiles.length < 2) {
  //     toast.error("Please upload at least 2 MRIs for Compare");
  //     return;
  //   }
  //   toast.success(`${type === "explore" ? "Explore" : "Compare"} analysis started`);
  // };
const handleRunAnalysis = async (type) => {
  try {
    if (type === "explore") {
      if (!exploreFile) {
        toast.error("Please upload a single MRI for Explore");
        return;
      }

      const formData = new FormData();
      formData.append("mri", exploreFile);

      const res = await axios.post("http://localhost:5000/api/mri/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Explore analysis completed");
      console.log("Explore result:", res.data);

      // ✅ Save result to state so it shows in sidebar
      setAnalysisResult(res.data);

    } else if (type === "compare") {
      if (compareFiles.length < 2) {
        toast.error("Please upload at least 2 MRIs for Compare");
        return;
      }

      const formData = new FormData();
      compareFiles.forEach((file) => {
        formData.append("mris", file);
      });

      const res = await axios.post("http://localhost:5000/api/mri/compare", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Compare analysis completed");
      console.log("Compare result:", res.data);

      // ✅ Save result to state
      setAnalysisResult(res.data.result);
    }
  } catch (error) {
    console.error("Analysis error:", error);
    toast.error("Error running analysis");
    setAnalysisResult("Error: Could not complete analysis");
  }
};

//   const handleRunAnalysis = async (type) => {
//   try {
//     if (type === "explore") {
//       if (!exploreFile) {
//         toast.error("Please upload a single MRI for Explore");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("mri", exploreFile);

//       const res = await axios.post("http://localhost:5000/api/mri/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Explore analysis completed");
//       console.log("Explore result:", res.data);

//     } else if (type === "compare") {
//       if (compareFiles.length < 2) {
//         toast.error("Please upload at least 2 MRIs for Compare");
//         return;
//       }

//       const formData = new FormData();
//       compareFiles.forEach((file) => {
//         formData.append("mris", file); // backend must accept array "mris"
//       });

//       const res = await axios.post("http://localhost:5000/api/mri/compare", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Compare analysis completed");
//       console.log("Compare result:", res.data);
//     }
//   } catch (error) {
//     console.error("Analysis error:", error);
//     toast.error("Error running analysis");
//   }
// };


  return (
    <div className="relative flex h-screen bg-gray-50 mt-20">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Intro Modal */}
      {showIntro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
            <h1 className="text-2xl font-bold text-[var(--medical-red)] mb-4">Welcome to LongiTumorSense</h1>
            <p className="text-gray-600 mb-6">Here’s how you can get started:</p>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h2 className="font-semibold text-gray-800">1. Explore</h2>
                <p className="text-sm text-gray-600">Upload a single MRI scan to detect tumors and generate clinical predictions.</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h2 className="font-semibold text-gray-800">2. Compare</h2>
                <p className="text-sm text-gray-600">Upload multiple MRI scans to analyze progression or recurrence over time.</p>
              </div>
            </div>
            <button
              onClick={() => setShowIntro(false)}
              className="mt-6 w-full bg-[var(--medical-red)] text-white py-2 rounded-lg hover:bg-red-700"
            >
              Got it, Proceed
            </button>
          </div>
        </div>
      )}
     

      {/* Left Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-4 border-r">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Patient History</h2>
        <ul className="space-y-2">
          {patients.map((p) => (
            <li
              key={p.id}
              onClick={() => setSelectedPatient(p)}
              className={`p-2 rounded-lg cursor-pointer ${
                selectedPatient?.id === p.id ? "bg-red-100" : "hover:bg-gray-100"
              }`}
            >
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">{p.date}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddPatient}
          className="mt-4 w-full bg-[var(--medical-red)] text-white py-2 rounded-lg hover:bg-red-700"
        >
          + Add Patient
        </button>
      </div>

      {/* Middle Section */}
      <div className="w-2/4 p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome</h1>
        <p className="text-gray-600 mb-6">
          Choose between single MRI upload (Explore) or multiple MRI uploads (Compare).
        </p>

        {/* Explore */}
        <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Explore (Single MRI)</h3>
          <input type="file" onChange={handleExploreUpload} />
          {exploreFile && <p className="text-sm mt-1 text-gray-500">Uploaded: {exploreFile.name}</p>}
          <button
            onClick={() => handleRunAnalysis("explore")}
            className="mt-3 bg-[var(--medical-red)] text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Run Explore Analysis
          </button>
        </div>

        {/* Compare */}
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Compare (Multiple MRIs)</h3>
          <input type="file" multiple onChange={handleCompareUpload} />
          {compareFiles.length > 0 && (
            <p className="text-sm mt-1 text-gray-500">
              Uploaded: {compareFiles.map((f) => f.name).join(", ")}
            </p>
          )}
          <button
            onClick={() => handleRunAnalysis("compare")}
            className="mt-3 bg-[var(--medical-red)] text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Run Compare Analysis
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      {/* <div className="w-1/4 bg-white shadow-lg p-4 border-l">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Patient Details</h2>
        {selectedPatient ? (
          <div>
            <p><strong>Name:</strong> {selectedPatient.name}</p>
            <p><strong>Date:</strong> {selectedPatient.date}</p>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="saveHistory"
                checked={saveToHistory}
                onChange={(e) => setSaveToHistory(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="saveHistory">Save results to history</label>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Select a patient to view details</p>
        )}
      </div> */}

{/* Right Sidebar */}

{/* 
<div className="w-1/4 bg-white shadow-lg p-4 border-l">
  <h2 className="text-lg font-bold text-gray-700 mb-4">Patient Details</h2>

  {selectedPatient ? (
    <div>
      <p><strong>Name:</strong> {selectedPatient.name}</p>
      <p><strong>Date:</strong> {selectedPatient.date}</p>
      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          id="saveHistory"
          checked={saveToHistory}
          onChange={(e) => setSaveToHistory(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="saveHistory">Save results to history</label>
      </div>
    </div>
  ) : (
    <p className="text-gray-500">Select a patient to view details</p>
  )}

  
  {analysisResult && (
    <div className="mt-6 p-3 border rounded-lg bg-gray-50">
      <h3 className="text-md font-semibold text-gray-700 mb-2">Analysis Results</h3>
      <p><strong>Status:</strong> {analysisResult.success ? "Success" : "Failed"}</p>
      <p><strong>Message:</strong> {analysisResult.message}</p>
      <p><strong>Tumor Detected:</strong> {analysisResult.tumorDetected ? "Yes" : "No"}</p>
      <p><strong>Tumor Type:</strong> {analysisResult.tumorType || "N/A"}</p>
      <p><strong>Confidence:</strong> {analysisResult.confidence ? (analysisResult.confidence * 100).toFixed(2) + "%" : "N/A"}</p>
    </div>
  )}
</div> */}


<div className="w-1/4 bg-white shadow-lg p-4 border-l">
  <h2 className="text-lg font-bold text-gray-700 mb-4">Patient Details</h2>

  {selectedPatient ? (
    <div>
      <p><strong>Name:</strong> {selectedPatient.name}</p>
      <p><strong>Date:</strong> {selectedPatient.date}</p>

      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          id="saveHistory"
          checked={saveToHistory}
          onChange={(e) => setSaveToHistory(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="saveHistory">Save results to history</label>
      </div>

{analysisResult && (
  <div className="mt-6 p-3 border rounded-lg bg-gray-50">
    <h3 className="text-md font-semibold text-gray-700 mb-2">Analysis Results</h3>
    <p><strong>Status:</strong> {analysisResult.success ? "Success" : "Failed"}</p>
    <p><strong>Message:</strong> {analysisResult.message}</p>
    <p><strong>Tumor Detected:</strong> {analysisResult.tumorDetected ? "Yes" : "No"}</p>
    <p><strong>Tumor Type:</strong> {analysisResult.tumorType || "N/A"}</p>
    <p><strong>Confidence:</strong> {analysisResult.confidence ? (analysisResult.confidence * 100).toFixed(2) + "%" : "N/A"}</p>
  </div>
)}

    </div>
  ) : (
    <p className="text-gray-500">Select a patient to view details</p>
  )}
</div>





    </div>

  );
}
