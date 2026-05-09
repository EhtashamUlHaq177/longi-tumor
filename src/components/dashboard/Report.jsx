import React from "react";
import {
  Brain, User, CheckCircle2, XCircle, AlertTriangle, TrendingUp,
  Pill, Activity, Calendar, Info, ShieldAlert
} from "lucide-react";
import AnalysisVisualizations from "./AnalysisVisualizations";

const GRADE_ROMAN = ["0", "I", "II", "III", "IV"];
const GRADE_COLORS = {
  0: { text: "text-green-700",  bg: "bg-green-50",  border: "border-green-200" },
  1: { text: "text-lime-700",   bg: "bg-lime-50",   border: "border-lime-200"  },
  2: { text: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-200" },
  3: { text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200"},
  4: { text: "text-red-700",    bg: "bg-red-50",    border: "border-red-200"   },
};

// ── Reusable section wrapper matching the reference image ─────────────────────
function Section({ title, icon, children }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-bold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>
          {title}
        </h3>
      </div>
      <div className="px-5 py-4 bg-white">{children}</div>
    </div>
  );
}

// ── Inline label: value row ───────────────────────────────────────────────────
function Row({ label, value, valueClass = "text-gray-700" }) {
  return (
    <div className="flex items-baseline gap-1 text-sm">
      <span className="font-semibold text-gray-800 whitespace-nowrap">{label}:</span>
      <span className={valueClass}>{value ?? "N/A"}</span>
    </div>
  );
}

export default function Report({ analysisResult, selectedPatient }) {
  if (!analysisResult) return null;

  const r        = analysisResult;
  const ti       = r.tumor_info || {};
  const grade    = r.grade ?? ti.grade ?? 0;
  const gc       = GRADE_COLORS[grade] || GRADE_COLORS[0];
  const detected = r.tumorDetected ?? false;
  const pct      = r.confidence ? (r.confidence * 100).toFixed(2) : null;

  return (
    <div className="mx-3 sm:mx-6 my-4 sm:my-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* ── Report Title Bar ── */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-red-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white" style={{ fontFamily: "Sora, sans-serif" }}>
                Brain Tumor Analysis Report
              </h2>
              <p className="text-gray-400 text-xs">AI-Generated Diagnostic Summary</p>
            </div>
          </div>
          <img src="/Logo.png" alt="Logo" className="h-8 opacity-80" />
        </div>

        <div className="p-4 sm:p-6 space-y-4">

          {/* ── 1. Patient Information ── */}
          <Section title="Patient Information" icon={<User className="w-4 h-4 text-blue-600" />}>
            <div className="grid grid-cols-2 gap-x-12 gap-y-1.5">
              <Row label="Patient Name" value={selectedPatient?.name} />
              <Row label="Gender"       value={selectedPatient?.gender} />
              <Row label="Analysis Type" value={r.type === "compare" ? "Longitudinal (Compare)" : "Single Scan"} />
              <Row label="Date"         value={new Date().toLocaleString()} />
            </div>
          </Section>

          {/* ── 2. Tumor Classification Results ── */}
          <Section title="Tumor Classification Results" icon={<Activity className="w-4 h-4 text-red-600" />}>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-sm">
                <span className="font-semibold text-gray-800">Status:</span>
                {r.success
                  ? <span className="flex items-center gap-1 text-green-600 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Success</span>
                  : <span className="flex items-center gap-1 text-red-600 font-medium"><XCircle className="w-3.5 h-3.5" /> Failed</span>}
              </div>
              <Row label="Message"
                   value={r.type === "compare" ? "Longitudinal MRI analysis completed" : "Single MRI analysis completed"} />
              <Row label="Tumor Detected"
                   value={detected ? "Yes" : "No"}
                   valueClass={detected ? "text-red-600 font-bold" : "text-green-600 font-bold"} />
              <Row label="Tumor Type"      value={r.tumorType} />
              <Row label="Confidence Score" value={pct ? `${pct}%` : "N/A"} />
              {grade !== undefined && (
                <div className="flex items-baseline gap-1 text-sm">
                  <span className="font-semibold text-gray-800">WHO Grade:</span>
                  <span className={`font-bold ${gc.text}`}>
                    Grade {GRADE_ROMAN[grade] ?? grade}
                    {ti.risk_level ? ` — ${ti.risk_level}` : ""}
                  </span>
                </div>
              )}
            </div>
          </Section>

          {/* ── 3. Tumor Details ── */}
          {(ti.probability !== undefined || ti.grade !== undefined) && (
            <Section title="Tumor Details" icon={<Brain className="w-4 h-4 text-red-600" />}>
              <div className="grid grid-cols-3 gap-x-8 gap-y-1.5">
                <Row label="Probability"  value={ti.probability?.toFixed(3)} />
                <Row label="Grade"        value={ti.grade ?? "N/A"} />
                <Row label="Uncertainty"  value={ti.uncertainty?.toFixed(3)} />
                {ti.tumor_percentage !== undefined && (
                  <Row label="Tumor Area" value={`${ti.tumor_percentage}%`} />
                )}
                {ti.glcm_malignancy !== undefined && (
                  <Row label="Malignancy" value={ti.glcm_malignancy} />
                )}
                {ti.models_used !== undefined && (
                  <Row label="Models Used" value={ti.models_used} />
                )}
                {ti.processing_time_s !== undefined && (
                  <Row label="Processing" value={`${ti.processing_time_s}s`} />
                )}
                {ti.description && (
                  <div className="col-span-3 text-sm">
                    <span className="font-semibold text-gray-800">Description: </span>
                    <span className="text-gray-700">{ti.description}</span>
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* ── 4. Survival Estimate ── */}
          {r.survival_days !== undefined && r.survival_days !== null && (
            <Section title="Survival Estimate" icon={<Calendar className="w-4 h-4 text-green-600" />}>
              <p className="text-sm text-gray-700">
                Estimated Survival Duration:{" "}
                <span className="font-bold text-gray-900">{r.survival_days} days</span>
                <span className="text-gray-500 ml-2">
                  (approx. {Math.round(r.survival_days / 30)} months / {(r.survival_days / 365).toFixed(1)} years)
                </span>
              </p>
            </Section>
          )}

          {/* ── 5. Treatment Recommendations ── */}
          {r.recommendations && r.recommendations.length > 0 && (
            <Section title="Treatment Recommendations" icon={<Pill className="w-4 h-4 text-purple-600" />}>
              <ul className="space-y-1.5">
                {r.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center text-[10px] font-bold text-purple-700 flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>
                      <span className="font-semibold text-gray-800">{Array.isArray(rec) ? rec[0] : rec}</span>
                      {Array.isArray(rec) && rec[1] && (
                        <span className="text-gray-500 ml-1 text-xs">({rec[1]})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* ── 6. Risk Assessment ── */}
          {r.risk && (
            <Section title="Risk Assessment" icon={<ShieldAlert className="w-4 h-4 text-orange-600" />}>
              <div className="space-y-1 text-sm">
                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-gray-800">Level:</span>
                  <span className="font-bold" style={{ color: r.risk.color }}>{r.risk.level}</span>
                </div>
                <Row label="Score" value={r.risk.score?.toFixed(2)} />
              </div>
            </Section>
          )}

          {/* ── 7. Longitudinal Progression (compare only) ── */}
          {r.progression && (
            <Section title="Longitudinal Progression" icon={<TrendingUp className="w-4 h-4 text-indigo-600" />}>
              {r.progression.timepoints?.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {r.progression.timepoints.map((tp, idx) => (
                    <div key={idx} className="bg-indigo-50 rounded-lg p-3 border border-indigo-100 text-sm space-y-0.5">
                      <p className="font-bold text-indigo-700 mb-1">Timepoint {tp.index}</p>
                      <Row label="Probability" value={tp.tumor_info?.probability?.toFixed(3)} />
                      <Row label="Grade"       value={tp.tumor_info?.grade} />
                      <Row label="Volume"      value={tp.volume} />
                    </div>
                  ))}
                </div>
              )}
              {r.progression.summary && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  {[
                    ["Status",       r.progression.summary.status],
                    ["RANO",         r.progression.summary.rano],
                    ["Prob. Change", r.progression.summary.prob_change?.toFixed(3)],
                    ["Vol. Change",  r.progression.summary.vol_change_pct !== undefined
                                      ? `${r.progression.summary.vol_change_pct?.toFixed(1)}%` : "—"],
                  ].map(([label, val]) => (
                    <div key={label} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
                      <p className="font-bold text-gray-800 mt-0.5 text-sm">{val ?? "—"}</p>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* ── 8. Report Summary ── */}
          <Section title="Report Summary" icon={<Info className="w-4 h-4 text-gray-500" />}>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Analysis Type: {r.type === "compare" ? "Longitudinal (Compare)" : "Single Scan"}</p>
              <p>Patient: {selectedPatient?.name}</p>
              <p>Date: {new Date().toLocaleString()}</p>
              {ti.disclaimer && (
                <p className="text-[11px] text-amber-600 mt-2 italic">{ti.disclaimer}</p>
              )}
            </div>
          </Section>

          {/* ── AI Visualizations ── */}
          {r.visualizations && Object.keys(r.visualizations).length > 0 && (
            <AnalysisVisualizations visualizations={r.visualizations} />
          )}

        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-gray-400">
          <span>LongiTumorSense AI Platform · Confidential Medical Report</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
