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




    // const handleDownloadPDF = (report, patient) => {
    //     const doc = new jsPDF();
    //     doc.setFontSize(16);
    //     doc.text("Detailed Report", 10, 10);

    //     doc.setFontSize(12);
    //     doc.text(`Status: ${report.result?.success ? "✅ Success" : "❌ Failed"}`, 10, 20);
    //     doc.text(`Message: ${report.result?.message || "N/A"}`, 10, 30);

    //     doc.text(`Tumor Detected: ${report.result?.tumorDetected ? "Yes" : "No"}`, 10, 40);
    //     doc.text(`Tumor Type: ${report.result?.tumorType || "N/A"}`, 10, 50);
    //     doc.text(`Confidence: ${report.result?.confidence ? (report.result.confidence * 100).toFixed(2) + "%" : "N/A"}`, 10, 60);

    //     doc.text("Tumor Info", 10, 70);
    //     doc.text(`Probability: ${report.result?.tumor_info?.probability?.toFixed(3) ?? "N/A"}`, 12, 80);
    //     doc.text(`Grade: ${report.result?.tumor_info?.grade ?? "N/A"}`, 12, 90);
    //     doc.text(`Uncertainty: ${report.result?.tumor_info?.uncertainty ?? "N/A"}`, 12, 100);

    //     // Survival Estimate
    //     doc.text("Survival Estimate", 10, 110);
    //     doc.text(`Estimated Survival: ${report.result?.survival_days ? report.result.survival_days + " days" : "N/A"}`, 12, 120);

    //             // Treatment Recommendations
    //     doc.text("Treatment Recommendations", 10, 130);
    //     let y = 140;
    //     if (report.result?.recommendations) {
    //         report.result.recommendations.forEach((rec, idx) => {
    //             // Remove leading emoji and extra spaces using regex
    //             const cleanText = rec[0].replace(/^[^\w\s]+/, "").trim();
    //             doc.text(`- ${cleanText} (${rec[1]})`, 12, y);
    //             y += 10;
    //         });
    //     }

    //     // Risk Assessment
    //     doc.text("Risk Assessment", 10, y);
    //     y += 10;
    //     doc.text(`Level: ${report.result?.risk?.level ?? "N/A"}`, 12, y);
    //     y += 10;
    //     doc.text(`Score: ${report.result?.risk?.score ? report.result.risk.score.toFixed(2) : "N/A"}`, 12, y);

      
    //     y += 10;
    //     doc.text("Report Summary:", 10, y);
    //     y += 10;
    //     doc.text(`Analysis Type: ${report.result?.type || "N/A"}`, 12, y);
    //     y += 10;
    //     doc.text(`Patient: ${patient.name}`, 12, y);
    //     y += 10;
    //     doc.text(`Date: ${new Date(report.createdAt).toLocaleString()}`, 12, y);

    //     doc.save(`report_${report._id}.pdf`);
    // };




    // const handleDownloadPDF = (report, patient) => {
    // const doc = new jsPDF({ unit: "pt", format: "a4" });

    // const margin = 40;
    // let y = margin;

    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(20);
    // doc.text("Brain Tumor Analysis Report", margin, y);
    // y += 25;

    // doc.setFont("helvetica", "normal");
    // doc.setFontSize(12);
    // doc.setTextColor(100);
    // doc.text("AI-Generated Diagnostic Summary", margin, y);
    // y += 30;

    
    const handleDownloadPDF = (report, patient) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const margin = 40;
    let y = 40;

    // Helper to clean text
    const cleanText = (text) => {
        if (!text) return "";
        return text
            .replace(/[^\x00-\x7F]/g, "") // remove emojis/unicode corruptions
            .replace(/&/g, "and");
    };

    // ──────────── LOGO ─────────────
    try {
        const img = new Image();
        img.src = "/Logo.png"; // CHANGE THIS to your actual path or Base64

        doc.addImage(img, "PNG", margin, y, 70, 50);
        y += 70;
    } catch (e) {
        console.log("Logo failed to load for PDF:", e);
    }

    // ──────────── HEADER ─────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Brain Tumor Analysis Report", margin, y);
    y += 25;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("AI-Generated Diagnostic Summary", margin, y);
    y += 30;


    // ─────────────────────────────────
    // Patient Information
    // ─────────────────────────────────
    doc.setDrawColor(180);
    doc.line(margin, y, 555, y);
    y += 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(30);
    doc.text("Patient Information", margin, y);
    y += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(50);

    doc.text(`Patient Name: ${patient.name || "N/A"}`, margin, y);
    y += 16;

    doc.text(`Gender: ${patient.gender || "N/A"}`, margin, y);
    y += 16;

    doc.text(`Analysis Type: ${report.result?.type || "N/A"}`, margin, y);
    y += 16;

    doc.text(`Date: ${new Date(report.createdAt).toLocaleString()}`, margin, y);
    y += 28;

    // ─────────────────────────────────
    // Classification Results
    // ─────────────────────────────────
    // doc.setDrawColor(180);
    // doc.line(margin, y, 555, y);
    // y += 20;

    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(14);
    // doc.text("Tumor Classification Results", margin, y);
    // y += 20;

    // const result = report.result;
    // doc.setFont("helvetica", "normal");
    // doc.setFontSize(11);

    // doc.text(`Status: ${result?.success ? "✔ Success" : "✘ Failed"}`, margin, y);
    // y += 16;

    // doc.text(`Message: ${result?.message || "N/A"}`, margin, y);
    // y += 16;

    // doc.text(`Tumor Detected: ${result?.tumorDetected ? "Yes" : "No"}`, margin, y);
    // y += 16;

    // doc.text(`Tumor Type: ${result?.tumorType || "N/A"}`, margin, y);
    // y += 16;

    // doc.text(
    //     `Confidence: ${
    //         result?.confidence
    //             ? (result.confidence * 100).toFixed(2) + "%"
    //             : "N/A"
    //     }`,
    //     margin,
    //     y
    // );
    // y += 30;




    // ──────────── CLASSIFICATION SECTION ─────────────
    doc.setDrawColor(180);
    doc.line(margin, y, 555, y);
    y += 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Tumor Classification Results", margin, y);
    y += 20;

    const result = report.result;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(cleanText(`Status: ${result.success ? "Success" : "Failed"}`), margin, y);
    y += 16;

    doc.text(cleanText(`Message: ${result.message || "N/A"}`), margin, y);
    y += 16;

    doc.text(cleanText(`Tumor Detected: ${result.tumorDetected ? "Yes" : "No"}`), margin, y);
    y += 16;

    doc.text(cleanText(`Tumor Type: ${result.tumorType || "N/A"}`), margin, y);
    y += 16;

    doc.text(
        cleanText(
            `Confidence: ${
                result.confidence
                    ? (result.confidence * 100).toFixed(2) + "%"
                    : "N/A"
            }`
        ),
        margin,
        y
    );
    y += 30;


    // ─────────────────────────────────
    // Tumor Info
    // ─────────────────────────────────
    if (result.tumor_info) {
        doc.setDrawColor(180);
        doc.line(margin, y, 555, y);
        y += 20;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Tumor Information", margin, y);
        y += 20;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        doc.text(
            `Probability: ${result.tumor_info.probability?.toFixed(3) ?? "N/A"}`,
            margin,
            y
        );
        y += 16;

        doc.text(
            `Grade: ${result.tumor_info.grade ?? "N/A"}`,
            margin,
            y
        );
        y += 16;

        doc.text(
            `Uncertainty: ${result.tumor_info.uncertainty ?? "N/A"}`,
            margin,
            y
        );
        y += 30;
    }

    // ─────────────────────────────────
    // Survival Estimate
    // ─────────────────────────────────
    if (result.survival_days) {
        doc.setDrawColor(180);
        doc.line(margin, y, 555, y);
        y += 20;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Survival Estimate", margin, y);
        y += 20;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        doc.text(
            `Estimated Survival: ${
                result.survival_days
                    ? result.survival_days + " days"
                    : "N/A"
            }`,
            margin,
            y
        );
        y += 30;
    }

    // ─────────────────────────────────
    // Treatment Recommendations
    // ─────────────────────────────────
    if (result.recommendations) {
        doc.setDrawColor(180);
        doc.line(margin, y, 555, y);
        y += 20;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Treatment Recommendations", margin, y);
        y += 20;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        result.recommendations.forEach((rec) => {
            const cleanText = rec[0].replace(/^[^\w\s]+/, "").trim();
            doc.text(`• ${cleanText} (${rec[1]})`, margin + 15, y);
            y += 16;
        });

        y += 10;
    }

    // ─────────────────────────────────
    // Risk Assessment
    // ─────────────────────────────────
    if (result.risk) {
        doc.setDrawColor(180);
        doc.line(margin, y, 555, y);
        y += 20;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Risk Assessment", margin, y);
        y += 20;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        doc.text(`Risk Level: ${result.risk.level || "N/A"}`, margin, y);
        y += 16;

        doc.text(
            `Risk Score: ${
                result.risk.score ? result.risk.score.toFixed(2) : "N/A"
            }`,
            margin,
            y
        );
        y += 30;
    }

    // ─────────────────────────────────
    // Final Summary
    // ─────────────────────────────────

    
    // doc.setDrawColor(180);
    // doc.line(margin, y, 555, y);
    // y += 20;

    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(14);
    // doc.text("Report Summary", margin, y);
    // y += 20;

    // doc.setFont("helvetica", "normal");
    // doc.setFontSize(11);



    // doc.text(`Report ID: ${report._id}`, margin, y);
    // y += 30;

    // Final save
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
                                                    className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
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