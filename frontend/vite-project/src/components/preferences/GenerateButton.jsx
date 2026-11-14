import { useState, useEffect } from "react";
import { FaWandMagicSparkles, FaBolt, FaArrowRight, FaShieldHalved } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

      const loadingSteps = [
      "Analyzing target role requirements...",
      "Consulting Gemini 2.0 AI knowledge base...",
      "Sequencing step-by-step learning modules...",
      "Curating vetted tutorials, docs & quizzes...",
      "Finalizing your personalized roadmap...",
      ];

      const GenerateButton = ({loading, generateRoadmap, disabled}) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
        setStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
        setStepIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

      return (
      <div className="pt-6 border-t border-slate-200/80 space-y-4">
        {/* Primary Action Button */}
        <button
          type="button"
          onClick={generateRoadmap}
          disabled={loading || disabled}
          className={`relative overflow-hidden w-full group flex items-center justify-center gap-3.5 rounded-2xl py-4.5 px-6 text-base sm:text-lg font-black text-white transition-all duration-300 cursor-pointer shadow-lg ${loading
              ? "bg-slate-700 cursor-wait shadow-none"
              : disabled
                ? "bg-slate-300 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:scale-[0.99]"
            }`}
        >
          {/* Subtle Ambient Shimmer */}
          {!loading && !disabled && (
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform" />
          )}

          {loading ? (
              <div className="flex items-center gap-3">
                <FaSpinner className="animate-spin text-xl text-white/90" />
              <span className="tracking-wide text-sm sm:text-base font-extrabold">
                {loadingSteps[stepIndex]}
              </span>
            </div>
          ) : (
          <>
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 shadow-xs">
              <FaWandMagicSparkles size={16} />
            </div>

            <span className="tracking-tight">
              Synthesize Custom AI Roadmap
            </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-xs font-extrabold backdrop-blur-md">
                <FaBolt size={10} className="text-amber-300" />
                <span>Instant Gen</span>
              </span>

            <FaArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </>
        )}
        </button>

          {/* Security & Reassurance Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center text-xs text-slate-400 font-medium pt-1">
            <span className="flex items-center gap-1.5">
              <FaShieldHalved size={12} className="text-emerald-500" />
              Saved securely to your account
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Includes weekly milestones, curated videos, and quiz tests</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-indigo-600 font-bold">100% Free Access</span>
          </div>
        </div>
        );
};

        export default GenerateButton;
