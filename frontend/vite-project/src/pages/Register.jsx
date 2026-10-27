import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaGraduationCap,
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaUserPlus,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/accounts/register/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      if (error.response?.data) {
        const data = error.response.data;

        if (data.username) {
          alert(data.username[0]);
        } else if (data.email) {
          alert(data.email[0]);
        } else if (data.password) {
          alert(data.password[0]);
        } else {
          alert("Registration Failed");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 lg:bg-white">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none" />

        {/* Brand */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <FaGraduationCap className="text-xl" />
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            AI Course Builder
          </span>
        </div>

        {/* Center Visual Mockup */}
        <div className="relative z-10 my-auto py-8">
          <div className="relative max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-blue-300">New Learner Profile</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                AI Ready
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Custom Goal Formulation</h5>
                  <p className="text-[11px] text-slate-400">Tailored to your career timeline</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Curated Media Resources</h5>
                  <p className="text-[11px] text-slate-400">YouTube, documentation, and quizzes</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Verified Certificates</h5>
                  <p className="text-[11px] text-slate-400">Downloadable completion credentials</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Build your path to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                expertise
              </span>
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Create an account in seconds. Start with 100+ free learning tracks.
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

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl lg:shadow-none lg:border-none">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Free Access</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Register now to start your personalized AI journey.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* Username */}

            <div>

              <label className="font-semibold text-sm">
                Username
              </label>

              <div className="relative mt-2">

                <FaUser className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                  className="w-full pl-11 py-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="font-semibold text-sm">
                Email
              </label>

              <div className="relative mt-2">

                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  className="w-full pl-11 py-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="font-semibold text-sm">
                Password
              </label>

              <div className="relative mt-2">

                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-11 py-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-4"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

            </div>

            {/* Confirm Password */}

            <div>

              <label className="font-semibold text-sm">
                Confirm Password
              </label>

              <div className="relative mt-2">

                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-11 py-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                  className="absolute right-4 top-4"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <FaUserPlus />
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            disabled
            hidden
            className="w-full border rounded-lg py-3 flex justify-center items-center gap-3 hover:bg-gray-50"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-blue-600 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;