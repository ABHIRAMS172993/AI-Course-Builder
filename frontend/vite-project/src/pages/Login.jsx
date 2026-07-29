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
    <div className="flex min-h-screen bg-white">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 border-r px-12 py-10 flex-col justify-between relative overflow-hidden">

        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-100 blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-blue-200 blur-3xl opacity-40" />

        {/* Logo */}

        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <FaGraduationCap className="text-white" />
          </div>

          <h1 className="font-bold text-xl">
            AI Course Builder
          </h1>
        </div>

        {/* Illustration */}

        <div className="flex flex-col items-center text-center z-10">

          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/default-placeholder.png"
            alt=""
            className="rounded-3xl shadow-xl mb-8 max-w-md"
          />

          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <FaBrain className="text-blue-600" />
            </div>

            <div className="text-left">
              <h3 className="font-semibold">
                AI Powered
              </h3>

              <p className="text-sm text-gray-500">
                Personalized Learning
              </p>
            </div>

            <div className="ml-3">
              <FaCheck className="text-green-500" />
            </div>

          </div>

          <h2 className="text-4xl font-bold mt-10">
            Your journey to
            <br />
            <span className="text-blue-600">mastery</span>
            <br />
            starts here.
          </h2>

          <p className="mt-4 text-gray-500 max-w-md">
            AI-generated learning roadmaps tailored to your goals,
            pace and learning style.
          </p>

          <div className="flex gap-10 mt-10">

            <div>
              <h3 className="font-bold text-xl">100+</h3>
              <p className="text-gray-500 text-sm">
                Topics
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl">AI</h3>
              <p className="text-gray-500 text-sm">
                Personalized
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl">Free</h3>
              <p className="text-gray-500 text-sm">
                Forever
              </p>
            </div>

          </div>

        </div>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600"
        >
          <FaArrowLeft />
          Back to Home
        </Link>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex items-center justify-center px-6">

        <div className="w-full max-w-md">

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