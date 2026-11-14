import {
  FaSeedling,
  FaCodeBranch,
  FaMountain,
  FaCheck,
FaLayerGroup,
} from "react-icons/fa6";

const levels = [
  {
    title: "Beginner",
    subtitle: "Fundamentals & Core Concepts",
    experience: "0 - 1 Years",
    description:
      "Starting out or switching careers. Focuses on core building blocks, guided labs, and step-by-step clarity.",
    icon: FaSeedling,
    accent: "emerald",
    bgActive: "from-emerald-500/10 via-teal-500/5 to-transparent",
    borderActive: "border-emerald-500",
    ringActive: "ring-emerald-500/20",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Intermediate",
    subtitle: "Full Projects & Architecture",
    experience: "1 - 3 Years",
    description:
      "Comfortable with syntax. Focuses on full-stack integration, real-world patterns, APIs, and clean code.",
    icon: FaCodeBranch,
    accent: "blue",
    bgActive: "from-blue-500/10 via-indigo-500/5 to-transparent",
    borderActive: "border-blue-600",
    ringActive: "ring-blue-500/20",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200/60",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    title: "Advanced",
    subtitle: "Scale, Systems & Internals",
    experience: "3+ Years",
    description:
      "Skilled developer. Fast-tracks past basics straight to system design, optimization, internals, and edge cases.",
    icon: FaMountain,
    accent: "purple",
    bgActive: "from-purple-500/10 via-violet-500/5 to-transparent",
    borderActive: "border-purple-600",
    ringActive: "ring-purple-500/20",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200/60",
    iconBg: "bg-purple-100 text-purple-600",
  },
];

const SkillLevel = ({ value, setValue }) => {
  return (
          <div className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-teal-500/15 border border-emerald-200/60 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                <FaLayerGroup size={18} />
              </div>
              <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-700">
                      Step 2
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      Current Skill Level
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Calibrate the roadmap difficulty and pacing to match your existing experience.
                  </p>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {levels.map((level) => {
                const Icon = level.icon;
                const isSelected = value === level.title;

                        return (
                      <button
                        key={level.title}
                        type="button"
                        onClick={() => setValue(level.title)}
                        className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${isSelected
                            ? `${level.borderActive} bg-gradient-to-b ${level.bgActive} shadow-md ring-4 ${level.ringActive}`
                            : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs hover:-translate-y-0.5"
                          }`}
                      >
                      <div>
                        {/* Header Row: Icon + Badge + Check */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-colors ${isSelected ? level.iconBg : "bg-slate-100 text-slate-500"
                              }`}
                          >
                            <Icon />
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${level.badgeBg}`}
                            >
                              {level.experience}
                            </span>

                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${isSelected
                                  ? "bg-slate-900 text-white scale-100"
                                  : "border border-slate-300 bg-white"
                                }`}
                            >
                              {isSelected && <FaCheck size={10} />}
                            </div>
                          </div>
                        </div>

                        {/* Level Title & Subtitle */}
                        <div>
                          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                            {level.title}
                          </h3>
                          <p className="text-xs font-semibold text-blue-600 mt-0.5">
                            {level.subtitle}
                          </p>
                        </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {level.description}
                  </p>
                </div>

                {/* Bottom active indicator */ }
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                  <span
                    className={
                      isSelected ? "text-slate-900 font-extrabold" : "text-slate-400"
                    }
                  >
                    {isSelected ? "Selected Tier" : "Click to Select"}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-1">
                      ● Active
                    </span>
                  )}
                </div>
            </button>
            );
        })}
          </div>
        </div>
        );
};

        export default SkillLevel;
