import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import jsPDF from "jspdf";

export default function Reports() {
    const [patients, setPatients] = useState([]);
    const [patientReports, setPatientReports] = useState({});
    const [expandedPatientId, setExpandedPatientId] = useState(null);

    useEffect(() => {
        // Fetch patients
        const fetchPatients = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/patients", { withCredentials: true });
                setPatients(res.data);
            } catch (err) {
                toast.error("Failed to load patients");
            }
        };
        fetchPatients();
    }, []);

    useEffect(() => {
        // Fetch reports for all patients
        const fetchReports = async () => {
            try {
                const reportsByPatient = {};
                for (const patient of patients) {
                    const res = await axios.get(`http://localhost:5000/api/reports/patient/${patient._id}`, { withCredentials: true });
                    reportsByPatient[patient._id] = res.data;
                }
                setPatientReports(reportsByPatient);
            } catch (err) {
                toast.error("Failed to fetch reports");
            }
        };
        if (patients.length > 0) fetchReports();
    }, [patients]);




    const handleDownloadPDF = (report, patient) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Detailed Report", 10, 10);

        doc.setFontSize(12);
        doc.text(`Status: ${report.result?.success ? "✅ Success" : "❌ Failed"}`, 10, 20);
        doc.text(`Message: ${report.result?.message || "N/A"}`, 10, 30);

        doc.text(`Tumor Detected: ${report.result?.tumorDetected ? "Yes" : "No"}`, 10, 40);
        doc.text(`Tumor Type: ${report.result?.tumorType || "N/A"}`, 10, 50);
        doc.text(`Confidence: ${report.result?.confidence ? (report.result.confidence * 100).toFixed(2) + "%" : "N/A"}`, 10, 60);

        doc.text("Tumor Info", 10, 70);
        doc.text(`Probability: ${report.result?.tumor_info?.probability?.toFixed(3) ?? "N/A"}`, 12, 80);
        doc.text(`Grade: ${report.result?.tumor_info?.grade ?? "N/A"}`, 12, 90);
        doc.text(`Uncertainty: ${report.result?.tumor_info?.uncertainty ?? "N/A"}`, 12, 100);

        // Survival Estimate
        doc.text("Survival Estimate", 10, 110);
        doc.text(`Estimated Survival: ${report.result?.survival_days ? report.result.survival_days + " days" : "N/A"}`, 12, 120);

                // Treatment Recommendations
        doc.text("Treatment Recommendations", 10, 130);
        let y = 140;
        if (report.result?.recommendations) {
            report.result.recommendations.forEach((rec, idx) => {
                // Remove leading emoji and extra spaces using regex
                const cleanText = rec[0].replace(/^[^\w\s]+/, "").trim();
                doc.text(`- ${cleanText} (${rec[1]})`, 12, y);
                y += 10;
            });
        }

        // Risk Assessment
        doc.text("Risk Assessment", 10, y);
        y += 10;
        doc.text(`Level: ${report.result?.risk?.level ?? "N/A"}`, 12, y);
        y += 10;
        doc.text(`Score: ${report.result?.risk?.score ? report.result.risk.score.toFixed(2) : "N/A"}`, 12, y);

        // Report Summary
        y += 10;
        doc.text("Report Summary:", 10, y);
        y += 10;
        doc.text(`Analysis Type: ${report.result?.type || "N/A"}`, 12, y);
        y += 10;
        doc.text(`Patient: ${patient.name}`, 12, y);
        y += 10;
        doc.text(`Date: ${new Date(report.createdAt).toLocaleString()}`, 12, y);

        doc.save(`report_${report._id}.pdf`);
    };

    return (
        <div className="p-8 mt-10">
            <ToastContainer position="top-center" autoClose={2000} />
            <h2 className="text-2xl font-bold mb-6">Patient Records</h2>
           

            <ul className="space-y-4">
                {patients.map((p) => (
                    <li key={p._id} className="border-b pb-2">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setExpandedPatientId(expandedPatientId === p._id ? null : p._id)}
                        >
                            <span className="font-semibold">{p.name} ({p.age}, {p.gender})</span>
                            <span>{expandedPatientId === p._id ? "▲" : "▼"}</span>
                        </div>
                        {expandedPatientId === p._id && (
                            <div className="mt-2">
                                {patientReports[p._id]?.length > 0 ? (
                                    <ul className="space-y-2">
                                        {patientReports[p._id].map((report) => (
                                            <li key={report._id} className="p-2 border rounded flex justify-between items-center">
                                                <div>
                                                    <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDownloadPDF(report, p)}
                                                    className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                                >
                                                    Download PDF
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No reports found for this patient.</p>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>


        </div>
    );
}