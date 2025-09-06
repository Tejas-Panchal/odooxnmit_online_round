import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logo = () => (
  <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center ring-2 ring-white/30">
    <div className="h-7 w-7 rounded-full bg-white grid place-items-center">
      <span className="font-semibold text-[#5B6EA3]">S</span>
    </div>
  </div>
);

const Footer = () => (
  <footer className="mt-16 w-full bg-[#545069] text-white">
    <div className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-1 sm:grid-cols-5 gap-6 text-sm">
      <div className="flex items-center space-x-2">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 17.93A8.001 8.001 0 014.07 13H7c.55 0 1 .45 1 1 0 2.21 1.79 4 4 4v1.93zM4.07 11A8.001 8.001 0 0111 4.07V6c0 .55-.45 1-1 1H6c-.55 0-1 .45-1 1v3H4.07zM13 4.07A8.001 8.001 0 0119.93 11H18c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1h-3V4.07zM13 20v-1c0-.55.45-1 1-1h3c.55 0 1-.45 1-1v-3h1.93A8.001 8.001 0 0113 20z" />
        </svg>
        <span>www.SynergySphere.com</span>
      </div>
      <div>Synergy_Sphere</div>
      <div>Synergy_Sphere</div>
      <div>Synergy_Sphere</div>
      <div>Synergy_Sphere</div>
    </div>
  </footer>
);

export default function MarketingRegister() {
  const [agree, setAgree] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [what, setWhat] = useState("register");

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      setWhat("verify");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const Logo = () => (
    <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center ring-2 ring-white/30">
      <div className="h-7 w-7 rounded-full bg-white grid place-items-center">
        <span className="font-semibold text-[#5B6EA3]">S</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#5B6EA3] text-white">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo />
            <span className="text-xl font-semibold">SynergySphere</span>
          </div>
          <nav className="hidden sm:flex items-center space-x-8">
            <a className="hover:opacity-90" href="#">
              Home
            </a>
            <a className="hover:opacity-90" href="#">
              About
            </a>
            <a className="hover:opacity-90" href="#">
              Services
            </a>
            <Link
              to="/register"
              className="px-4 py-1.5 rounded-full bg-[#A8DCC4] text-gray-800 font-medium hover:brightness-95"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Card */}
      {what === "register" && (
        <main className="flex-1 grid place-items-center px-4">
          <div className="w-full max-w-md bg-white/90 rounded-xl border border-gray-300 shadow-sm p-8">
            <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#1F3B73] text-center">
              Create an Account
            </h1>

            {/* Form */}
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                  className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A6FCF]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                  type="text"
                  className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A6FCF]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A6FCF]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A6FCF]"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start text-xs text-gray-700">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 mr-2 accent-[#4A6FCF]"
                />
                <label htmlFor="agree">
                  By creating an account, I agree to our{" "}
                  <a href="#" className="underline">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#C7D5E4] text-gray-900 font-semibold py-2.5 hover:brightness-95 disabled:opacity-60"
              >
                {loading ? "Registering..." : "Create Account"}
              </button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-[#1F3B73] underline"
                >
                  Already have an account? Log in
                </Link>
              </div>
            </form>
          </div>
        </main>
      )}

      {what === "verify" && (
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
      )}

      <Footer />
    </div>
  );
}
