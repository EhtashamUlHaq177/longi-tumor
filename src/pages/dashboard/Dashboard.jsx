// // Dashboard.js
// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

// export default function Dashboard() {
//   const [patients, setPatients] = useState([
//     { id: 1, name: "John Doe", date: "2025-08-01" },
//     { id: 2, name: "Sarah Khan", date: "2025-07-20" },
//   ]);
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const [exploreFile, setExploreFile] = useState(null);
//   const [compareFiles, setCompareFiles] = useState([]);
//   const [saveToHistory, setSaveToHistory] = useState(false);
//     const [analysisResult, setAnalysisResult] = useState(null);

//   const [showIntro, setShowIntro] = useState(true);

//   const handleAddPatient = () => {
//     const name = prompt("Enter patient name:");
//     if (name) {
//       setPatients([...patients, { id: Date.now(), name, date: new Date().toISOString().split("T")[0] }]);
//       toast.success("Patient added successfully");
//     }
//   };

//   const handleExploreUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setExploreFile(file);
//       toast.info("Single MRI uploaded for Explore");
//     }
//   };

//   const handleCompareUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length < 2) {
//       toast.error("Please upload at least 2 MRI scans for Compare");
//       return;
//     }
//     setCompareFiles(files);
//     toast.info("Multiple MRIs uploaded for Compare");
//   };



// const handleRunAnalysis = async (type) => {
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

//       // ✅ Save result to state so it shows in sidebar
//       setAnalysisResult(res.data);

//     } else if (type === "compare") {
//       if (compareFiles.length < 2) {
//         toast.error("Please upload at least 2 MRIs for Compare");
//         return;
//       }

//       const formData = new FormData();
//       compareFiles.forEach((file) => {
//         formData.append("mris", file);
//       });

//       const res = await axios.post("http://localhost:5000/api/mri/compare", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Compare analysis completed");
//       console.log("Compare result:", res.data);

//       // ✅ Save result to state
//       setAnalysisResult(res.data.result);
//     }
//   } catch (error) {
//     console.error("Analysis error:", error);
//     toast.error("Error running analysis");
//     setAnalysisResult("Error: Could not complete analysis");
//   }
// };


//   return (
//     <div className="relative flex h-screen bg-gray-50 mt-20">
//       <ToastContainer position="top-center" autoClose={2000} />

//       {/* Intro Modal */}
//       {showIntro && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
//             <h1 className="text-2xl font-bold text-[var(--medical-red)] mb-4">Welcome to LongiTumorSense</h1>
//             <p className="text-gray-600 mb-6">Here’s how you can get started:</p>
//             <div className="space-y-4">
//               <div className="p-3 border rounded-lg">
//                 <h2 className="font-semibold text-gray-800">1. Explore</h2>
//                 <p className="text-sm text-gray-600">Upload a single MRI scan to detect tumors and generate clinical predictions.</p>
//               </div>
//               <div className="p-3 border rounded-lg">
//                 <h2 className="font-semibold text-gray-800">2. Compare</h2>
//                 <p className="text-sm text-gray-600">Upload multiple MRI scans to analyze progression or recurrence over time.</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowIntro(false)}
//               className="mt-6 w-full bg-[var(--medical-red)] text-white py-2 rounded-lg hover:bg-red-700"
//             >
//               Got it, Proceed
//             </button>
//           </div>
//         </div>
//       )}
     

//       {/* Left Sidebar */}
//       <div className="w-1/4 bg-white shadow-lg p-4 border-r">
//         <h2 className="text-lg font-bold text-gray-700 mb-4">Patient History</h2>
//         <ul className="space-y-2">
//           {patients.map((p) => (
//             <li
//               key={p.id}
//               onClick={() => setSelectedPatient(p)}
//               className={`p-2 rounded-lg cursor-pointer ${
//                 selectedPatient?.id === p.id ? "bg-red-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <p className="font-medium">{p.name}</p>
//               <p className="text-xs text-gray-500">{p.date}</p>
//             </li>
//           ))}
//         </ul>
//         <button
//           onClick={handleAddPatient}
//           className="mt-4 w-full bg-[var(--medical-red)] text-white py-2 rounded-lg hover:bg-red-700"
//         >
//           + Add Patient
//         </button>
//       </div>

