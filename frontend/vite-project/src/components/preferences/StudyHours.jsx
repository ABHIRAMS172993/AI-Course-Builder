import {
  FaClock,
  FaCalendarDays,
  FaFire,
  FaLightbulb,
} from "react-icons/fa6";

const presets = [
  { hours: 5, label: "Casual", sub: "1h / weekday" },
  { hours: 10, label: "Balanced", sub: "1.5h / day" },
  { hours: 20, label: "Intensive", sub: "3h / day" },
  { hours: 40, label: "Full-Time", sub: "Bootcamp immersion" },
];

const StudyHours = ({ value, setValue }) => {
    const getPacingDetails = () => {
      if (value <= 5) {
        return {
          badge: "Casual Explorer",
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
          timeline: "8 – 12 Months",
          daily: "~45 mins / day",
          message:
            "Perfect for busy professionals balancing learning with full-time commitments.",
        };
      }
      if (value <= 15) {
        return {
          badge: "Balanced Learner",
          badgeColor: "bg-blue-50 text-blue-700 border-blue-200/60",
          timeline: "3 – 5 Months",
          daily: "~1.5 hours / day",
          message:
            "Recommended standard pace. Steady weekly momentum without burnout.",
        };
      }
      if (value <= 25) {
        return {
          badge: "Accelerated Sprint",
          badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
          timeline: "6 – 10 Weeks",
          daily: "~3 hours / day",
          message:
            "High intensity track. Great if you have a job interview or target transition deadline.",
        };
      }
      return {
        badge: "Full-Time Immersion",
        badgeColor: "bg-purple-50 text-purple-700 border-purple-200/60",
        timeline: "3 – 5 Weeks",
        daily: "~6 hours / day",
        message:
          "Full-time dedication. Comprehensive deep dive covering multiple modules weekly.",
      };
    };

    const pacing = getPacingDetails();
    const percentage = Math.min(Math.max(((value - 1) / 39) * 100, 0), 100);

    return (
            <div className="space-y-4">
              {/* Section Header */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-blue-500/15 border border-indigo-200/60 text-indigo-600 flex items-center justify-center shrink-0 shadow-xs">
                  <FaClock size={18} />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-indigo-100/70 text-indigo-700">
                        Step 3
                      </span>
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                        Weekly Study Hours
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Set your target availability so AI scopes out realistic weekly modules.
                    </p>
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {presets.map((preset) => {
                  const isSelected = value === preset.hours;
                  return (
                    <button
                      key={preset.hours}
                      type="button"
                      onClick={() => setValue(preset.hours)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${isSelected
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]"
                          : "bg-white border-slate-200/80 hover:border-slate-300 text-slate-700"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{preset.label}</span>
                        <span
                          className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                            }`}
                        >
                          {preset.hours}h
                        </span>
                      </div>
                      <p
                        className={`text-[10px] mt-1 truncate ${isSelected ? "text-blue-100" : "text-slate-400"
                          }`}
                      >
                        {preset.sub}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Main Slider Box */}
              <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4">
                {/* Value Display */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {value}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-500">
                      Hours / Week
                    </span>
                  </div>

                        <span
                          className={`text-xs font-extrabold px-3 py-1 rounded-full border ${pacing.badgeColor}`}
                        >
                          {pacing.badge}
                        </span>
                    </div>

                    {/* Range Input */}
                    <div className="relative pt-1">
                      <input
                        type="range"
                        min={1}
                        max={40}
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        className="w-full h-2.5 rounded-lg appearance-none cursor-pointer focus:outline-hidden"
                        style={{
                          background: `linear-gradient(to right, #2563eb 0%, #4f46e5 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
                        }}
                      />
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2">
                        <span>1 hr (Min)</span>
                        <span>10 hrs</span>
                        <span>20 hrs</span>
                        <span>30 hrs</span>
                        <span>40 hrs (Max)</span>
                      </div>
                    </div>

                    {/* Projected Metrics Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
                      <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/60">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <FaCalendarDays size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Est. Completion
                          </p>
                          <p className="text-xs font-bold text-slate-800">
                            {pacing.timeline}
                          </p>
                        </div>
                      </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/60">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <FaFire size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Daily Effort
                        </p>
                        <p className="text-xs font-bold text-slate-800">
                          {pacing.daily}
                        </p>
                      </div>
                    </div>
                  </div>

                    {/* Advice line */}
                    <div className="flex items-start gap-2 text-xs text-slate-500 pt-1">
                      <FaLightbulb size={13} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{pacing.message}</span>
                    </div>
                  </div>
                </div>
                );
};

                export default StudyHours;