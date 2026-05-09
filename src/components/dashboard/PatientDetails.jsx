import React from "react";
import { User, Brain, CheckCircle2, XCircle, AlertTriangle, Clock, FileText } from "lucide-react";

const GRADE_ROMAN = ["0", "I", "II", "III", "IV"];
const GRADE_COLORS = {
  0: "text-green-600 bg-green-50",
  1: "text-lime-600 bg-lime-50",
  2: "text-amber-600 bg-amber-50",
  3: "text-orange-600 bg-orange-50",
  4: "text-red-600 bg-red-50",
};

export default function PatientDetails({ selectedPatient, analysisResult }) {
  const r          = analysisResult;
  const ti         = r?.tumor_info || {};
  const grade      = r?.grade ?? ti?.grade ?? 0;
  const detected   = r?.tumorDetected ?? false;
  const pct        = r?.confidence ? Math.round(r.confidence * 100) : null;
  const gradeColor = GRADE_COLORS[grade] || GRADE_COLORS[0];

  return (
    <div className="w-full h-full flex-shrink-0 bg-white border-l-2 border-gray-100 flex flex-col lg:w-72">
      {/* ── Header ── */}
      <div className="px-5 py-4 border-b-2 border-gray-100 bg-white">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-sm font-bold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>
            Patient Details
          </h2>
        </div>
        <p className="text-xs text-gray-400 ml-9">Selected patient info</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {selectedPatient ? (
          <>
            {/* ── Patient card ── */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {selectedPatient.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate">{selectedPatient.name}</p>
                  <p className="text-xs text-gray-500">{selectedPatient.gender}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-lg font-extrabold text-blue-600" style={{ fontFamily: "Sora, sans-serif" }}>
                    {selectedPatient.age}
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Age</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-sm font-bold text-blue-600">{selectedPatient.gender}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Gender</p>
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            {r && <div className="border-t-2 border-dashed border-gray-100" />}

            {/* ── Analysis results ── */}
            {r && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-[var(--medical-red)]" />
                  <h3 className="text-sm font-bold text-gray-700" style={{ fontFamily: "Sora, sans-serif" }}>
                    Analysis Results
                  </h3>
                </div>

                {/* Status */}
                <div className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold ${
                  r.success
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}>
                  {r.success
                    ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    : <XCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                  {r.success ? "Analysis Successful" : "Analysis Failed"}
                </div>

                {/* Metrics */}
                <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Tumor Detected</span>
                    <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                      detected ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {detected ? "YES" : "NO"}
                    </span>
                  </div>

                  {r.tumorType && (
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-gray-500 flex-shrink-0">Type</span>
                      <span className="font-semibold text-gray-700 text-right text-[10px] leading-tight">{r.tumorType}</span>
                    </div>
                  )}

                  {grade !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">WHO Grade</span>
                      <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${gradeColor}`}>
                        Grade {GRADE_ROMAN[grade] ?? grade}
                      </span>
                    </div>
                  )}

                  {pct !== null && (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-500">Confidence</span>
                        <span className="font-bold text-[var(--medical-red)]">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {ti.tumor_percentage !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Tumor Area</span>
                      <span className="font-semibold text-gray-700">{ti.tumor_percentage}%</span>
                    </div>
                  )}

                  {ti.processing_time_s !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Time
                      </span>
                      <span className="font-semibold text-gray-700">{ti.processing_time_s}s</span>
                    </div>
                  )}
                </div>

                {/* ── Divider ── */}
                <div className="border-t-2 border-dashed border-gray-100" />

                {/* Report summary */}
                <div className="bg-gray-50 rounded-xl p-3 space-y-1.5 text-xs">
                  <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-gray-400" /> Report Summary
                  </p>
                  {[
                    ["Type",    r.type === "compare" ? "Longitudinal" : "Single Scan"],
                    ["Patient", selectedPatient.name],
                    ["Date",    new Date().toLocaleDateString()],
                    ["Saved",   "Auto-saved ✓"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-400">{label}</span>
                      <span className={`font-medium truncate ml-2 max-w-[120px] ${label === "Saved" ? "text-green-600" : "text-gray-700"}`}>{val}</span>
                    </div>
                  ))}
                </div>

                {/* Confidence threshold warning */}
                {ti.meets_threshold === false && (
                  <div className="flex items-start gap-2 bg-amber-50 rounded-xl p-2.5 border border-amber-100">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-700">
                      Confidence below 70% threshold. Radiologist review strongly recommended.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-sm text-gray-400 font-medium">No patient selected</p>
            <p className="text-xs text-gray-300 mt-1">Select a patient from the list</p>
          </div>
        )}
      </div>
    </div>
  );
}