//       {/* Middle Section */}
//       <div className="w-2/4 p-6">
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome</h1>
//         <p className="text-gray-600 mb-6">
//           Choose between single MRI upload (Explore) or multiple MRI uploads (Compare).
//         </p>

//         {/* Explore */}
//         <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Explore (Single MRI)</h3>
//           <input type="file" onChange={handleExploreUpload} />
//           {exploreFile && <p className="text-sm mt-1 text-gray-500">Uploaded: {exploreFile.name}</p>}
//           <button
//             onClick={() => handleRunAnalysis("explore")}
//             className="mt-3 bg-[var(--medical-red)] text-white py-2 px-4 rounded-lg hover:bg-red-700"
//           >
//             Run Explore Analysis
//           </button>
//         </div>

//         {/* Compare */}
//         <div className="p-4 border rounded-lg bg-white shadow-sm">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Compare (Multiple MRIs)</h3>
//           <input type="file" multiple onChange={handleCompareUpload} />
//           {compareFiles.length > 0 && (
//             <p className="text-sm mt-1 text-gray-500">
//               Uploaded: {compareFiles.map((f) => f.name).join(", ")}
//             </p>
//           )}
//           <button
//             onClick={() => handleRunAnalysis("compare")}
//             className="mt-3 bg-[var(--medical-red)] text-white py-2 px-4 rounded-lg hover:bg-red-700"
//           >
//             Run Compare Analysis
//           </button>
//         </div>
//       </div>

//       {/* Right Sidebar */}


// <div className="w-1/4 bg-white shadow-lg p-4 border-l">
//   <h2 className="text-lg font-bold text-gray-700 mb-4">Patient Details</h2>

//   {selectedPatient ? (
//     <div>
//       <p><strong>Name:</strong> {selectedPatient.name}</p>
//       <p><strong>Date:</strong> {selectedPatient.date}</p>

//       <div className="mt-4 flex items-center">
//         <input
//           type="checkbox"
//           id="saveHistory"
//           checked={saveToHistory}
//           onChange={(e) => setSaveToHistory(e.target.checked)}
//           className="mr-2"
//         />
//         <label htmlFor="saveHistory">Save results to history</label>
//       </div>

// {analysisResult && (
//   <div className="mt-6 p-3 border rounded-lg bg-gray-50">
//     <h3 className="text-md font-semibold text-gray-700 mb-2">Analysis Results</h3>
//     <p><strong>Status:</strong> {analysisResult.success ? "Success" : "Failed"}</p>
//     <p><strong>Message:</strong> {analysisResult.message}</p>
//     <p><strong>Tumor Detected:</strong> {analysisResult.tumorDetected ? "Yes" : "No"}</p>
//     <p><strong>Tumor Type:</strong> {analysisResult.tumorType || "N/A"}</p>
//     <p><strong>Confidence:</strong> {analysisResult.confidence ? (analysisResult.confidence * 100).toFixed(2) + "%" : "N/A"}</p>
//   </div>
// )}

//     </div>
//   ) : (
//     <p className="text-gray-500">Select a patient to view details</p>
//   )}
// </div>





//     </div>

//   );
// }













































// // Dashboard.js
// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import PatientModal from "../../components/ui/PatientModal";

// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

// export default function Dashboard() {
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const [exploreFile, setExploreFile] = useState(null);
//   const [compareFiles, setCompareFiles] = useState([]);
//   const [saveToHistory, setSaveToHistory] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);

//   const [showIntro, setShowIntro] = useState(true);
//   const [showPatientModal, setShowPatientModal] = useState(false);
//   const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "" });

//   // ✅ Fetch patients from backend
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/patients");
//         setPatients(res.data);
//       } catch (error) {
//         console.error("Error fetching patients:", error);
//         toast.error("Failed to load patients");
//       }
//     };
//     fetchPatients();
//   }, []);

