import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const signupFormRef = useRef(null);

  const loginFormRef = useRef(null);
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);



  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(signupFormRef.current);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    toast.loading("Submitting request for verification...");


    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.dismiss();
      if (response.status === 201) {
        toast.success(
          "Your request has been submitted successfully. You will be notified after verification."
        );
        if (signupFormRef.current) {
          signupFormRef.current.reset();
        }
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (err) {
      toast.dismiss();
      toast.error(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }

  };


  // LOGIN HANDLER
  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(loginFormRef.current);
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  //   toast.loading("Logging in...");
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/users/login",
  //       { email, password },
  //       { withCredentials: true }
  //     );
  //     toast.dismiss();
  //     if (response.data.success) {
  //       toast.success("Login successful!");
  //       // Optionally save user info/token here
  //       navigate("/dashboard");
  //     } else {
  //       toast.error(response.data.message || "Login failed.");
  //     }
  //   } catch (err) {
  //     toast.dismiss();
  //     toast.error(
  //       err.response?.data?.message || "Login failed. Please try again."
  //     );
  //   }
  // };





  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(loginFormRef.current);
    const email = formData.get("email");
    const password = formData.get("password");

    toast.loading("Logging in...");
    try {
      // Try user login first
      const userRes = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      toast.dismiss();
      // if (userRes.data.success) {

      //   localStorage.setItem("authType", "user"); // <-- set here
      //   // localStorage.removeItem("userName");
      //   localStorage.setItem("userName", response.data.user.name); // or whatever field is correct
      //   toast.success("User login successful!");
      //   navigate("/dashboard");
      //   // After successful user login
       
      //   return;
      // }
            if (userRes.data.success) {
        localStorage.setItem("authType", "user");
        localStorage.setItem("userName", userRes.data.user.fullName); // <-- FIXED
        toast.success("User login successful!");
        navigate("/dashboard");
        window.location.reload();
        return;
      }
    } catch (userErr) {
      // If user login fails, try admin login
      try {
        const adminRes = await axios.post(
          "http://localhost:5000/api/admin/login",
          { email, password },
          { withCredentials: true }
        );
        toast.dismiss();
        if (adminRes.data.message === "Login successful" || adminRes.data.adminId) {
          
          localStorage.setItem("authType", "admin"); // <-- set here
          localStorage.removeItem("userName");
          toast.success("Admin login successful!");
          navigate("/googleadmin");
          window.location.reload();
          // After successful admin login
          return;
        } else {
          toast.error(adminRes.data.message || "Login failed.");
        }
      } catch (adminErr) {
        toast.dismiss();
        toast.error(
          adminErr.response?.data?.message || "Login failed. Please try again."
        );
      }
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-20">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border-t-4 border-[var(--medical-red)]">
        <h2 className="text-3xl font-bold text-center  text-gray-800 mb-6  ">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {isLogin ? (
          // LOGIN FORM
          <form className="space-y-5" ref={loginFormRef} onSubmit={handleLoginSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <button
              type="submit"
              className="w-full bg-[var(--medical-red)] hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>
        ) : (
          // SIGNUP FORM
          <form
            ref={signupFormRef}
            className="space-y-5"
            onSubmit={handleSignupSubmit}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization / Hospital Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <input
              type="text"
              name="specialty"
              placeholder="Specialty (e.g., Neurosurgeon)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <input
              type="file"
              name="certificate"
              accept=".jpg,.jpeg,.png,.pdf"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-[var(--medical-red)] hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Submit Request
            </button>
          </form>
        )}

        <p className="text-center text-gray-600 mt-6">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-[var(--medical-red)] font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-[var(--medical-red)] font-semibold hover:underline cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
