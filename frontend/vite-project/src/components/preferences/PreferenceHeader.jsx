import { useState, useEffect } from "react";
import axios from "axios";
import { FaWandMagicSparkles, FaClockRotateLeft } from "react-icons/fa6";

const PreferenceHeader = () => {
  const API = import.meta.env.VITE_API_URL;

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
    <div className="mb-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800/60 pb-8">
      {/* Title & Badge */}
      <div className="max-w-2xl">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-100/80 dark:border-indigo-500/20 rounded-full text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-sm shadow-indigo-500/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-400"></span>
          </span>
          AI Powered
        </div>

        {/* Premium Gradient Typography */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Roadmap <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Preferences</span>
        </h1>

        <p className="mt-3 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Tell us about your goals and we'll generate a personalized, step-by-step 
          learning path just for you.
        </p>
      </div>

      {/* Info Cards Container (Aligned Horizontally) */}
      <div className="flex items-center gap-3 sm:gap-4 w-full xl:w-auto">
        {/* Last Generated Card (Glassmorphic) */}
        <div className="group flex-1 xl:flex-initial bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-500/10 dark:to-blue-500/10 flex items-center justify-center shrink-0 border border-indigo-100/50 dark:border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
            <FaClockRotateLeft className="text-indigo-600 dark:text-indigo-400 text-base sm:text-lg transition-transform group-hover:rotate-[-15deg] duration-300" />
          </div>

          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Last Generated
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 min-h-[16px] sm:min-h-[20px] flex items-center">
              {loading ? (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"></span>
                </span>
              ) : (
                lastGenerated
              )}
            </p>
          </div>
        </div>

        {/* Hero Feature Tag (Interactive Card with Light Sweep/Shine Effect) */}
        <div className="group relative overflow-hidden flex flex-1 xl:flex-initial items-center gap-3 sm:gap-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 text-white rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/40 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
          {/* Light sweep element */}
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-110 transition-transform duration-300">
            <FaWandMagicSparkles className="text-base sm:text-xl text-indigo-100 group-hover:text-white transition-colors duration-300" />
          </div>
          
          <div className="relative z-10">
            <p className="font-bold text-xs sm:text-sm tracking-wide leading-tight">AI Roadmap</p>
            <p className="text-[10px] sm:text-xs text-indigo-200 mt-0.5 font-medium group-hover:text-indigo-100 transition-colors duration-300">
              Custom Tailored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceHeader;