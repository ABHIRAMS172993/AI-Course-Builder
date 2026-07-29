import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

const MyRoadmaps = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoadmaps();
  }, []);

  const loadRoadmaps = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(`${API}/roadmap/my-roadmaps/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRoadmaps(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoadmap = async (id) => {
    if (!window.confirm("Delete this roadmap?")) return;

    try {
      const token = localStorage.getItem("access");

      await axios.delete(`${API}/roadmap/my-roadmaps/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadRoadmaps();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center px-4 text-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium">
          Loading your roadmaps...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased">
      <div className="flex">
        <Sidebar />

        {/* 
          Fixes applied:
          - `ml-0 lg:ml-64`: Removes fixed left margin on mobile/tablet.
          - `pt-20 lg:pt-8`: Ensures top mobile navbar/header clearance.
          - `px-4 sm:px-6 lg:px-8`: Scaled side padding.
        */}
        <main className="flex-1 ml-0 lg:ml-64 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-12 max-w-7xl mx-auto w-full min-w-0 transition-all duration-300">
          {/* Header Section */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              My Learning Roadmaps
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Manage and continue your AI-generated learning paths.
            </p>
          </div>

          {/* Empty State */}
          {roadmaps.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-12 text-center max-w-md mx-auto my-8 sm:my-12">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                🗺️
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                No Roadmaps Found
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                You haven't generated any learning roadmaps yet. Head over to
                Preferences to create one!
              </p>
              <button
                onClick={() => navigate("/preferences")}
                className="mt-6 w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Create Roadmap
              </button>
            </div>
          )}

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {roadmaps.map((roadmap) => (
              <div
                key={roadmap.roadmap_id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Top Bar: ID Badge & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider truncate">
                      Roadmap #{roadmap.roadmap_id}
                    </span>
                    <div className="flex-shrink-0">
                      {roadmap.completed ? (
                        <span className="inline-flex items-center bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title / Goal */}
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-2 leading-snug">
                    {roadmap.goal}
                  </h2>

                  {/* Metadata Details */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-600">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-semibold text-slate-800">
                        {roadmap.weeks} Weeks
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Created</span>
                      <span className="font-semibold text-slate-800">
                        {new Date(roadmap.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3 mt-5 pt-4 border-t border-slate-100">
                  <button
                    onClick={() =>
                      navigate(`/roadmap/${roadmap.roadmap_id}`)
                    }
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer text-center"
                  >
                    Open
                  </button>

                  <button
                    onClick={() => deleteRoadmap(roadmap.roadmap_id)}
                    className="px-3 sm:px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium py-2.5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyRoadmaps;