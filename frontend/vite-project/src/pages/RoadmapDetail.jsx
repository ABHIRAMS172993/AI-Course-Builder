import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const RoadmapDetail = () => {
  const API = import.meta.env.VITE_API_URL;
  const { roadmap_id } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await axios.get(
          `${API}/roadmap/my-roadmaps/${roadmap_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRoadmap(response.data);
        setWeeks(response.data.weeks || []);
      } catch (err) {
        console.error("Error fetching roadmap:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRoadmap();
  }, [roadmap_id, API]);

  // Progress calculation
  const completedWeeks = weeks.filter((week) => week.completed).length;
  const progressPercentage =
    weeks.length > 0 ? Math.round((completedWeeks / weeks.length) * 100) : 0;


   const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Generate certificate
  const downloadCertificate = async (id) => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(
        `${API}/roadmap/certificate/download/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );



      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading certificate:", err);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex">
        <Sidebar logout={logout} />

        {/* Responsive Content Container */}
        <main className="flex-1 ml-0 lg:ml-64 px-4 sm:px-6 lg:px-8 pt-16 lg:pt-8 pb-12 w-full max-w-7xl mx-auto min-w-0 transition-all duration-300">
          
          {loading ? (
            <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-md">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading roadmap details...</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="bg-white rounded-2xl shadow-md p-5 sm:p-8 mb-6 sm:mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700 leading-tight">
                      {roadmap?.career_goal || `Roadmap #${roadmap_id}`}
                    </h1>
                    <p className="text-gray-600 mt-2 text-base sm:text-lg">
                      Course: {roadmap?.course || "Custom AI Roadmap"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Roadmap ID: {roadmap_id}
                    </p>
                  </div>

                  <div className="flex items-center md:flex-col justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                    <div className="text-3xl sm:text-4xl font-bold text-blue-700">
                      {progressPercentage}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 font-medium">
                      Overall Progress
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2 font-medium">
                    <span>Completed</span>
                    <span>
                      {completedWeeks}/{weeks.length} weeks
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Weekly Roadmap */}
              <div className="space-y-4 sm:space-y-6">
                {weeks.map((week) => (
                  <div
                    key={week.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 border-l-4 border-blue-600"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                            Week {week.week}
                          </span>
                          {week.completed ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                              Completed
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                              Pending
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                          {week.topic_name}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          Estimated study time: {week.hours} hours
                        </p>
                      </div>

                      <div className="text-2xl sm:text-3xl flex-shrink-0">
                        {week.completed ? "✅" : "📚"}
                      </div>
                    </div>

                    {/* Resources */}
                    {week.resources && week.resources.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
                          Learning Resources
                        </h3>
                        <div className="space-y-3">
                          {week.resources.map((item) => (
                            <div
                              key={item.id}
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4"
                            >
                              <div className="min-w-0 flex-1">
                                <a
                                  href={item.resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 font-semibold hover:underline text-sm sm:text-base break-words block"
                                >
                                  {item.resource.title}
                                </a>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {item.resource.type}
                                </p>
                                {item.resource.description && (
                                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
                                    {item.resource.description}
                                  </p>
                                )}
                              </div>

                              <div className="self-start sm:self-center flex-shrink-0">
                                {item.completed ? (
                                  <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold inline-block">
                                    ✅ Completed
                                  </span>
                                ) : (
                                  <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-semibold inline-block">
                                    Pending
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Certificate Section */}
              {weeks.length > 0 && completedWeeks === weeks.length && (
                <div className="mt-8 sm:mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-10 text-center text-white">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎓</div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    Congratulations!
                  </h2>
                  <p className="text-green-100 text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed">
                    You have successfully completed all weeks in this roadmap.
                    Your certificate is ready to download!
                  </p>
                  <button
                    onClick={() => downloadCertificate(roadmap_id)}
                    className="w-full sm:w-auto bg-white text-green-700 hover:bg-slate-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Generate Certificate
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default RoadmapDetail;