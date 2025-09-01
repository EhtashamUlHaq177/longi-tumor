// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Upload, FileCheck, UserCheck } from "lucide-react";

// export default function HowItWorks() {
//   const steps = [
//     {
//       icon: <UserCheck className="w-10 h-10 text-primary" />,
//       title: "Sign Up & Verification",
//       description:
//         "Register on the platform and get verified by the admin to ensure only authorized medical practitioners have access.",
//     },
//     {
//       icon: <Upload className="w-10 h-10 text-primary" />,
//       title: "Upload MRI Scans",
//       description:
//         "Upload single or multiple MRI scans for tumor detection, progression analysis, and outcome prediction.",
//     },
//     {
//       icon: <FileCheck className="w-10 h-10 text-primary" />,
//       title: "Get Reports & Recommendations",
//       description:
//         "Receive detailed reports with tumor detection results, survival chances, and personalized treatment suggestions.",
//     },
//   ];

//   return (
//     <section className="bg-white py-16" id="how-it-works">
//       <div className="container mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center text-primary mb-12">
//           How LongiTumorSense Works
//         </h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {steps.map((step, index) => (
//             <Card
//               key={index}
//               className="shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
//             >
//               <CardHeader className="flex flex-col items-center">
//                 {step.icon}
//                 <CardTitle className="mt-4 text-xl text-center">
//                   {step.title}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600 text-center">{step.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }













// import React from "react";
// import { Upload, FileCheck, UserCheck } from "lucide-react";

// export default function HowItWorks() {
//   const steps = [
//     {
//       icon: <UserCheck className="w-10 h-10 text-primary" />,
//       title: "Sign Up & Verification",
//       description:
//         "Register on the platform and get verified by the admin to ensure only authorized medical practitioners have access.",
//     },
//     {
//       icon: <Upload className="w-10 h-10 text-primary" />,
//       title: "Upload MRI Scans",
//       description:
//         "Upload single or multiple MRI scans for tumor detection, progression analysis, and outcome prediction.",
//     },
//     {
//       icon: <FileCheck className="w-10 h-10 text-primary" />,
//       title: "Get Reports & Recommendations",
//       description:
//         "Receive detailed reports with tumor detection results, survival chances, and personalized treatment suggestions.",
//     },
//   ];

//   return (
//     <section className="bg-white py-16" id="how-it-works">
//       <div className="container mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center text-primary mb-12">
//           How LongiTumorSense Works
//         </h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
//             >
//               {step.icon}
//               <h3 className="mt-4 text-xl font-semibold text-center">
//                 {step.title}
//               </h3>
//               <p className="text-gray-600 text-center mt-2">
//                 {step.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



































// import React from "react";
// import { Upload, FileCheck, UserCheck } from "lucide-react";

// export default function HowItWorks() {
//   const steps = [
//     {
//       icon: <UserCheck className="w-10 h-10 text-primary" />,
//       title: "Sign Up & Verification",
//       description:
//         "Register on the platform and get verified by the admin to ensure only authorized medical practitioners have access.",
//     },
//     {
//       icon: <Upload className="w-10 h-10 text-primary" />,
//       title: "Upload MRI Scans",
//       description:
//         "Upload single or multiple MRI scans for tumor detection, progression analysis, and outcome prediction.",
//     },
//     {
//       icon: <FileCheck className="w-10 h-10 text-primary" />,
//       title: "Get Reports & Recommendations",
//       description:
//         "Receive detailed reports with tumor detection results, survival chances, and personalized treatment suggestions.",
//     },
//   ];

//   return (
//     <section className="bg-medicalPink py-16" id="how-it-works">
//       <div className="container mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center text-primary mb-12">
//           How LongiTumorSense Works
//         </h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-lg p-6 border border-medicalPink hover:shadow-xl  transition-all duration-300 flex flex-col items-center"
//             >
//               <div className="bg-medicalPink rounded-full p-4 mb-4">
//                 {step.icon}
//               </div>
//               <h3 className="mt-2 text-xl font-semibold text-center text-primary">
//                 {step.title}
//               </h3>
//               <p className="text-gray-600 text-center mt-2">
//                 {step.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }













import React from "react";
import { UserCheck, Upload, Cpu, FileSearch, FileCheck } from "lucide-react";

export default function Workflow() {
  const steps = [
    {
      icon: <UserCheck className="w-10 h-10 text-[var(--medical-red)]" />,
      title: "Sign Up & Verification",
      description:
        "Register and get verified by the admin to ensure only authorized medical practitioners can access the platform.",
    },
    {
      icon: <Upload className="w-10 h-10 text-[var(--medical-red)]" />,
      title: "Upload MRI Scans",
      description:
        "Securely upload single or multiple MRI scans for tumor detection, progression tracking, and prediction analysis.",
    },
    {
      icon: <Cpu className="w-10 h-10 text-[var(--medical-red)]" />,
      title: "AI Processing",
      description:
        "Advanced AI analyzes scans using multi-modal and longitudinal data for highly accurate results.",
    },
    {
      icon: <FileCheck className="w-10 h-10 text-[var(--medical-red)]" />,
      title: "Get Reports & Recommendations",
      description:
        "Receive a detailed tumor detection report along with personalized treatment and follow-up suggestions.",
    },
  ];

  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-[var(--medical-red)] mb-4">
          AI-Powered Workflow
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          LongiTumorSense ensures a secure, accurate, and efficient workflow — from verification to advanced AI analysis — 
          helping medical professionals make informed decisions for brain tumor detection and treatment planning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="bg-red-50 rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
