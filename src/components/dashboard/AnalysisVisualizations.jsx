import React, { useState } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

const PANEL_LABELS = {
  // Composite panels (new world-class visualization)
  panel_composite: "AI Diagnostic Visualization",
};

function LightboxModal({ panels, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const keys = Object.keys(panels);
  const key = keys[idx];

  const prev = () => setIdx((i) => (i - 1 + keys.length) % keys.length);
  const next = () => setIdx((i) => (i + 1) % keys.length);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
      onClick={handleBackdrop}
    >
      <div className="relative max-w-5xl w-full">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image */}
        <div className="bg-black rounded-xl overflow-hidden border border-white/10">
          <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              {PANEL_LABELS[key] || key}
            </span>
            <span className="text-xs text-white/40">
              {idx + 1} / {keys.length}
            </span>
          </div>
          <img
            src={`data:image/png;base64,${panels[key]}`}
            alt={PANEL_LABELS[key] || key}
            className="w-full object-contain max-h-[75vh]"
          />
        </div>

        {/* Nav arrows */}
        {keys.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/60 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/60 hover:text-white cursor-pointer"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function AnalysisVisualizations({ visualizations }) {
  const [lightbox, setLightbox] = useState(null); // index or null

  if (!visualizations || Object.keys(visualizations).length === 0) return null;

  const keys = Object.keys(visualizations);

  return (
    <div className="mt-5">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="w-1 h-5 bg-[var(--medical-red)] rounded-full" />
        <h3
          className="text-sm font-bold text-gray-800"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          AI Diagnostic Visualizations
        </h3>
        <span className="text-xs text-gray-400 ml-auto">
          {keys.length} panel{keys.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid — full width for composite panel */}
      <div className="grid gap-3 grid-cols-1">
        {keys.map((key, i) => (
          <button
            key={key}
            onClick={() => setLightbox(i)}
            className="group relative bg-black rounded-xl overflow-hidden border border-gray-800 hover:border-[var(--medical-red)] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-red-900/20"
          >
            <img
              src={`data:image/png;base64,${visualizations[key]}`}
              alt={PANEL_LABELS[key] || key}
              className="w-full object-contain"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2">
              <p className="text-[10px] font-semibold text-white/80 leading-tight truncate">
                {PANEL_LABELS[key] || key}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <LightboxModal
          panels={visualizations}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