//   // ✅ Add new patient
//   const handleSavePatient = async () => {
//     if (!newPatient.name || !newPatient.age || !newPatient.gender) {
//       toast.error("All fields are required");
//       return;
//     }
//     try {
//       const res = await axios.post("http://localhost:5000/api/patients", newPatient);
//       setPatients([res.data, ...patients]); // Add new patient to state
//       toast.success("Patient added successfully");
//       setShowPatientModal(false);
//       setNewPatient({ name: "", age: "", gender: "" });
//     } catch (error) {
//       console.error("Error adding patient:", error);
//       toast.error("Failed to add patient");
//     }
//   };

//   // ✅ File handlers
//   const handleExploreUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setExploreFile(file);
//       toast.info("Single MRI uploaded for Explore");
//     }
//   };

//   const handleCompareUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length < 2) {
//       toast.error("Please upload at least 2 MRI scans for Compare");
//       return;
//     }
//     setCompareFiles(files);
//     toast.info("Multiple MRIs uploaded for Compare");
//   };

//   // ✅ Run analysis (connects with backend MRI API)
//   const handleRunAnalysis = async (type) => {
//     try {
//       if (type === "explore") {
//         if (!exploreFile) {
//           toast.error("Please upload a single MRI for Explore");
//           return;
//         }

//         const formData = new FormData();
//         formData.append("mri", exploreFile);
//         if (selectedPatient?._id) formData.append("patientId", selectedPatient._id);

//         const res = await axios.post("http://localhost:5000/api/mri/upload", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         setAnalysisResult(res.data);
//         toast.success("Explore analysis completed");
//       } else if (type === "compare") {
//         if (compareFiles.length < 2) {
//           toast.error("Please upload at least 2 MRIs for Compare");
//           return;
//         }

//         const formData = new FormData();
//         compareFiles.forEach((file) => {
//           formData.append("mris", file);
//         });
//         if (selectedPatient?._id) formData.append("patientId", selectedPatient._id);

//         const res = await axios.post("http://localhost:5000/api/mri/compare", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         setAnalysisResult(res.data);
//         toast.success("Compare analysis completed");
//       }
//     } catch (error) {
//       console.error("Analysis error:", error);
//       toast.error("Error running analysis");
//       setAnalysisResult({ success: false, message: "Could not complete analysis" });
//     }
//   };

//   return (
//     <div className="relative flex h-screen bg-gray-50 mt-20">
//       <ToastContainer position="top-center" autoClose={2000} />

//       {/* Intro Modal */}
//       {showIntro && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
//             <h1 className="text-2xl font-bold text-[var(--medical-red)] mb-4">
//               Welcome to LongiTumorSense
//             </h1>
//             <p className="text-gray-600 mb-6">Here’s how you can get started:</p>
//             <div className="space-y-4">
//               <div className="p-3 border rounded-lg">
//                 <h2 className="font-semibold text-gray-800">1. Explore</h2>
//                 <p className="text-sm text-gray-600">
//                   Upload a single MRI scan to detect tumors and generate predictions.
//                 </p>
//               </div>
//               <div className="p-3 border rounded-lg">
//                 <h2 className="font-semibold text-gray-800">2. Compare</h2>
//                 <p className="text-sm text-gray-600">
//                   Upload multiple MRI scans to analyze progression or recurrence.
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowIntro(false)}
//               className="mt-6 w-full bg-[var(--medical-red)] text-white py-2 rounded-lg hover:bg-red-700"
//             >
//               Got it, Proceed
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Patient Modal */}
//       {showPatientModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-96">
//             <h2 className="text-lg font-bold mb-4">Add Patient</h2>
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full p-2 border rounded mb-2"
//               value={newPatient.name}
//               onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Age"
//               className="w-full p-2 border rounded mb-2"
//               value={newPatient.age}
//               onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
//             />
//             <select
//               className="w-full p-2 border rounded mb-2"
//               value={newPatient.gender}
//               onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setShowPatientModal(false)}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSavePatient}
//                 className="px-4 py-2 bg-[var(--medical-red)] text-white rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Left Sidebar */}
//       <div className="w-1/4 bg-white shadow-lg p-4 border-r">
//         <h2 className="text-lg font-bold text-gray-700 mb-4">Patient History</h2>
//         <ul className="space-y-2">
//           {patients.map((p) => (
//             <li
//               key={p._id}
//               onClick={() => setSelectedPatient(p)}
//               className={`p-2 rounded-lg cursor-pointer ${
//                 selectedPatient?._id === p._id ? "bg-red-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <p className="font-medium">{p.name}</p>
//               <p className="text-xs text-gray-500">
//                 Age: {p.age}, Gender: {p.gender}
//               </p>
//             </li>
//           ))}
//         </ul>
//         <button
//           onClick={() => setShowPatientModal(true)}
//           className="mt-4 w-full bg-[var(--medical-red)] text-white py-2 rounded-lg hover:bg-red-700"
//         >
//           + Add Patient
//         </button>
//       </div>

