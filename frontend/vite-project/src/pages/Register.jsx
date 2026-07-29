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
    <div className="min-h-screen flex bg-white">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 border-r items-center justify-center flex-col px-12">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <FaGraduationCap className="text-white" />
          </div>

          <h1 className="text-xl font-bold">
            AI Course Builder
          </h1>
        </div>

        <img
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/default-placeholder.png"
          alt=""
          className="rounded-3xl shadow-xl max-w-md"
        />

        <h2 className="text-4xl font-bold mt-10 text-center">
          Build your path
          <br />
          to
          <span className="text-blue-600"> expertise</span>
        </h2>

        <Link
          to="/"
          className="mt-10 flex items-center gap-2 text-gray-500 hover:text-blue-600"
        >
          <FaArrowLeft />
          Back to Home
        </Link>

      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center px-6">

        <div className="w-full max-w-md">

          <div className="mb-8">
            <h1 className="text-4xl font-bold">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Register to start your learning journey.
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