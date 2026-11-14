import { useState, useEffect } from "react";
import axios from "axios";
import { FaClockRotateLeft, FaBolt } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

const PreferenceHeader = () => {
  const API = import.meta.env.VITE_API_URL || "/api";

  const [lastGenerated, setLastGenerated] = useState("Never");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmapDate = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API}/roadmap/my-roadmaps/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.length > 0) {
          const latestDate = new Date(response.data[0].created_at);


          setLastGenerated(
            latestDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          );
        }
      } catch (err) {
        console.error("Error fetching roadmap date:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmapDate();
  }, [API]);

  return (
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
        {/* Title & Badge */}
        <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <HiSparkles size={12} className="text-blue-600" />
              <span>AI-Powered Generator</span>
            </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Roadmap{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Preferences
                </span>
              </h1>

                <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
                  Configure your career goals, experience level, and study habits. Our AI
                  engine will synthesize an optimized weekly curriculum tailored for you.
                </p>
              </div>

                    {/* Info Stats Badges */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                      {/* Last Generated */}
                      <div className="flex items-center gap-3.5 px-4 py-3 sm:px-5 sm:py-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                          <FaClockRotateLeft size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Last Generated
                            </p>
                              <p className="text-xs sm:text-sm font-extrabold text-slate-800 mt-0.5">
                                {loading ? (
                <span className="inline-block w-12 h-3 bg-slate-200 animate-pulse rounded" />
                                ) : (
                                  lastGenerated
                                )}
                              </p>
                            </div>
                        </div>

                            {/* Engine Status Card */}
                            <div className="relative overflow-hidden flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-md shadow-indigo-950/20 border border-indigo-900/40">
                              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-500/30">
                                <FaBolt size={15} className="text-amber-400" />
                              </div>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                                        AI Engine
                                      </span>
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    </div>
                                    <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                                      Gemini 2.0
                                    </p>
                                  </div>
                              </div>
                            </div>
                          </div>
                          );
};

                          export default PreferenceHeader;