//       {/* Middle Section */}
//       <div className="w-2/4 p-6">
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome</h1>
//         <p className="text-gray-600 mb-6">
//           Choose between single MRI upload (Explore) or multiple MRI uploads (Compare).
//         </p>

//         {/* Explore */}
//         <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Explore (Single MRI)</h3>
//           <input type="file" onChange={handleExploreUpload} />
//           {exploreFile && (
//             <p className="text-sm mt-1 text-gray-500">Uploaded: {exploreFile.name}</p>
//           )}
//           <button
//             onClick={() => handleRunAnalysis("explore")}
//             className="mt-3 bg-[var(--medical-red)] text-white py-2 px-4 rounded-lg hover:bg-red-700"
//           >
//             Run Explore Analysis
//           </button>
//         </div>

//         {/* Compare */}
//         <div className="p-4 border rounded-lg bg-white shadow-sm">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Compare (Multiple MRIs)</h3>
//           <input type="file" multiple onChange={handleCompareUpload} />
//           {compareFiles.length > 0 && (
//             <p className="text-sm mt-1 text-gray-500">
//               Uploaded: {compareFiles.map((f) => f.name).join(", ")}
//             </p>
//           )}
//           <button
//             onClick={() => handleRunAnalysis("compare")}
//             className="mt-3 bg-[var(--medical-red)] text-white py-2 px-4 rounded-lg hover:bg-red-700"
//           >
//             Run Compare Analysis
//           </button>
//         </div>
//       </div>

//       {/* Right Sidebar */}
//       <div className="w-1/4 bg-white shadow-lg p-4 border-l">
//         <h2 className="text-lg font-bold text-gray-700 mb-4">Patient Details</h2>

//         {selectedPatient ? (
//           <div>
//             <p>
//               <strong>Name:</strong> {selectedPatient.name}
//             </p>
//             <p>
//               <strong>Age:</strong> {selectedPatient.age}
//             </p>
//             <p>
//               <strong>Gender:</strong> {selectedPatient.gender}
//             </p>

//             <div className="mt-4 flex items-center">
//               <input
//                 type="checkbox"
//                 id="saveHistory"
//                 checked={saveToHistory}
//                 onChange={(e) => setSaveToHistory(e.target.checked)}
//                 className="mr-2"
//               />
//               <label htmlFor="saveHistory">Save results to history</label>
//             </div>

//             {analysisResult && (
//               <div className="mt-6 p-3 border rounded-lg bg-gray-50">
//                 <h3 className="text-md font-semibold text-gray-700 mb-2">Analysis Results</h3>
//                 <p>
//                   <strong>Status:</strong> {analysisResult.success ? "Success" : "Failed"}
//                 </p>
//                 <p>
//                   <strong>Message:</strong> {analysisResult.message}</p>
//                 <p>
//                   <strong>Tumor Detected:</strong>{" "}
//                   {analysisResult.tumorDetected ? "Yes" : "No"}
//                 </p>
//                 <p>
//                   <strong>Tumor Type:</strong>{" "}
//                   {analysisResult.tumorType || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Confidence:</strong>{" "}
//                   {analysisResult.confidence
//                     ? (analysisResult.confidence * 100).toFixed(2) + "%"
//                     : "N/A"}
//                 </p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <p className="text-gray-500">Select a patient to view details</p>
//         )}
//       </div>
//     </div>
//   );
// }













































