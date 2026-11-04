
import {
  FaGraduationCap,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
  FaArrowRight,
  FaSparkles,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Architecture", href: "#about" },
  ];

  const platformLinks = [
    { label: "Student Dashboard", to: "/dashboard" },
    { label: "Generate Roadmap", to: "/preferences" },
    { label: "Quiz Assessments", to: "/quiz/results" },
    { label: "Certificates", to: "/certificates" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#080d1a] text-slate-400">

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/10 blur-[110px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-8">

        {/* Top CTA Section */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 p-7 sm:p-9 mb-16">

          <div className="absolute -right-10 -top-20 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
                <FaSparkles />
                Your learning journey starts here
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ready to build your future?
              </h2>

              <p className="text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
                Turn your learning goals into a structured roadmap
                with AI-powered personalized learning.
              </p>
            </div>

            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-3 shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 transition-all duration-300"
            >
              Get Started Free
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                <FaGraduationCap className="text-2xl" />
                <div className="absolute inset-0 rounded-2xl border border-white/20" />
              </div>

              <div>
                <span className="block text-lg font-extrabold text-white tracking-tight">
                  AI Course Builder
                </span>
                <span className="block text-[10px] text-blue-400 font-semibold uppercase tracking-[0.2em]">
                  Learn smarter. Grow faster.
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-7 mt-6 max-w-sm">
              Empowering learners worldwide with AI-powered
              personalized curriculums, curated learning resources,
              intelligent assessments, and meaningful progress tracking.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-7">
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com",
                  label: "GitHub",
                },
                {
                  icon: FaLinkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: FaEnvelope,
                  href: "mailto:support@aicoursebuilder.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={label === "Email" ? undefined : "noreferrer"}
                  aria-label={label}
                  className="group w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.18em] mb-6">
              Explore
            </h4>

            <ul className="space-y-4">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm hover:text-blue-400 transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-blue-400 group-hover:scale-150 transition-all" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.18em] mb-6">
              Platform
            </h4>

            <ul className="space-y-4">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-2 text-sm hover:text-blue-400 transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-blue-400 group-hover:scale-150 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.18em] mb-6">
              Your Account
            </h4>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Create Account
                  <FaArrowRight size={11} />
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              </li>
            </ul>

            {/* System Status */}
            <div className="inline-flex items-center gap-2 mt-7 px-3 py-2 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/15">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold text-emerald-400">
                All Systems Normal
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-7 border-t border-white/[0.08]">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

            <p className="text-xs text-slate-500 text-center sm:text-left">
              © {currentYear}{" "}
              <span className="text-slate-300 font-semibold">
                AI Course Builder
              </span>
              . All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Crafted for curious minds</span>
              <FaGraduationCap className="text-blue-500" />
            </div>

            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              aria-label="Back to top"
              className="group flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Back to top
              <span className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                <FaArrowUp size={12} />
              </span>
            </button>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
