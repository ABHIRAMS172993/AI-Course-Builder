import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaGraduationCap,
  FaBrain,
  FaCheck,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaRightToBracket,
} from "react-icons/fa6";

import { FcGoogle } from "react-icons/fc";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

const Login = () => {

  console.log("Origin:", window.location.origin);
  console.log("Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
    
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
  username: "",
  password: "",
});

  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const storeGoogleCredential = async (e) => {
    
    const response = await axios.post(
      `${API}/accounts/google-login/`
    )
  }
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await axios.post(
      `${API}/accounts/login/`,
      formData
    );

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    const profile = await axios.get(
      `${API}/accounts/profile/`,
      {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      }
    );

    localStorage.setItem( "user",
       JSON.stringify({
         first_name: profile.data.first_name,
         last_name: profile.data.last_name,
         username: profile.data.username,
         email: profile.data.email
     }))

    alert("Login Successful");

    navigate("/dashboard");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.error ||
      "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};





  return (
    <div className="flex min-h-screen bg-slate-50 lg:bg-white">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">

        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <FaGraduationCap className="text-xl" />
          </div>

          <span className="font-extrabold text-xl text-white tracking-tight">
            AI Course Builder
          </span>
        </div>

        {/* Rich Showcase Component */}
        <div className="relative z-10 my-auto py-8">
          {/* Glass Card Mockup */}
          <div className="relative max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <FaBrain size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Full Stack AI Developer</h4>
                  <p className="text-xs text-blue-200">12 Weeks • 10 hrs/week</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Progress Milestone</span>
                <span className="font-bold text-white">75%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              </div>
            </div>

            <div className="mt-5 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                  <FaCheck />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Next: Transformers & LLMs</p>
                  <p className="text-[10px] text-slate-400">3 Video Tutorials • 1 Quiz</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-blue-300">Week 4</span>
            </div>
          </div>

          <div className="mt-10 text-center max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-white">
              Your journey to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                mastery
              </span>{" "}
              starts here.
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Log in to resume your personal roadmap, review quizzes, and download verified certificates.
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors z-10"
        >
          <FaArrowLeft size={12} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl lg:shadow-none lg:border-none">

          {/* Mobile Logo */}

          <div className="lg:hidden flex items-center gap-2 mb-8">

            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <FaGraduationCap className="text-white" />
            </div>

            <h2 className="font-bold">
              AI Course Builder
            </h2>

          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100 border mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
            <span className="text-xs font-semibold uppercase">
              Secure Login
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-2">
            Welcome back
          </h1>

          <p className="text-gray-500 mb-8">
            Enter your credentials to continue.
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>

            {/* Email */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Username
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
  type="text"
  name="username"
  value={formData.username}
  onChange={handleChange}
  placeholder="Enter username"
  className="w-full pl-11 pr-4 py-3 rounded-lg border bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
/>
              </div>

            </div>

            {/* Password */}

            <div>

              <div className="flex justify-between mb-2">

                <label className="font-semibold text-sm">
                  Password
                </label>

                <button
                  type="button"
                  className="text-blue-600 text-sm"
                >
                  Forgot Password?
                </button>

              </div>

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
  type={showPassword ? "text" : "password"}
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Password"
  className="w-full pl-11 pr-11 py-3 rounded-lg border bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
/>

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-4"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* Remember */}

            <label className="flex items-center gap-2">

              <input type="checkbox" />

              <span className="text-sm">
                Keep me signed in
              </span>

            </label>

            {/* Login */}

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <FaRightToBracket />
              Login
            </button>

          </form>

          {/* Divider */}

          <div className="flex items-center my-8">

            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="mx-4 text-gray-500 text-sm">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-300"></div>

          </div>

          {/* Google */}
          
<GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${API}/accounts/google-login/`,
        {
          credential: credentialResponse.credential,
        }
      );

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      localStorage.setItem(
        "user",
        JSON.stringify({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          username: response.data.username,
          email: response.data.email,
        })
      );
      alert("Google Login Successful");

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data);
    console.log(err);
      alert("Google Login Failed");
    }
  }}
  onError={() => {
    alert("Google Login Failed");
  }}
/>

          {/* Register */}

          <p className="mt-8 text-center text-gray-500">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-1"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;