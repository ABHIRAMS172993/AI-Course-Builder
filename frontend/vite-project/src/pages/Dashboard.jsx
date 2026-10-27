import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaUserGraduate,
  FaArrowRight,
} from "react-icons/fa";

const Dashboard = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    total_weeks: 0,
    completed_weeks: 0,
    remaining_weeks: 0,
    total_resources: 0,
    completed_resources: 0,
    progress_percentage: 0,
  });

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(`${API}/dashboard/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(response.data);
    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-slate-700">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 antialiased">
      {/* Sidebar */}
      <Sidebar logout={logout} />

      {/* Main Content Area */}
      {/* FIXED: pt-20 on mobile clears mobile top bar; ml-0 on mobile, lg:ml-64 on desktop */}
      <main className="flex-1 ml-0 lg:ml-64 pt-20 lg:pt-10 p-4 sm:p-6 lg:p-10 transition-all duration-300 min-w-0">
        
        {/* Welcome Header */}
        <div className="mb-6 sm:mb-8 animate-[fadeUp_0.8s_ease-out]">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_linear_infinite]">
              {user?.first_name
                ? `${user.first_name} ${user.last_name || ""}`.trim()
                : (user?.username || "").replace(
                    /^\w/,
                    (char) => char.toUpperCase()
                  )}
            </span>
            <span className="inline-block ml-2 animate-[wave_1.8s_ease-in-out_infinite] origin-[70%_70%]">
              👋
            </span>
          </h1>

          <p className="text-slate-500 mt-1 text-sm sm:text-base animate-[fadeUp_1.1s_ease-out]">
            Continue your AI learning journey and track your overall roadmap progress.
          </p>
        </div>

        {/* Stats Grid - 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Total Weeks */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex items-center justify-between transition-all duration-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Weeks</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 sm:mt-2">
                {dashboard.total_weeks}
              </h2>
            </div>
            <div className="p-3 sm:p-3.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <FaBookOpen size={22} />
            </div>
          </div>

          {/* Card 2: Completed Weeks */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex items-center justify-between transition-all duration-200 hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Weeks</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 sm:mt-2">
                {dashboard.completed_weeks}
              </h2>
            </div>
            <div className="p-3 sm:p-3.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <FaCheckCircle size={22} />
            </div>
          </div>

          {/* Card 3: Resources Completed */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex items-center justify-between transition-all duration-200 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resources Completed</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 sm:mt-2">
                {dashboard.completed_resources}/{dashboard.total_resources}
              </h2>
            </div>
            <div className="p-3 sm:p-3.5 bg-amber-50 text-amber-600 rounded-xl shrink-0">
              <FaClock size={22} />
            </div>
          </div>

          {/* Card 4: Progress */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex items-center justify-between transition-all duration-200 hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Progress</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 sm:mt-2">
                {dashboard.progress_percentage}%
              </h2>
            </div>
            <div className="p-3 sm:p-3.5 bg-purple-50 text-purple-600 rounded-xl shrink-0">
              <FaChartLine size={22} />
            </div>
          </div>
        </div>

        {/* Progress Tracker Banner */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs mt-6 sm:mt-8 p-5 sm:p-6 lg:p-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Overall Progress
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Complete all assigned modules and resources to finish your roadmap.
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl hidden sm:block shrink-0 ml-4">
              <FaUserGraduate size={28} />
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-2">
              <span className="text-slate-600">Completion Rate</span>
              <span className="text-blue-600">{dashboard.progress_percentage}%</span>
            </div>
            
            {/* Gradient Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                style={{
                  width: `${dashboard.progress_percentage}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Quick Action Navigation Cards - 1 col on mobile, 3 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-8">
          
          {/* Primary Action Card */}
          <button
            onClick={() => navigate("/preferences")}
            className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 sm:p-6 text-left shadow-lg shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-bold group-hover:tracking-wide transition-all duration-300">
                Generate Roadmap
              </h2>
              <p className="mt-2 text-blue-100 text-xs sm:text-sm leading-relaxed">
                Create a customized learning path based on your goals.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold mt-6 text-white/90 group-hover:gap-3 transition-all">
              <span>Get Started</span>
              <FaArrowRight size={12} />
            </div>
          </button>

          {/* Secondary Action Card 1 */}
          <button
            onClick={() => navigate("/roadmap")}
            className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 text-left hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Continue Learning
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Resume your latest active roadmap modules.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 mt-6 group-hover:gap-3 transition-all">
              <span>View Roadmap</span>
              <FaArrowRight size={12} />
            </div>
          </button>

          {/* Secondary Action Card 2 */}
          <button
            onClick={() => navigate("/profile")}
            className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 text-left hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                View Profile
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Manage your profile details and settings.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 mt-6 group-hover:gap-3 transition-all">
              <span>Manage Profile</span>
              <FaArrowRight size={12} />
            </div>
          </button>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;