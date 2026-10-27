import React from "react";
import {
  FaSlidersH,
  FaBrain,
  FaGraduationCap,
} from "react-icons/fa";

const steps = [
  {
    step: "01",
    icon: <FaSlidersH className="text-2xl" />,
    color: "from-blue-600 to-cyan-500",
    title: "Define Your Ambitions",
    description:
      "Select your target career role, current skill baseline (Beginner to Advanced), and weekly commitment from 5 to 40 hours.",
    tag: "1 Min Setup",
  },
  {
    step: "02",
    icon: <FaBrain className="text-2xl" />,
    color: "from-indigo-600 to-purple-600",
    title: "AI Synthesizes Your Path",
    description:
      "Gemini AI structures your entire journey into structured weekly milestones paired with high-yield video tutorials, docs, and reading materials.",
    tag: "Gemini 2.5 Engine",
  },
  {
    step: "03",
    icon: <FaGraduationCap className="text-2xl" />,
    color: "from-emerald-600 to-teal-500",
    title: "Test, Master & Certify",
    description:
      "Engage with topic modules, test retention with AI quizzes, monitor your streak, and graduate with a downloadable verified certificate.",
    tag: "PDF Credential",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-100/40 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Simple 3-Step Process
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            From raw curiosity to certified expertise in three seamless stages.
          </p>
        </div>

        {/* 3 Step Cards with visual connectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-lg shadow-blue-500/15`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-slate-200 tracking-tight">
                    {item.step}
                  </span>
                </div>

                {/* Tag */}
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Phase {item.step}</span>
                <span className="text-blue-600 font-bold">Step {index + 1} of 3</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;