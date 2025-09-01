import React from "react";
import { ShieldCheck, Brain, Lock } from "lucide-react";
import AboutImg from '../../assets/images/About.jpg';
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-white text-gray-800 mt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-[var(--medical-red)] to-pink-400 py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            About <span className="text-yellow-200">LongiTumorSense</span>
          </h1>
          <p className="mt-4 text-lg text-pink-50 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing brain tumor detection through AI, multi-modal MRI analysis, and longitudinal data insights — helping doctors save lives with precision.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
      </section>

      {/* Story / Mission */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={AboutImg}
            alt="Medical AI team"
            className="rounded-3xl shadow-xl border-4 border-[var(--medical-red)]"
          />
          <div className="absolute -bottom-6 -right-6 bg-[var(--medical-red)] text-white px-6 py-4 rounded-xl shadow-lg">
            <span className="block text-2xl font-bold">5+</span>
            <span className="text-sm">Years of AI Research</span>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-[var(--medical-red)] mb-4">Our Mission</h2>
          <p className="leading-relaxed text-gray-700 mb-4">
            LongiTumorSense exists to empower healthcare professionals with the tools they need for **accurate, fast, and reliable** brain tumor detection. By tracking tumor changes over time, our AI delivers **deeper clinical insights** that drive better patient outcomes.
          </p>
          <p className="leading-relaxed text-gray-700">
            We are not just building software — we are building a **safer, smarter, and more connected future for healthcare**.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--medical-red)] mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We blend **cutting-edge AI**, **data privacy**, and **clinical accuracy** into one seamless platform for healthcare professionals.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Brain className="w-12 h-12 text-[var(--medical-red)]" />,
                title: "AI Accuracy",
                desc: "Our algorithms are trained on diverse MRI datasets for unmatched detection precision."
              },
              {
                icon: <ShieldCheck className="w-12 h-12 text-[var(--medical-red)]" />,
                title: "Longitudinal Insights",
                desc: "We don’t just detect tumors — we monitor their changes over time for better treatment plans."
              },
              {
                icon: <Lock className="w-12 h-12 text-[var(--medical-red)]" />,
                title: "Data Security",
                desc: "Your patient data is encrypted end-to-end, ensuring total compliance and privacy."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-pink-100 to-pink-200 py-16 text-center">
        <h2 className="text-3xl font-bold text-[var(--medical-red)] mb-4">
          Be Part of the Future of AI in Healthcare
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-6">
          Experience how AI can transform brain tumor detection and treatment planning — faster, safer, smarter.
        </p>
        <Link to='/auth'> <p
          
          className="inline-block px-8 py-4 bg-[var(--medical-red)] text-white rounded-full shadow-lg hover:bg-red-700 transition"
        >
          Get Started Today
        </p></Link>
      </section>
    </div>
  );
}
