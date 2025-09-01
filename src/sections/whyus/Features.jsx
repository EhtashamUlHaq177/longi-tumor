// src/sections/features/Features.jsx
import React from "react";
import { Brain, Activity, ShieldCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Brain className="w-10 h-10 text-[var(--medical-blue)]" />,
      title: "AI-Powered Accuracy",
      description:
        "Advanced multimodal deep learning ensures high precision in brain tumor detection across MRI sequences.",
    },
    {
      icon: <Activity className="w-10 h-10 text-[var(--medical-blue)]" />,
      title: "Longitudinal Tracking",
      description:
        "Track tumor progression over time for better treatment planning and outcome monitoring.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-[var(--medical-blue)]" />,
      title: "Secure & Private",
      description:
        "We prioritize patient confidentiality with strict data encryption and compliance standards.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[var(--light-blue)]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why <span className="text-[var(--medical-blue)]">LongiTumorSense?</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Bringing cutting-edge AI to brain tumor detection with reliability, precision, and
          patient safety at the core.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
