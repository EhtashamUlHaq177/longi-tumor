import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/users/forgot-password", { email });
      setSent(true);
      toast.success("If an account exists, a reset link has been sent.");
    } catch (err) {
      setSent(true);
      toast.success("If an account exists, a reset link has been sent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-20">
      <Toaster position="top-right" />
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border-t-4 border-[var(--medical-red)]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        {sent ? (
          <p className="text-green-600 text-center">If an account exists, a reset link has been sent.</p>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <button
              type="submit"
              className="w-full bg-[var(--medical-red)] hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