// Dashboard.js
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import PatientModal from "../../components/ui/PatientModal";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [exploreFile, setExploreFile] = useState(null);
  const [compareFiles, setCompareFiles] = useState([]);
  const [saveToHistory, setSaveToHistory] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [showIntro, setShowIntro] = useState(true);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "" });

  // ✅ Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/patients");
        setPatients(res.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error("Failed to load patients");
      }
    };
    fetchPatients();
  }, []);

  // ✅ Add new patient
  const handleSavePatient = async () => {
    if (!newPatient.name || !newPatient.age || !newPatient.gender) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/patients", newPatient);
      setPatients([res.data, ...patients]);
      toast.success("Patient added successfully");
      setShowPatientModal(false);
      setNewPatient({ name: "", age: "", gender: "" });
    } catch (error) {
      console.error("Error adding patient:", error);
      toast.error("Failed to add patient");
    }
  };

  // ✅ File handlers
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

// ✅ Run analysis
const handleRunAnalysis = async (type) => {
  try {
    const formData = new FormData(); // only declared once ✅

    if (type === "explore") {
      if (!exploreFile) {
        toast.error("Please upload a single MRI for Explore");
        return;
      }
      formData.append("mri", exploreFile); // backend expects "mri"
    } else if (type === "compare") {
      if (compareFiles.length < 2) {
        toast.error("Please upload at least 2 MRIs for Compare");
        return;
      }
      compareFiles.forEach((file) => {
        formData.append("files", file); // backend expects "mris"
      });
    }

    if (selectedPatient?._id) {
      formData.append("patientId", selectedPatient._id);
    }

    const endpoint =
      type === "explore"
        ? "http://localhost:5000/api/mri/upload"
        : "http://localhost:5000/api/mri/compare";

    const res = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // normalize response
    setAnalysisResult(res.data.result || res.data);

    toast.success(`${type === "explore" ? "Explore" : "Compare"} analysis completed`);

    // ✅ Save history if toggled
    if (saveToHistory && selectedPatient?._id) {
      await axios.post("http://localhost:5000/api/history", {
        patientId: selectedPatient._id,
        result: res.data.result || res.data,
        type,
        timestamp: new Date(),
      });
      toast.info("Results saved to history");
    }
  } catch (error) {
    console.error("Analysis error:", error);
    toast.error("Error running analysis");
    setAnalysisResult({ success: false, message: "Could not complete analysis" });
  }
};


  return (
    <>
    <div className="relative flex h-auto bg-gray-50 mt-20">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Patient Modal */}
      {showPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add Patient</h2>
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
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePatient}
                className="px-4 py-2 bg-[var(--medical-red)] text-white rounded"
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
        {/* old at end */}
          {patients.map((p) => (
            

            <li
              key={p._id}
              onClick={() => {
                setSelectedPatient(p);
                setAnalysisResult(null); // ✅ Clear old analysis when switching patients
              }}
              className={`p-2 rounded-lg cursor-pointer ${selectedPatient?._id === p._id ? "bg-red-100" : "hover:bg-gray-100"
                }`}
            >



              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">
                Age: {p.age}, Gender: {p.gender}
              </p>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowPatientModal(true)}
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
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Compare (Two MRIs)</h3>
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
                  <p>Saved to history: {saveToHistory ? "Yes" : "No"}</p>
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
<div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
  <h3 className="text-lg font-semibold mb-2 text-gray-700">Detailed Report</h3>
  {analysisResult ? (
    <div className="p-3 border rounded-lg bg-gray-50">
      <p><strong>Status:</strong> {analysisResult.success ? "Success" : "Failed"}</p>
      <p><strong>Message:</strong> {analysisResult.message}</p>
      <p><strong>Tumor Detected:</strong> {analysisResult.tumorDetected ? "Yes" : "No"}</p>
      <p><strong>Tumor Type:</strong> {analysisResult.tumorType || "N/A"}</p>
      <p><strong>Confidence:</strong> 
        {analysisResult.confidence
          ? (analysisResult.confidence * 100).toFixed(2) + "%"
          : "N/A"}
      </p>
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
</div>

    </>
  );
}




           // <li
            //   key={p._id}
            //   onClick={() => setSelectedPatient(p)}
            //   className={`p-2 rounded-lg cursor-pointer ${
            //     selectedPatient?._id === p._id ? "bg-red-100" : "hover:bg-gray-100"
            //   }`}
            // >