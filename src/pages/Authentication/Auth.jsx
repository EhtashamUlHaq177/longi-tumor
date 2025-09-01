// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Auth() {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleForm = () => setIsLogin(!isLogin);

//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
//     alert("Your request has been submitted successfully. You will be notified after verification.");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-20">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border-t-4 border-[var(--medical-red)]">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           {isLogin ? "Login" : "Sign Up"}
//         </h2>

//         {isLogin ? (
//           // LOGIN FORM
//           <form className="space-y-5">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-[var(--medical-red)] hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
//             >
//               Login
//             </button>
//           </form>
//         ) : (
//           // SIGNUP FORM
//           <form className="space-y-5 " onSubmit={handleSignupSubmit}>
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Organization / Hospital Name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Specialty (e.g., Neurosurgeon)"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png,.pdf"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-[var(--medical-red)] hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
//             >
//               Submit Request
//             </button>
//           </form>
//         )}

//         <p className="text-center text-gray-600 mt-6">
//           {isLogin ? (
//             <>
//               Don’t have an account?{" "}
//               <button onClick={toggleForm} className="text-[var(--medical-red)] font-semibold hover:underline cursor-pointer">
//                 Sign Up
//               </button>
//             </>
//           ) : (
//             <>
//               Already have an account?{" "}
//               <button onClick={toggleForm} className="text-[var(--medical-red)] font-semibold hover:underline cursor-pointer">
//                 Login
//               </button>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// }

















































// import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// export default function Auth() {
//   const [isLogin, setIsLogin] = useState(true);
//   const signupFormRef = useRef(null);

//   const toggleForm = () => setIsLogin(!isLogin);

//   const handleSignupSubmit = (e) => {
//     e.preventDefault();

//     toast.loading("Submitting request for verification...");

//     setTimeout(() => {
//       toast.dismiss();
//       toast.success(
//         "Your request has been submitted successfully. You will be notified after verification."
//       );

//       // Clear form fields
//       if (signupFormRef.current) {
//         signupFormRef.current.reset();
//       }
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-20">
//       <Toaster position="top-right" reverseOrder={false} />
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border-t-4 border-[var(--medical-red)]">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           {isLogin ? "Login" : "Sign Up"}
//         </h2>

//         {isLogin ? (
//           // LOGIN FORM
//           <form className="space-y-5">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-[var(--medical-red)] hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
//             >
//               Login
//             </button>
//           </form>
//         ) : (
//           // SIGNUP FORM
//           <form
//             ref={signupFormRef}
//             className="space-y-5"
//             onSubmit={handleSignupSubmit}
//           >
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Organization / Hospital Name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Specialty (e.g., Neurosurgeon)"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
//               required
//             />
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png,.pdf"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-[var(--medical-red)] hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
//             >
//               Submit Request
//             </button>
//           </form>
//         )}

//         <p className="text-center text-gray-600 mt-6">
//           {isLogin ? (
//             <>
//               Don’t have an account?{" "}
//               <button
//                 onClick={toggleForm}
//                 className="text-[var(--medical-red)] font-semibold hover:underline cursor-pointer"
//               >
//                 Sign Up
//               </button>
//             </>
//           ) : (
//             <>
//               Already have an account?{" "}
//               <button
//                 onClick={toggleForm}
//                 className="text-[var(--medical-red)] font-semibold hover:underline cursor-pointer"
//               >
//                 Login
//               </button>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// }

















































import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const signupFormRef = useRef(null);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(signupFormRef.current);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    toast.loading("Submitting request for verification...");

    setTimeout(() => {
      toast.dismiss();
      toast.success(
        "Your request has been submitted successfully. You will be notified after verification."
      );

      // Clear form fields
      if (signupFormRef.current) {
        signupFormRef.current.reset();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-20">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border-t-4 border-[var(--medical-red)]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {isLogin ? (
          // LOGIN FORM
          <form className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--medical-red)]"
              required
            />
        <Link to='/dashboard'>    <button
              type="submit"
              className="w-full bg-[var(--medical-red)] hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Login
            </button></Link>
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
              name="file"
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
