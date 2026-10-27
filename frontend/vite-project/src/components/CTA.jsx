import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck } from "react-icons/fa6";

const CTA = () => {
  return (
    <section className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 py-16 sm:py-20 px-6 sm:px-12 text-center text-white shadow-2xl border border-indigo-900/50">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/25 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-blue-200 tracking-wide">
                Start Learning in Under 60 Seconds
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5">
              Ready to Accelerate Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Tech Career?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Join students and developers using AI to craft personalized curriculums,
              master topics, and earn verified credentials.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-white hover:bg-slate-100 shadow-xl shadow-white/10 hover:shadow-white/20 active:scale-95 transition-all duration-200"
              >
                <span>Get Started for Free</span>
                <FaArrowRight size={13} />
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-all duration-200"
              >
                Sign In to Account
              </Link>
            </div>

            {/* Reassurance points */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <FaCheck className="text-emerald-400" /> Free Forever
              </span>
              <span className="flex items-center gap-1.5">
                <FaCheck className="text-emerald-400" /> No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <FaCheck className="text-emerald-400" /> Powered by Gemini AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;