// Dashboard.js
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";


import PatientModal from "../../components/ui/PatientModal.jsx";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaEdit, FaCog } from "react-icons/fa"; // npm install react-icons
import SettingsModal from "../../components/ui/SettingsModal";
import PatientList from "../../components/dashboard/PatientList";
import PatientDetails from "../../components/dashboard/PatientDetails";
import AnalysisForm from "../../components/dashboard/AnalysisForm";
import Report from "../../components/dashboard/Report";





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
        <PatientList
          patients={patients}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          setAnalysisResult={setAnalysisResult}
          editPatientId={editPatientId}
          setEditPatientId={setEditPatientId}
          editAge={editAge}
          setEditAge={setEditAge}
          handleUpdateAge={handleUpdateAge}
          handleDeletePatient={handleDeletePatient}
          setShowPatientModal={setShowPatientModal}
        />
        {/* Middle Section */}
        <AnalysisForm
          exploreFile={exploreFile}
          handleExploreUpload={handleExploreUpload}
          isAnalyzing={isAnalyzing}
          handleRunAnalysis={handleRunAnalysis}
          compareFirstFile={compareFirstFile}
          handleCompareFirstUpload={handleCompareFirstUpload}
          compareLatestFile={compareLatestFile}
          handleCompareLatestUpload={handleCompareLatestUpload}
        />
        {/* Right Sidebar */}
        <PatientDetails
          selectedPatient={selectedPatient}
          analysisResult={analysisResult}
          saveToHistory={saveToHistory}
          handleSaveHistory={handleSaveHistory}
        />
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
      </div>
      {/* Report Section */}
      <Report analysisResult={analysisResult} selectedPatient={selectedPatient} />
      <div className="flex justify-end my-4 gap-2">
        <button
          onClick={() => navigate("/reports")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          View Records
        </button>
      </div>
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={handleUserLogout}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 cursor-pointer"
        >
          Logout
        </button>
        <button
          onClick={() => setShowChangePassword(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          title="Settings"
        >
          <FaCog className="text-lg" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
      <SettingsModal open={showChangePassword} onClose={() => setShowChangePassword(false)}>
        <form onSubmit={submitPasswordChange} className="space-y-4">
          <div className="font-semibold text-lg mb-2">Change Password</div>
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
      </SettingsModal>
    </>
  );
}


