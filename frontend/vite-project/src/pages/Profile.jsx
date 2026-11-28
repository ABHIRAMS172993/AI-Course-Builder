import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaCircleUser,
  FaEnvelope,
  FaUser,
  FaCalendarDays,
  FaRoad,
  FaBook,
  FaClipboardCheck,
  FaCertificate,
  FaArrowRotateRight,
  FaTriangleExclamation,
} from "react-icons/fa6";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const API = import.meta.env.VITE_API_URL || "/api";
  const navigate = useNavigate();

  // Cached user info for instant rendering
  const cachedUser = JSON.parse(localStorage.getItem("user") || "null");

  const [profile, setProfile] = useState(cachedUser);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(!cachedUser);
  const [error, setError] = useState(null);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const loadData = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);

    const authHeaders = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const [profileRes, activityRes] = await Promise.allSettled([
        axios.get(`${API}/roadmap/profile/`, authHeaders),
        axios.get(`${API}/roadmap/latest-roadmap-time/`, authHeaders),
      ]);

      if (profileRes.status === "fulfilled") {
        setProfile(profileRes.value.data);
      } else {
        const status = profileRes.reason?.response?.status;
        if (status === 401) {
          logout();
          return;
        }
        if (!cachedUser) {
          setError(
            profileRes.reason?.response?.status === 502
              ? "Backend server is unreachable (502 Bad Gateway). Please make sure the Django server is running."
              : "Failed to load profile. Please check your connection."
          );
        }
      }

      if (activityRes.status === "fulfilled") {
        setActivity(activityRes.value.data);
      }
    } catch (err) {
      console.error("Profile load error:", err);
      if (!cachedUser) {
        setError("An unexpected error occurred while loading your profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [API]);

  // If loading and no cached user at all
  if (loading && !profile) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar logout={logout} />
        <div className="flex-1 ml-0 lg:ml-64 flex flex-col justify-center items-center p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center animate-spin mb-4">
            <FaArrowRotateRight size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Loading Profile...</h2>
          <p className="text-sm text-slate-500 mt-1">Connecting to learning servers</p>
        </div>
      </div>
    );
  }

  // If fatal error and no profile data
  if (error && !profile) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar logout={logout} />
        <div className="flex-1 ml-0 lg:ml-64 flex flex-col justify-center items-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center mb-4">
            <FaTriangleExclamation size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Unable to Load Profile</h2>
          <p className="text-sm text-slate-500 max-w-md mt-2">{error}</p>
          <button
            onClick={loadData}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-sm transition"
          >
            <FaArrowRotateRight size={14} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/80">
      <Sidebar logout={logout} />

      <main className="flex-1 ml-0 lg:ml-64 pt-20 lg:pt-8 p-4 sm:p-6 lg:p-10 transition-all duration-300 min-w-0">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Offline/Server warning banner if data is degraded */}
          {error && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <FaTriangleExclamation className="text-amber-600 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={loadData}
                className="font-bold underline hover:text-amber-900 shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {/* Profile Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shrink-0 shadow-lg shadow-blue-500/20">
                {(profile?.first_name || profile?.username || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {profile?.first_name
                        ? `${profile.first_name} ${profile.last_name || ""}`.trim()
                        : profile?.username || "Student"}
                    </h1>
                    <p className="text-xs sm:text-sm text-blue-600 font-semibold mt-0.5">
                      @{profile?.username || "username"}
                    </p>
                  </div>

                  <button
                    onClick={loadData}
                    disabled={loading}
                    className="self-center sm:self-start inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                  >
                    <FaArrowRotateRight
                      size={11}
                      className={loading ? "animate-spin text-blue-600" : ""}
                    />
                    <span>{loading ? "Refreshing..." : "Refresh"}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 mt-2 truncate">
                  {profile?.email || "No email registered"}
                </p>
              </div>
            </div>
          </div>

          {/* Stats & Account Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Information Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
                Account Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FaCircleUser size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Full Name
                    </p>
                    <p className="font-bold text-slate-800">
                      {profile?.first_name
                        ? `${profile.first_name} ${profile.last_name || ""}`.trim()
                        : "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <FaUser size={15} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Username
                    </p>
                    <p className="font-bold text-slate-800">
                      {profile?.username || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <FaEnvelope size={15} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="font-bold text-slate-800 break-all">
                      {profile?.email || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <FaCalendarDays size={15} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Member Since
                    </p>
                    <p className="font-bold text-slate-800">
                      {profile?.date_joined
                        ? new Date(profile.date_joined).toLocaleDateString()
                        : "Active Learner"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <FaRoad size={20} />
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {profile?.roadmaps ?? 0}
                </h4>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  Active Roadmaps
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <FaBook size={20} />
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {profile?.completed_courses ?? 0}
                </h4>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  Completed Tracks
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <FaClipboardCheck size={20} />
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {profile?.quiz_passed ?? 0}
                </h4>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  Quizzes Passed
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center">
                <div className="w-11 h-11 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-3">
                  <FaCertificate size={20} />
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {profile?.certificates ?? 0}
                </h4>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  Certificates
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-4">
              Recent Learning Activity
            </h3>

            {activity ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/60 gap-3">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <span className="text-lg">🎯</span>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-xs sm:text-sm truncate">
                      Week {activity.week}: {activity.topic}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {activity.resource}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-400 shrink-0">
                  {new Date(activity.completed_at).toLocaleDateString()}
                </span>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-400 py-2">
                No recent module completions recorded yet.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
