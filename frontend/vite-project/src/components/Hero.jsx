import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCircleCheck,
  FaPlay,
  FaBolt,
  FaBrain,
  FaListCheck,
  FaCube,
} from "react-icons/fa6";
import HeroBackground3D from "./three/HeroBackground3D";
import AICore3D from "./three/AICore3D";

const Hero = () => {
  const [showcaseTab, setShowcaseTab] = useState("3d"); // "3d" | "roadmap"

  return (
    <section
      id="home"
      className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50"
    >
      {/* Three.js Interactive 3D Ambient Constellation & Synapse Network */}
      <HeroBackground3D />

      {/* Radiant Background Aura Orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-400/20 via-indigo-400/20 to-purple-400/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-cyan-400/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-[55%] text-center lg:text-left">
            {/* Feature pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-200/80 shadow-xs mb-6 hover:border-blue-300 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 tracking-wide">
                Next-Gen AI Learning Platform
              </span>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                v2.0
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Master Any Skill with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Personalized AI
              </span>{" "}
              Roadmaps.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Transform your career goals into weekly step-by-step curriculums.
              Get curated resources, test your mastery with smart quizzes,
              track your streak, and earn verified certificates.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8 sm:mt-10">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                <span>Generate Free Roadmap</span>
                <FaArrowRight size={13} />
              </Link>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all duration-200"
              >
                <FaPlay size={10} className="text-blue-600" />
                <span>See How It Works</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-10 border-t border-slate-200/70 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  100+
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  Curated Domains
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight flex items-center justify-center lg:justify-start gap-1">
                  <span>Gemini</span>
                  <FaCube size={16} className="text-cyan-500 animate-spin" style={{ animationDuration: "12s" }} />
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  AI Powered Engine
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  Free & Open
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Interactive Showcase Card with 3D AI Matrix */}
          <div className="w-full lg:w-[45%]">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative gradient border */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-25 blur-xl transition duration-1000 group-hover:opacity-100" />

              {/* View Switcher Tabs (3D AI Core vs Roadmap Preview) */}
              <div className="relative mb-3 flex items-center justify-between bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowcaseTab("3d")}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      showcaseTab === "3d"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                    }`}
                  >
                    <FaBrain className="text-xs" />
                    <span>3D Neural Core</span>
                    <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.2 rounded bg-white/20 text-white font-mono">
                      WebGL
                    </span>
                  </button>

                  <button
                    onClick={() => setShowcaseTab("roadmap")}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      showcaseTab === "roadmap"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                    }`}
                  >
                    <FaListCheck className="text-xs" />
                    <span>Curriculum View</span>
                  </button>
                </div>

                <span className="text-[11px] font-semibold text-slate-400 pr-2 hidden sm:block">
                  Interactive ✦
                </span>
              </div>

              {/* Tab 1: 3D Interactive AICore3D Scene */}
              {showcaseTab === "3d" && (
                <div className="relative transition-all duration-300 animate-fadeIn">
                  <AICore3D />
                </div>
              )}

              {/* Tab 2: Classic Roadmap Card Preview */}
              {showcaseTab === "roadmap" && (
                <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl p-5 sm:p-7 overflow-hidden transition-all duration-300 animate-fadeIn">
                  {/* Header of Mockup */}
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                        <FaBolt />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                            AI & Machine Learning
                          </h3>
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          12 Weeks Roadmap • Intermediate
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-blue-600">
                        75% Done
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-3/4 h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                  </div>

                  {/* Modules list */}
                  <div className="mt-5 space-y-3">
                    {/* Module 1 */}
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/70 transition-colors">
                      <FaCircleCheck className="text-emerald-500 shrink-0 mt-0.5 text-base" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            Week 1: Math & Foundations of ML
                          </p>
                          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            Completed
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Linear Algebra, Calculus, Python NumPy
                        </p>
                      </div>
                    </div>

                    {/* Module 2 */}
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/60 border border-blue-200/80">
                      <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            Week 2: Deep Learning & Neural Nets
                          </p>
                          <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                            In Progress
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          Backpropagation, PyTorch, Multi-layer Perceptrons
                        </p>
                      </div>
                    </div>

                    {/* Module 3 */}
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 text-slate-400">
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-slate-600 truncate">
                            Week 3: Transformers & Large Language Models
                          </p>
                          <span className="text-[10px] font-medium text-slate-400">
                            Next
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Attention Mechanism, Fine-tuning, RAG
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating pill badge 1: Quiz Badge */}
                  <div className="mt-5 p-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-md shadow-blue-500/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-sm">
                        🏆
                      </div>
                      <div>
                        <p className="text-xs font-bold">Latest Quiz Result</p>
                        <p className="text-[11px] text-blue-100">
                          Neural Networks Module
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-white">
                        95%
                      </span>
                      <span className="block text-[10px] text-blue-100">
                        Mastered
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;