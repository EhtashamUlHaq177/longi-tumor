
import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/mzddzawd", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(e.target),
      });
      setLoading(false);
      if (res.ok) {
        toast.success("Form submitted successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="bg-white mt-16">
      <Toaster position="top-right" />
      {/* Hero */}
      <section className="bg-gradient-to-r from-[var(--medical-red)] to-pink-500 py-20 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Have questions? Need assistance? We’re here to help you 24/7.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <textarea
              placeholder="Your Message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-[var(--medical-red)] hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            We value your feedback and inquiries. Reach out to us through any of the following channels:
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-[var(--medical-red)]" />
              <span>support@longitumorsense.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-[var(--medical-red)]" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-[var(--medical-red)]" />
              <span>123 Medical Research Park, Islamabad, Pakistan</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
