import React from "react";
import { Link } from "react-router-dom";

export default function MissionCTA() {
  return (
    <section className="bg-gradient-to-r from-[var(--medical-red)] to-[var(--medical-blue)] py-20">
      <div className="max-w-5xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          Empowering Medical Professionals with AI Precision
        </h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          LongiTumorSense leverages cutting-edge AI and longitudinal MRI data
          to assist healthcare providers in detecting brain tumors early,
          tracking progression, and improving patient outcomes — all while
          ensuring security and privacy.
        </p>
       <Link to='/auth' > <button className="bg-white cursor-pointer text-[var(--medical-red)] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-300  transition hover:scale-102">
          Get Started
        </button></Link>
      </div>
    </section>
  );
}







