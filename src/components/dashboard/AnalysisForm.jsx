import React from "react";

export default function AnalysisForm({
  exploreFile,
  handleExploreUpload,
  isAnalyzing,
  handleRunAnalysis,
  compareFirstFile,
  handleCompareFirstUpload,
  compareLatestFile,
  handleCompareLatestUpload
}) {
  return (
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
  );
}
