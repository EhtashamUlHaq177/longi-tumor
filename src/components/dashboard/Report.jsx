import React from "react";

export default function Report({ analysisResult, selectedPatient }) {
  if (!analysisResult) return <p className="text-gray-500">No analysis report yet</p>;
  return (
    <div className="mt-8 p-6 bg-white shadow-lg rounded-lg border max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Brain Tumor Analysis Report</h1>
        </div>
        <img src="/Logo.png" alt="Medical Logo" className="h-12 opacity-80" />
      </div>
      <div className="space-y-8 pt-6">
        <section className="border p-4 rounded-md bg-gray-50">
          <h2 className="font-semibold text-gray-700 text-lg mb-3">Patient Information</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p><strong>Patient Name:</strong> {selectedPatient?.name || "N/A"}</p>
            <p><strong>Gender:</strong> {selectedPatient?.gender || "N/A"}</p>
            <p><strong>Analysis Type:</strong> {analysisResult.type || "N/A"}</p>
            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
          </div>
        </section>
        <section className="border p-4 rounded-md bg-white">
          <h2 className="font-semibold text-gray-700 text-lg mb-3">Tumor Classification Results</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Status:</strong> {analysisResult.success ? "✔ Success" : "✘ Failed"}</p>
              <p><strong>Message:</strong> {analysisResult.message}</p>
              <p><strong>Tumor Detected:</strong> {analysisResult.tumorDetected ? "Yes" : "No"}</p>
            </div>
            <div>
              <p><strong>Tumor Type:</strong> {analysisResult.tumorType || "N/A"}</p>
              <p><strong>Confidence Score:</strong> {analysisResult.confidence ? (analysisResult.confidence * 100).toFixed(2) + "%" : "N/A"}</p>
            </div>
          </div>
        </section>
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
        {analysisResult.survival_days && (
          <section className="border p-4 rounded-md bg-white">
            <h2 className="font-semibold text-gray-700 text-lg mb-3">Survival Estimate</h2>
            <p className="text-sm">Estimated Survival Duration: <strong className="ml-1">{analysisResult.survival_days} days</strong></p>
          </section>
        )}
        {analysisResult.recommendations && (
          <section className="border p-4 rounded-md bg-gray-50">
            <h2 className="font-semibold text-gray-700 text-lg mb-3">Treatment Recommendations</h2>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
              {analysisResult.recommendations.map((rec, idx) => (
                <li key={idx}>{rec[0]} <span className="text-gray-500 text-xs">({rec[1]})</span></li>
              ))}
            </ul>
          </section>
        )}
        {analysisResult.risk && (
          <section className="border p-4 rounded-md bg-white">
            <h2 className="font-semibold text-gray-700 text-lg mb-3">Risk Assessment</h2>
            <div className="text-sm">
              <p><strong>Risk Level:</strong> <span className="font-bold" style={{ color: analysisResult.risk.color }}>{" "}{analysisResult.risk.level}</span></p>
              <p><strong>Risk Score:</strong> {analysisResult.risk.score.toFixed(2)}</p>
            </div>
          </section>
        )}
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
        <section className="border-t pt-4 text-sm text-gray-600">
          <h3 className="font-semibold text-gray-700 mb-1">Report Summary</h3>
          <div className="mt-4 border-t pt-2 text-sm text-gray-600">
            <p>Analysis Type: {analysisResult.type || "Unknown"}</p>
            <p>Patient: {selectedPatient.name}</p>
            <p>Date: {new Date().toLocaleString()}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
