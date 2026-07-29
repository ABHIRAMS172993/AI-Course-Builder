import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaRoad,
  FaBook,
  FaClipboardCheck,
  FaCertificate,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";

const Profile = () => {
  const API = import.meta.env.VITE_API_URL;

  const [profile, setProfile] = useState(null);
  const [activity, setActivity] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");

    // Axios config reusable headers
    const authHeaders = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API}/roadmap/profile/`, authHeaders);
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    const fetchLastActivity = async () => {
      try {
        const response = await axios.get(
          `${API}/roadmap/latest-roadmap-time/`,
          authHeaders
        );

        setActivity(response.data);
      } catch (err) {
        console.error("Error fetching activity:", err);
      }
    };

    fetchProfile();
    fetchLastActivity();
  }, [API]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold bg-slate-100 p-4 text-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen relative">
      {/* Mobile Top Navigation Header */}
      <div className="lg:hidden flex justify-between items-center bg-white px-6 py-4 shadow-sm border-b sticky top-0 z-30">
        <h1 className="text-xl font-bold text-blue-700">My Profile</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar Container with Overlay for Mobile */}
        <div
          className={`fixed inset-y-0 left-0 z-40 transform lg:transform-none lg:static transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar />
        </div>

        {/* Backdrop for Mobile Sidebar */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all">
          {/* Page Title (Desktop) */}
          <h1 className="hidden lg:block text-3xl font-bold text-blue-700 mb-8">
            My Profile
          </h1>

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl lg:text-5xl font-bold shrink-0">
                {(profile.first_name || profile.username || "")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 break-words w-full sm:w-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {profile.first_name
                    ? `${profile.first_name} ${profile.last_name || ""}`.trim()
                    : profile.username}
                </h2>

                <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base break-all">
                  {profile.email}
                </p>

                <p className="text-blue-600 mt-1 text-sm sm:text-base font-medium">
                  @{profile.username}
                </p>
              </div>
            </div>
          </div>

          {/* Main Grid Section: Account Info & Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 sm:mt-8">
            {/* Account Information Card */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900 border-b pb-3 lg:border-none lg:pb-0">
                Account Information
              </h3>

              <div className="space-y-5">
                {profile.first_name && (
                  <div className="flex items-center gap-4">
                    <FaUserCircle className="text-blue-600 text-xl shrink-0" />
                    <div className="min-w-0">
                      <p className="text-gray-500 text-sm">Full Name</p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        {profile.first_name} {profile.last_name}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <FaUser className="text-blue-600 text-xl shrink-0" />
                  <div className="min-w-0">
                    <p className="text-gray-500 text-sm">Username</p>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                      {profile.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-blue-600 text-xl shrink-0" />
                  <div className="min-w-0">
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base break-all">
                      {profile.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaCalendarAlt className="text-blue-600 text-xl shrink-0" />
                  <div className="min-w-0">
                    <p className="text-gray-500 text-sm">Joined</p>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {new Date(profile.date_joined).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="bg-white rounded-2xl shadow p-5 sm:p-6 text-center flex flex-col justify-center items-center">
                <FaRoad className="text-3xl sm:text-4xl text-blue-600" />
                <h3 className="text-2xl sm:text-3xl font-bold mt-3 text-gray-900">
                  {profile.roadmaps}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">Roadmaps</p>
              </div>

              <div className="bg-white rounded-2xl shadow p-5 sm:p-6 text-center flex flex-col justify-center items-center">
                <FaBook className="text-3xl sm:text-4xl text-green-600" />
                <h3 className="text-2xl sm:text-3xl font-bold mt-3 text-gray-900">
                  {profile.completed_courses}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">Courses</p>
              </div>

              <div className="bg-white rounded-2xl shadow p-5 sm:p-6 text-center flex flex-col justify-center items-center">
                <FaClipboardCheck className="text-3xl sm:text-4xl text-orange-500" />
                <h3 className="text-2xl sm:text-3xl font-bold mt-3 text-gray-900">
                  {profile.quiz_passed}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">Quiz Passed</p>
              </div>

              <div className="bg-white rounded-2xl shadow p-5 sm:p-6 text-center flex flex-col justify-center items-center">
                <FaCertificate className="text-3xl sm:text-4xl text-yellow-500" />
                <h3 className="text-2xl sm:text-3xl font-bold mt-3 text-gray-900">
                  {profile.certificates}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Certificates
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-2xl shadow mt-6 sm:mt-8 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
              Recent Activity
            </h2>

            <ul className="space-y-4">
              {activity ? (
                <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 gap-2">
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <span className="text-lg">✅</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        Week {activity.week}: {activity.topic}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 break-words">
                        {activity.resource}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 self-end sm:self-center shrink-0">
                    {new Date(activity.completed_at).toLocaleDateString()}
                  </span>
                </li>
              ) : (
                <p className="text-gray-500 text-sm">No recent activity.</p>
              )}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;