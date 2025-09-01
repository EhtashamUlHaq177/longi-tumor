// src/components/Footer.jsx
import React from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--medical-red)] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold">LongiTumor AI</h2>
          <p className="text-red-100 mt-3 text-sm">
            AI-powered brain tumor detection using multi-modal and longitudinal MRI data.
            Secure. Accurate. Fast.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-red-100 text-sm">
           <Link to='/about'> <li><p className="hover:text-white">About</p></li></Link>
           <Link to='/howtouse'> <li><p  className="hover:text-white">Workflow</p></li></Link>
           <Link to='/contact'> <li><p  className="hover:text-white">Contact</p></li></Link>
           <Link to='/auth'> <li><p  className="hover:text-white">Login</p></li></Link>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={20} /></a>
            <a href="mailto:info@longitumor.ai" className="hover:text-white"><Mail size={20} /></a>
          </div>
          <p className="text-red-100 mt-3 text-sm">
            © {new Date().getFullYear()} LongiTumor AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
