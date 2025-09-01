// src/sections/comparison/Comparison.jsx
import React from "react";

export default function Comparison() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          MRI Scan <span className="text-[var(--medical-blue)]">Comparison</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          See the difference AI-assisted analysis can make in detecting and tracking brain tumors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 border-2 border-transparent hover:border-[var(--medical-red)]">
            <img
              src="/images/mri-before.jpg"
              alt="Before AI Analysis"
              className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Before AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Standard MRI scan without AI assistance — subtle tumor signs can be overlooked.
              </p>
            </div>
          </div>

          {/* After */}
          <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 border-2 border-transparent hover:border-[var(--medical-red)]">
            <img
              src="/images/mri-after.jpg"
              alt="After AI Analysis"
              className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">After AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Enhanced scan with AI — tumor regions are clearly highlighted for accurate diagnosis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
