// import React from "react";
// import { UserCheck, Upload, FileCheck, BarChart3, Share2 } from "lucide-react";

// export default function HowToUse() {
//   const steps = [
//     {
//       icon: <UserCheck className="w-12 h-12 text-[var(--medical-red)]" />,
//       title: "1. Sign Up & Verify",
//       desc: "Create an account and get verified by the admin to ensure secure access for healthcare professionals."
//     },
//     {
//       icon: <Upload className="w-12 h-12 text-[var(--medical-red)]" />,
//       title: "2. Upload MRI Scans",
//       desc: "Easily upload single or multiple MRI scans through our encrypted uploader."
//     },
//     {
//       icon: <FileCheck className="w-12 h-12 text-[var(--medical-red)]" />,
//       title: "3. AI Analysis",
//       desc: "Our AI processes the scans, detecting tumors and tracking progression over time."
//     },
//     {
//       icon: <BarChart3 className="w-12 h-12 text-[var(--medical-red)]" />,
//       title: "4. Review Detailed Report",
//       desc: "Get a comprehensive report with tumor detection, survival probability, and progression trends."
//     },
//     {
//       icon: <Share2 className="w-12 h-12 text-[var(--medical-red)]" />,
//       title: "5. Share & Collaborate",
//       desc: "Easily share results with medical teams or export for hospital records."
//     }
//   ];

//   return (
//     <div className="bg-white">
//       {/* Hero */}
//       <section className="bg-gradient-to-r from-[var(--medical-red)] to-pink-500 py-20 text-center text-white">
//         <h1 className="text-4xl font-extrabold mb-4">How to Use LongiTumorSense</h1>
//         <p className="max-w-2xl mx-auto text-lg opacity-90">
//           Follow these simple steps to start detecting, monitoring, and analyzing brain tumors with precision.
//         </p>
//       </section>

//       {/* Steps Section */}
//       <section className="py-20 max-w-6xl mx-auto px-6">
//         <div className="grid md:grid-cols-5 gap-8">
//           {steps.map((step, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center"
//             >
//               <div className="bg-red-50 rounded-full p-5 mb-4">
//                 {step.icon}
//               </div>
//               <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
//               <p className="text-gray-600 text-sm">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Tip Section */}
//       <section className="bg-gray-50 py-16">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-2xl font-bold text-[var(--medical-red)] mb-4">Pro Tip 💡</h2>
//           <p className="text-gray-700">
//             For best results, upload scans in DICOM format and include **longitudinal MRI data** — this allows our AI to provide deeper progression analysis.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }





















import React from "react";
import { UserCheck, Upload, FileCheck, BarChart3, Share2 } from "lucide-react";

export default function HowToUse() {
  const steps = [
    {
      icon: <UserCheck className="w-10 h-10 text-[var(--medical-red)]" />,
      title: "Sign Up & Verify",
      desc: "Create an account and get verified by the admin to ensure secure access for healthcare professionals."
    },
    {
      icon: <Upload className="w-10 h-10 text-[var(--medical-red)]" />,
      title: "Upload MRI Scans",
      desc: "Easily upload single or multiple MRI scans through our encrypted uploader."
    },
    {
      icon: <FileCheck className="w-10 h-10 text-[var(--medical-red)]" />,
      title: "AI Analysis",
      desc: "Our AI processes the scans, detecting tumors and tracking progression over time."
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-[var(--medical-red)]" />,
      title: "Review Detailed Report",
      desc: "Get a comprehensive report with tumor detection, survival probability, and progression trends."
    },
    {
      icon: <Share2 className="w-10 h-10 text-[var(--medical-red)]" />,
      title: "Share & Collaborate",
      desc: "Easily share results with medical teams or export for hospital records."
    }
  ];

  return (
    <div className="bg-white mt-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[var(--medical-red)] to-pink-500 py-20 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">How to Use LongiTumorSense</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          A step-by-step guide to start detecting, monitoring, and analyzing brain tumors with precision.
        </p>
      </section>

      {/* Timeline */}
      <section className="py-20 max-w-5xl mx-auto px-6 ">
        <div className="relative border-l-4 border-[var(--medical-red)]">
          {steps.map((step, index) => (
            <div key={index} className="mb-12 ml-8 relative">
              <span className="absolute -left-[34px] flex mx-5 items-center justify-center w-12 h-12 bg-red-50 rounded-full border-4 border-[var(--medical-red)]">
                {step.icon}
              </span>
              <div className="ml-15">
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tip */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[var(--medical-red)] mb-4">Pro Tip 💡</h2>
          <p className="text-gray-700">
            For best results, upload scans in DICOM format and include **longitudinal MRI data** — 
            this allows our AI to provide deeper progression analysis.
          </p>
        </div>
      </section>
    </div>
  );
}
