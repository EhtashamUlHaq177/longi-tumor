import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [form, setForm] = useState({ newPass: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.newPass || !form.confirm) {
      toast.error("All fields are required");
      return;
    }
    if (form.newPass !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/users/reset-password", {
        token,
        newPassword: form.newPass
      });
      setSuccess(true);
      toast.success("Password updated successfully");
      setTimeout(() => navigate("/auth"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-20">
      <Toaster position="top-right" />
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border-t-4 border-[var(--medical-red)]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
        {success ? (
          <p className="text-green-600 text-center">Password updated successfully! Redirecting to login...</p>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="password"
              name="newPass"
              placeholder="New Password"
              value={form.newPass}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm New Password"
              value={form.confirm}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <button
              type="submit"
              className="w-full bg-[var(--medical-red)] hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Saving..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
