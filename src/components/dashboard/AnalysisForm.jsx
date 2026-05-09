import React from "react";
import { Upload, Scan, Cpu, CheckCircle2, FileImage, Loader2, Brain } from "lucide-react";

export default function AnalysisForm({
  exploreFile,
  handleExploreUpload,
  isAnalyzing,
  analyzingType,
  handleRunAnalysis,
  compareFirstFile,
  handleCompareFirstUpload,
  compareLatestFile,
  handleCompareLatestUpload,
}) {
  const exploreRunning  = isAnalyzing && analyzingType === "explore";
  const compareRunning  = isAnalyzing && analyzingType === "compare";

  return (
    <div className="flex-1 p-4 sm:p-5 overflow-y-auto bg-gray-50 h-full">
      <div className="space-y-4">

        {/* ── Explore — Single MRI ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Section header */}
          <div className="px-4 py-3 bg-red-50 border-b border-red-100 flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[var(--medical-red)] rounded-lg flex items-center justify-center flex-shrink-0">
              <Scan className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>
                Explore — Single MRI
              </h3>
              <p className="text-[11px] text-gray-500">Detect tumor from one MRI scan</p>
            </div>
          </div>

          <div className="p-4">
            {/* Upload zone */}
            <label className="block cursor-pointer">
              <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 ${
                exploreFile
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 hover:border-[var(--medical-red)] hover:bg-red-50/30"
              }`}>
                {exploreFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <div className="text-left min-w-0">
                      <p className="text-xs font-semibold text-green-700">File Ready</p>
                      <p className="text-[11px] text-green-600 truncate max-w-[180px]">{exploreFile.name}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <FileImage className="w-7 h-7 text-gray-300 mx-auto mb-1.5" />
                    <p className="text-xs font-medium text-gray-500">Click to upload MRI scan</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Brain MRI only · DICOM, NIfTI, PNG, JPEG</p>
                  </>
                )}
                <input type="file" onChange={handleExploreUpload} className="hidden" accept=".dcm,.nii,.nii.gz,.png,.jpg,.jpeg" />
              </div>
            </label>

            {/* Run button */}
            <button
              onClick={() => handleRunAnalysis("explore")}
              disabled={isAnalyzing || !exploreFile}
              className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                exploreFile && !isAnalyzing
                  ? "bg-[var(--medical-red)] hover:bg-[var(--medical-red-hover)] text-white shadow-sm cursor-pointer"
                  : exploreFile && compareRunning
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {exploreRunning ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Explore...</>
              ) : (
                <><Cpu className="w-4 h-4" /> Run Explore Analysis</>
              )}
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ── Compare — Two MRIs ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Section header */}
          <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Upload className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>
                Compare — Two MRIs
              </h3>
              <p className="text-[11px] text-gray-500">Track tumor progression over time</p>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {/* Two upload zones */}
            <div className="grid grid-cols-2 gap-2">
              {/* First MRI */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">1st Scan</p>
                <label className="block cursor-pointer">
                  <div className={`border-2 border-dashed rounded-xl p-3 text-center transition-all duration-200 ${
                    compareFirstFile
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/30"
                  }`}>
                    {compareFirstFile ? (
                      <div className="flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <p className="text-[11px] font-semibold text-green-700 truncate max-w-[80px]">{compareFirstFile.name}</p>
                      </div>
                    ) : (
                      <>
                        <FileImage className="w-5 h-5 text-gray-300 mx-auto mb-1" />
                        <p className="text-[11px] text-gray-400">Brain MRI only</p>
                      </>
                    )}
                    <input type="file" onChange={handleCompareFirstUpload} className="hidden" accept=".dcm,.nii,.nii.gz,.png,.jpg,.jpeg" />
                  </div>
                </label>
              </div>

              {/* Latest MRI */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Latest Scan</p>
                <label className="block cursor-pointer">
                  <div className={`border-2 border-dashed rounded-xl p-3 text-center transition-all duration-200 ${
                    compareLatestFile
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/30"
                  }`}>
                    {compareLatestFile ? (
                      <div className="flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <p className="text-[11px] font-semibold text-green-700 truncate max-w-[80px]">{compareLatestFile.name}</p>
                      </div>
                    ) : (
                      <>
                        <FileImage className="w-5 h-5 text-gray-300 mx-auto mb-1" />
                        <p className="text-[11px] text-gray-400">Brain MRI only</p>
                      </>
                    )}
                    <input type="file" onChange={handleCompareLatestUpload} className="hidden" accept=".dcm,.nii,.nii.gz,.png,.jpg,.jpeg" />
                  </div>
                </label>
              </div>
            </div>

            {/* Run button */}
            <button
              onClick={() => handleRunAnalysis("compare")}
              disabled={isAnalyzing || !compareFirstFile || !compareLatestFile}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                compareFirstFile && compareLatestFile && !isAnalyzing
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {compareRunning ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Compare...</>
              ) : (
                <><Cpu className="w-4 h-4" /> Run Compare Analysis</>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
