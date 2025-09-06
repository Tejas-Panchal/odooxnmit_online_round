import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
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
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 17.93A8.001 8.001 0 014.07 13H7c.55 0 1 .45 1 1 0 2.21 1.79 4 4 4v1.93zM4.07 11A8.001 8.001 0 0111 4.07V6c0 .55-.45 1-1 1H6c-.55 0-1 .45-1 1v3H4.07zM13 4.07A8.001 8.001 0 0119.93 11H18c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1h-3V4.07zM13 20v-1c0-.55.45-1 1-1h3c.55 0 1-.45 1-1v-3h1.93A8.001 8.001 0 0113 20z"/>
        </svg>
        <span>www.SynergySphere.com</span>
      </div>
      <div>Synergy Sphere</div>
      <div>Synergy Sphere</div>
      <div>Synergy Sphere</div>
      <div>Synergy Sphere</div>
    </div>
  </footer>
);

export default function LoginPage() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/project-dashboard");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#5B6EA3] text-white">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo />
            <span className="text-xl font-semibold">CompanyName</span>
          </div>
          <nav className="hidden sm:flex items-center space-x-8">
            <a className="hover:opacity-90" href="#">Home</a>
            <a className="hover:opacity-90" href="#">About</a>
            <a className="hover:opacity-90" href="#">Services</a>
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
      <main className="flex-1 grid place-items-center px-4">
        <div className="w-full max-w-md bg-white/90 rounded-xl border border-gray-300 shadow-sm p-8">
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#1F3B73] text-center">
            Log into Account
          </h1>

          <form className="mt-8 space-y-4"
            onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                type="email"
                className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A6FCF]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                type="password"
                className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A6FCF]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#C7D5E4] text-gray-900 font-semibold py-2.5 hover:brightness-95"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="text-center">
              <Link
                to="/register"
                className="text-sm font-semibold text-[#1F3B73] underline"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
