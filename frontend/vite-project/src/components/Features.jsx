import {
  FaMapMarkedAlt,
  FaBookOpen,
  FaChartLine,
  FaQuestionCircle,
  FaAward,
  FaSlidersH,
} from "react-icons/fa";

const features = [
  {
    icon: <FaMapMarkedAlt className="text-xl" />,
    color: "from-blue-600 to-cyan-500",
    bgLight: "bg-blue-50 text-blue-600 border-blue-200/60",
    title: "AI Roadmap Generation",
    description:
      "Gemini AI dynamically synthesizes custom multi-week study roadmaps structured around your career goals and current skill level.",
    badge: "Gemini AI",
  },
  {
    icon: <FaBookOpen className="text-xl" />,
    color: "from-indigo-600 to-purple-500",
    bgLight: "bg-indigo-50 text-indigo-600 border-indigo-200/60",
    title: "Curated Multi-Format Resources",
    description:
      "Every module connects you with premier YouTube videos, interactive documentation, books, and articles to accelerate your learning.",
    badge: "Videos & Docs",
  },
  {
    icon: <FaQuestionCircle className="text-xl" />,
    color: "from-emerald-600 to-teal-500",
    bgLight: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
    title: "AI-Powered Quizzes",
    description:
      "Validate what you've learned through timed multiple-choice assessments with immediate feedback, scoring, and in-depth explanations.",
    badge: "Interactive",
  },
  {
    icon: <FaChartLine className="text-xl" />,
    color: "from-amber-600 to-orange-500",
    bgLight: "bg-amber-50 text-amber-600 border-amber-200/60",
    title: "Real-Time Progress Tracking",
    description:
      "Visual metrics track weekly completion rates, resources viewed, average quiz scores, and your overall learning milestones.",
    badge: "Analytics",
  },
  {
    icon: <FaAward className="text-xl" />,
    color: "from-rose-600 to-pink-500",
    bgLight: "bg-rose-50 text-rose-600 border-rose-200/60",
    title: "Verified Completion Certificates",
    description:
      "Successfully finish all weeks and quizzes in a roadmap to unlock and download your official, verified PDF completion certificate.",
    badge: "PDF Download",
  },
  {
    icon: <FaSlidersH className="text-xl" />,
    color: "from-cyan-600 to-blue-500",
    bgLight: "bg-cyan-50 text-cyan-600 border-cyan-200/60",
    title: "Flexible Goal Customization",
    description:
      "Tailor your learning pace from 5 to 40 hours per week, adjust difficulty from Beginner to Advanced, and target specific industry domains.",
    badge: "Personalized",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Core Capabilities
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Master New Skills
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            From automated curriculum building to hands-on testing and certified recognition,
            we remove the guesswork from your learning journey.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-7 sm:p-8 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top icon and badge row */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${feature.bgLight} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                    {feature.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom decorative accent line */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;