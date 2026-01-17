// Dashboard.js
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";


import PatientModal from "../../components/ui/PatientModal.jsx";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaEdit } from "react-icons/fa"; // npm install react-icons





export default function Dashboard() {
  // Change Password Modal State
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const submitPasswordChange = async (e) => {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.newPass || !passwordForm.confirm) {
      toast.error("All fields are required");
      return;
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/change-password",
        {
          currentPassword: passwordForm.current,
          newPassword: passwordForm.newPass,
        },
        { withCredentials: true }
      );
      setPasswordLoading(false);
      if (res.data.success) {
        toast.success("Password changed successfully!");
        setShowChangePassword(false);
        setPasswordForm({ current: "", newPass: "", confirm: "" });
      } else {
        toast.error(res.data.message || "Failed to change password");
      }
    } catch (err) {
      setPasswordLoading(false);
      toast.error(
        err.response?.data?.message || "Failed to change password"
      );
    }
  };

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [exploreFile, setExploreFile] = useState(null);
  // Compare now uses two separate files: first and latest timestamp
  const [compareFirstFile, setCompareFirstFile] = useState(null);
  const [compareLatestFile, setCompareLatestFile] = useState(null);
  const [saveToHistory, setSaveToHistory] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [showIntro, setShowIntro] = useState(true);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "" });

  // ADD: analyzing state
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();
  const [editPatientId, setEditPatientId] = useState(null);
  const [editAge, setEditAge] = useState("");

  const handleUpdateAge = async (patientId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/patients/${patientId}`,
        { age: editAge },
        { withCredentials: true }
      );
      setPatients(patients.map(p =>
        p._id === patientId ? { ...p, age: editAge } : p
      ));
      setEditPatientId(null);
      toast.success("Age updated");
    } catch (err) {
      toast.error("Failed to update age");
    }
  };

  const handleUserLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      localStorage.removeItem("authType");
      toast.success("Logged out successfully");
      navigate("/auth");
      window.location.reload();
    } catch (err) {
      toast.error("Logout failed");
    }
  };


  const handleDeletePatient = async (patientId) => {
    if (!window.confirm("Are you sure you want to delete this patient and all their reports?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/patients/${patientId}`, { withCredentials: true });
      setPatients(patients.filter((p) => p._id !== patientId));
      if (selectedPatient && selectedPatient._id === patientId) {
        setSelectedPatient(null);
        setAnalysisResult(null);
      }
      toast.success("Patient deleted successfully");
    } catch (err) {
      toast.error("Failed to delete patient");
    }
  };

  // ...existing code...
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/patients", {
          withCredentials: true, // <-- important!
        });
        setPatients(res.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error("Failed to load patients");
      }
    };
    fetchPatients();
  }, []);




  // ...existing code...
  const handleSavePatient = async () => {
    if (!newPatient.name || !newPatient.age || !newPatient.gender) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/patients",
        newPatient,
        { withCredentials: true }
      );
      setPatients([res.data.patient, ...patients]); // <-- use res.data.patient
      toast.success("Patient added successfully");
      setShowPatientModal(false);
      setNewPatient({ name: "", age: "", gender: "" });
    } catch (error) { 
      console.error("Error adding patient:", error);
      toast.error("Failed to add patient");
    }
  };
  // ...existing code...



  // ✅ File handlers
  const handleExploreUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExploreFile(file);
      toast.info("Single MRI uploaded for Explore");
    }
  };

  
  // Separate handlers for each compare file input
  const handleCompareFirstUpload = (e) => {
    const file = e.target.files[0];
    setCompareFirstFile(file || null);
    if (file) {
      toast.info("1st timestamp MRI uploaded");
    }
  };

  const handleCompareLatestUpload = (e) => {
    const file = e.target.files[0];
    setCompareLatestFile(file || null);
    if (file) {
      toast.info("Latest timestamp MRI uploaded");
    }
  };




    const handleRunAnalysis = async (type) => {
    // Check if a patient is selected
    if (!selectedPatient?._id) {
      toast.error("No patient selected. Please select a patient first.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      if (type === "explore") {
        if (!exploreFile) {
          toast.error("Please upload a single MRI for Explore");
          return;
        }
        formData.append("mri", exploreFile);
      } else if (type === "compare") {
        if (!compareFirstFile || !compareLatestFile) {
          toast.error("Please upload both 1st and latest timestamp MRIs for Compare");
          return;
        }
        formData.append("first_mri", compareFirstFile);
        formData.append("latest_mri", compareLatestFile);
      }
      
      setIsAnalyzing(true);
      const toastId = toast.loading("Generating result... This may take a while",{autoClose: false,
      closeButton: false,
      closeOnClick: false,
      draggable: false
    });

  
      formData.append("patientId", selectedPatient._id);
  
      const endpoint =
        type === "explore"
          ? "http://localhost:5000/api/mri/upload"
          : "http://localhost:5000/api/mri/compare";
  
      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  

      toast.update(toastId, {
        render: `${type === "explore" ? "Explore" : "Compare"} analysis completed successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setAnalysisResult(res.data.result || res.data);
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Error running analysis");
      setAnalysisResult({ success: false, message: "Could not complete analysis" });
    }

    finally {
      setIsAnalyzing(false);
    }

  };

  const handleSaveHistory = async () => {
    // if (!selectedPatient?._id || !analysisResult) return;
    if (!selectedPatient?._id || !analysisResult || !saveToHistory) {
    toast.error("Please check 'Save results to history' before saving.");
    return;
  }
    try {
      await axios.post("http://localhost:5000/api/reports", {
        patientId: selectedPatient._id,
        result: analysisResult,
        type: analysisResult.type || "explore",
        timestamp: new Date(),
      }, { withCredentials: true });
      toast.success("Record saved to history");
      // Optionally refresh page or reload patient history here
      window.location.reload(); // or fetchPatients();
    } catch (err) {
      toast.error("Failed to save record");
    }
  };


  return (
    <>

      <div className="relative flex h-auto bg-gray-50 mt-20">

        <ToastContainer position="top-center" autoClose={2000} />

        {/* Patient Modal */}
        {showPatientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 ">
              <h2 className="text-lg font-bold mb-4 cursor-pointer">Add Patient</h2>

              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded mb-2"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Age"
                className="w-full p-2 border rounded mb-2"
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded mb-2"
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowPatientModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePatient}
                  className="px-4 py-2 bg-[var(--medical-red)] text-white rounded cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Left Sidebar */}
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
                className={`p-2 rounded-lg cursor-pointer flex items-center justify-between ${selectedPatient?._id === p._id ? "bg-red-100" : "hover:bg-gray-100"
                  }`}
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  {/* <p className="text-xs text-gray-500">
          Age: {p.age}, Gender: {p.gender}
        </p> */}
                  <p className="text-xs text-gray-500">
                    {/* Age edit field or static age */}
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
                  onClick={e => {
                    e.stopPropagation();
                    handleDeletePatient(p._id);
                  }}
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
            <input type="file" onChange={handleExploreUpload} className="flex w-60 text-lg text-black border border-gray-400 rounded-lg  cursor-pointer bg-gray-200  " />
            {exploreFile && <p className="text-sm mt-1 text-gray-500">Uploaded: {exploreFile.name}</p>}
            <button
              onClick={() => handleRunAnalysis("explore")}
              disabled={isAnalyzing}
              className="mt-3 bg-[var(--medical-red)] text-white py-2 px-4 rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Run Explore Analysis
            </button>
          </div>

          {/* Compare */}
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Compare (Two MRIs)</h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 font-medium">1st Timestamp MRI</label>
              <input type="file" onChange={handleCompareFirstUpload} className="flex w-60 text-lg text-black border border-gray-400 rounded-lg  cursor-pointer bg-gray-200  " />
              {compareFirstFile && (
                <p className="text-xs text-gray-500">Uploaded: {compareFirstFile.name}</p>
              )}
              <label className="text-sm text-gray-700 font-medium mt-2">Latest Timestamp MRI</label>
              <input type="file" onChange={handleCompareLatestUpload} className="flex w-60 text-lg text-black border border-gray-400 rounded-lg  cursor-pointer bg-gray-200  " />
              {compareLatestFile && (
                <p className="text-xs text-gray-500">Uploaded: {compareLatestFile.name}</p>
              )}
            </div>
            <button
              onClick={() => handleRunAnalysis("compare")}
              className="mt-3 bg-[var(--medical-red)] text-white py-2 px-4 rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Run Compare Analysis
            </button>
          </div>
        </div>




        {/* Right Sidebar */}
        <div className="w-1/4 bg-white shadow-lg p-4 border-l">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Patient Details</h2>

         

          {/* Change Password Modal */}
          {showChangePassword && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg w-96 ">
                <h2 className="text-lg font-bold mb-4">Change Password</h2>
                <form onSubmit={submitPasswordChange} className="space-y-4">
                  <input
                    type="password"
                    name="current"
                    placeholder="Current Password"
                    value={passwordForm.current}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    name="newPass"
                    placeholder="New Password"
                    value={passwordForm.newPass}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    name="confirm"
                    placeholder="Confirm New Password"
                    value={passwordForm.confirm}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setShowChangePassword(false)}
                      className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                      disabled={passwordLoading}
                    >
                      {passwordLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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


                  {/* ✅ Report Summary */}
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

      </div>

      {/* Bottom Section: Detailed Report */}

      {/* <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Detailed Report</h3>

        {analysisResult ? (
          <div className="p-3 border rounded-lg bg-gray-50 space-y-4">
            
            <div>
              <p><strong>Status:</strong> {analysisResult.success ? "✅ Success" : "❌ Failed"}</p>
              <p><strong>Message:</strong> {analysisResult.message || "N/A"}</p>
              <p><strong>Tumor Detected:</strong> {analysisResult.tumorDetected ? "Yes" : "No"}</p>
              <p><strong>Tumor Type:</strong> {analysisResult.tumorType || "N/A"}</p>
              <p><strong>Confidence:</strong>
                {analysisResult.confidence
                  ? (analysisResult.confidence * 100).toFixed(2) + "%"
                  : "N/A"}
              </p>
            </div>

           
            {analysisResult.tumor_info && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Tumor Info</h4>
                <p><strong>Probability:</strong> {analysisResult.tumor_info.probability?.toFixed(3)}</p>
                <p><strong>Grade:</strong> {analysisResult.tumor_info.grade}</p>
                <p><strong>Uncertainty:</strong> {analysisResult.tumor_info.uncertainty}</p>
              </div>
            )}

          
            {analysisResult.survival_days && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Survival Estimate</h4>
                <p>🕑 Estimated Survival: <strong>{analysisResult.survival_days} days</strong></p>
              </div>
            )}


         
            {analysisResult.recommendations && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Treatment Recommendations</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {analysisResult.recommendations.map((rec, idx) => (
                    <li key={idx}>
                      {rec[0]} <span className="text-xs text-gray-500">({rec[1]})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

           
            {analysisResult.risk && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Risk Assessment</h4>
                <p>
                  <strong>Level:</strong>
                  <span style={{ color: analysisResult.risk.color, fontWeight: "bold" }}>
                    {" "}{analysisResult.risk.level}
                  </span>
                </p>
                <p><strong>Score:</strong> {analysisResult.risk.score?.toFixed(2)}</p>
              </div>
            )}

            
            {analysisResult.progression && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Progression Analysis</h4>

                <div className="space-y-2">
                  {analysisResult.progression.timepoints?.map((tp, idx) => (
                    <div key={idx} className="p-2 border rounded bg-white">
                      <p><strong>Timepoint {tp.index}</strong></p>
                      <p>Volume: {tp.volume}</p>
                      <p>Probability: {tp.tumor_info?.probability?.toFixed(3)}</p>
                      <p>Grade: {tp.tumor_info?.grade}</p>
                    </div>
                  ))}
                </div>

                {analysisResult.progression.summary && (
                  <div className="mt-2 p-2 border-t text-sm text-gray-600">
                    <p><strong>Status:</strong> {analysisResult.progression.summary.status}</p>
                    <p><strong>RANO:</strong> {analysisResult.progression.summary.rano}</p>
                    <p><strong>Probability Change:</strong> {analysisResult.progression.summary.prob_change?.toFixed(3)}</p>
                    <p><strong>Volume Change %:</strong> {analysisResult.progression.summary.vol_change_pct?.toFixed(2)}%</p>
                  </div>
                )}
              </div>
            )}



          
            <div className="mt-4 border-t pt-2 text-sm text-gray-600">
              <p><strong>Report Summary:</strong></p>
              <p>Analysis Type: {analysisResult.type || "Unknown"}</p>
              <p>Patient: {selectedPatient?.name || "N/A"}</p>
              <p>Date: {new Date().toLocaleString()}</p>
              <p>Saved to history: {saveToHistory ? "Yes" : "No"}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No analysis report yet</p>
        )}
      </div> */}

      <div className="mt-8 p-6 bg-white shadow-lg rounded-lg border max-w-4xl mx-auto">

  {/* Header */}
  <div className="flex justify-between items-center border-b pb-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Brain Tumor Analysis Report</h1>
      
    </div>

    <img
      src="/Logo.png"
      alt="Medical Logo"
      className="h-12 opacity-80"
    />
  </div>

  {analysisResult ? (
    <div className="space-y-8 pt-6">

      {/* Supplier / Patient Information */}
      <section className="border p-4 rounded-md bg-gray-50">
        <h2 className="font-semibold text-gray-700 text-lg mb-3">Patient Information</h2>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <p><strong>Patient Name:</strong> {selectedPatient?.name || "N/A"}</p>
          <p><strong>Gender:</strong> {selectedPatient?.gender || "N/A"}</p>
          <p><strong>Analysis Type:</strong> {analysisResult.type || "N/A"}</p>
          <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
        </div>
      </section>

      {/* Classifier Results */}
      <section className="border p-4 rounded-md bg-white">
        <h2 className="font-semibold text-gray-700 text-lg mb-3">
          Tumor Classification Results
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Status:</strong> {analysisResult.success ? "✔ Success" : "✘ Failed"}</p>
            <p><strong>Message:</strong> {analysisResult.message}</p>
            <p><strong>Tumor Detected:</strong> {analysisResult.tumorDetected ? "Yes" : "No"}</p>
          </div>

          <div>
            <p><strong>Tumor Type:</strong> {analysisResult.tumorType || "N/A"}</p>
            <p><strong>Confidence Score:</strong> 
              {analysisResult.confidence
                ? (analysisResult.confidence * 100).toFixed(2) + "%"
                : "N/A"}
            </p>
          </div>
        </div>
      </section>

      {/* Tumor Detailed Info */}
      {analysisResult.tumor_info && (
        <section className="border p-4 rounded-md bg-gray-50">
          <h2 className="font-semibold text-gray-700 text-lg mb-3">Tumor Details</h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <p><strong>Probability:</strong> {analysisResult.tumor_info.probability?.toFixed(3)}</p>
            <p><strong>Grade:</strong> {analysisResult.tumor_info.grade}</p>
            <p><strong>Uncertainty:</strong> {analysisResult.tumor_info.uncertainty}</p>
          </div>
        </section>
      )}

      {/* Survival Estimate */}
      {analysisResult.survival_days && (
        <section className="border p-4 rounded-md bg-white">
          <h2 className="font-semibold text-gray-700 text-lg mb-3">Survival Estimate</h2>
          <p className="text-sm">
            Estimated Survival Duration:
            <strong className="ml-1">{analysisResult.survival_days} days</strong>
          </p>
        </section>
      )}

      {/* Recommendations */}
      {analysisResult.recommendations && (
        <section className="border p-4 rounded-md bg-gray-50">
          <h2 className="font-semibold text-gray-700 text-lg mb-3">Treatment Recommendations</h2>

          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
            {analysisResult.recommendations.map((rec, idx) => (
              <li key={idx}>
                {rec[0]} <span className="text-gray-500 text-xs">({rec[1]})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Risk Assessment */}
      {analysisResult.risk && (
        <section className="border p-4 rounded-md bg-white">
          <h2 className="font-semibold text-gray-700 text-lg mb-3">Risk Assessment</h2>

          <div className="text-sm">
            <p>
              <strong>Risk Level:</strong>
              <span className="font-bold" style={{ color: analysisResult.risk.color }}>
                {" "}{analysisResult.risk.level}
              </span>
            </p>
            <p><strong>Risk Score:</strong> {analysisResult.risk.score.toFixed(2)}</p>
          </div>
        </section>
      )}

      {/* Longitudinal Progression */}
      {analysisResult.progression && (
        <section className="border p-4 rounded-md bg-gray-50">
          <h2 className="font-semibold text-gray-700 text-lg mb-3">Longitudinal Progression</h2>

          <div className="space-y-3">
            {analysisResult.progression.timepoints?.map((tp, idx) => (
              <div key={idx} className="border p-3 rounded bg-white text-sm">
                <p><strong>Timepoint {tp.index}</strong></p>
                <p>Volume: {tp.volume}</p>
                <p>Probability: {tp.tumor_info?.probability?.toFixed(3)}</p>
                <p>Grade: {tp.tumor_info?.grade}</p>
              </div>
            ))}
          </div>

          {analysisResult.progression.summary && (
            <div className="mt-3 p-3 border rounded bg-white text-sm">
              <p><strong>Status:</strong> {analysisResult.progression.summary.status}</p>
              <p><strong>RANO:</strong> {analysisResult.progression.summary.rano}</p>
              <p><strong>Probability Change:</strong> {analysisResult.progression.summary.prob_change.toFixed(3)}</p>
              <p><strong>Volume Change %:</strong> {analysisResult.progression.summary.vol_change_pct.toFixed(2)}%</p>
            </div>
          )}
        </section>
      )}

      {/* Final Summary */}
      <section className="border-t pt-4 text-sm text-gray-600">
        <h3 className="font-semibold text-gray-700 mb-1">Report Summary</h3>
        <div className="mt-4 border-t pt-2 text-sm text-gray-600">
                    
                    <p>Analysis Type: {analysisResult.type || "Unknown"}</p>
                    <p>Patient: {selectedPatient.name}</p>
                    <p>Date: {new Date().toLocaleString()}</p>
                    
                  </div>
      </section>

    </div>
  ) : (
    <p className="text-gray-500">No analysis report yet</p>
  )}
</div>


      <div className="flex justify-end my-4 gap-2">
        
        <button
          onClick={() => navigate("/reports")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          View Records
        </button>
      </div>

      
      <div className="flex justify-end mb-4">
        <button
          onClick={handleUserLogout}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 cursor-pointer"
        >
          Logout
        </button>
        
      </div>
       <div className="justify-end mb-2">
      {/* Change Password Button */}
          <button
            onClick={() => setShowChangePassword(true)}
            className="mb-4 w-35 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Change Password
          </button>
        </div>
       
      

    </>
  );
}


