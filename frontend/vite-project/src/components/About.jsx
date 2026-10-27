import { FaRocket, FaCode, FaServer, FaBrain, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const techBadges = [
  { label: "Frontend", value: "React 19 + Vite + Tailwind", icon: <FaCode className="text-blue-500" /> },
  { label: "Backend", value: "Django REST Framework", icon: <FaServer className="text-indigo-500" /> },
  { label: "AI Engine", value: "Google Gemini AI", icon: <FaBrain className="text-purple-500" /> },
  { label: "Security", value: "JWT Auth & Protected Routes", icon: <FaShieldAlt className="text-emerald-500" /> },
];

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                Architecture & Mission
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Empowering Independent Learners with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Intelligent Guidance
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              AI Course Builder was developed as a flagship capstone project designed to eliminate tutorial hell
              and fragmented study plans.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              By combining state-of-the-art Generative AI with a robust curriculum schema, the platform delivers
              structured roadmaps, curated multi-modal resources, interactive quizzes, and verified certificate credentials.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {techBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-xs text-sm">
                    {badge.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {badge.label}
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      {badge.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                <FaRocket />
                <span>Get Started Now</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 text-white shadow-2xl overflow-hidden border border-slate-700/50">
              {/* Background ambient lighting */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 blur-2xl rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/20 blur-2xl rounded-full" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div>
                    <h3 className="text-xl font-bold">Platform Blueprint</h3>
                    <p className="text-xs text-slate-400 mt-1">End-to-End AI Learning Pipeline</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
                    Live Engine
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-400 mb-1">
                      <span>1. Goal Input & Persona</span>
                      <span className="text-emerald-400">Validated</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Extracts target skill, availability, and background to tailor pacing.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                    <div className="flex items-center justify-between text-xs font-semibold text-indigo-400 mb-1">
                      <span>2. AI Generation & Resource Matching</span>
                      <span className="text-blue-400">Dynamic</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Generates week-by-week curriculum mapped with YouTube, docs, and courses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                    <div className="flex items-center justify-between text-xs font-semibold text-purple-400 mb-1">
                      <span>3. Assessments & Verified PDF Certificate</span>
                      <span className="text-emerald-400">Automated</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Tests conceptual depth with instant scoring and generates cryptographically signed certificates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;