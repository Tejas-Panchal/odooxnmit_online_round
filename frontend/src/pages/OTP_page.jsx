import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* Color theme
   Header:         #5B6EA3
   CTA (mint):     #A8DCC4
   Footer:         #545069
   Input focus:    #4A6FCF
*/

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Replace with your backend OTP verify API
      await axios.post("http://localhost:5000/api/auth/verify-otp", { otp });
      setLoading(false);
      navigate("/login"); // redirect to login after success
    } catch (err) {
      console.error(err);
      setError("Invalid OTP, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#5B6EA3] text-white">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center ring-2 ring-white/30">
              <div className="h-7 w-7 rounded-full bg-white grid place-items-center">
                <span className="font-semibold text-[#5B6EA3]">S</span>
              </div>
            </div>
            <span className="text-xl font-semibold">CompanyName</span>
          </div>
        </div>
      </header>

      {/* OTP Card */}
      <main className="flex-1 grid place-items-center px-4">
        <div className="w-full max-w-md bg-white/90 rounded-xl border border-gray-300 shadow-sm p-8">
          <h1 className="text-2xl font-extrabold text-[#1F3B73] text-center">
            Verify Your Account
          </h1>
          <p className="text-sm text-gray-600 text-center mt-2">
            Please enter the OTP sent to your email.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleVerify}>
            <div>
              <label className="block text-sm mb-1">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-full border border-gray-300 px-4 py-2 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-[#4A6FCF]"
                maxLength="6"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#A8DCC4] text-gray-900 font-semibold py-2.5 hover:brightness-95 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 w-full bg-[#545069] text-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm">
          © 2025 SynergySphere. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default OtpPage;
