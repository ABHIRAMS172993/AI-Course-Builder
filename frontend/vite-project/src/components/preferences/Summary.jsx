import {
  FaBriefcase,
  FaChartLine,
  FaClock,
FaBoxesStacked,
  FaCircleCheck,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

const Summary = ({ formData }) => {
  const isGoalSelected = Boolean(formData.career_goal);
  const domainsCount = formData.preferred_domains?.length || 0;

  return (
            <div className="space-y-4 pt-6 border-t border-slate-200/80">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500/10 to-orange-500/15 border border-amber-200/60 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
                    <HiSparkles size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-amber-100/70 text-amber-700">
                        Step 5
                      </span>
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                        Curriculum Blueprint Preview
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Review your configuration before synthesizing your customized roadmap.
                    </p>
                  </div>
                </div>

                {/* Readiness Status */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border">
                  {isGoalSelected ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border-emerald-200/60">
                      <FaCircleCheck size={12} className="text-emerald-600" />
                      <span>Blueprint Ready</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 border-amber-200/60">
                      <FaTriangleExclamation size={12} className="text-amber-600" />
                      <span>Choose Career Goal</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Blueprint Card */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-5 sm:p-6 shadow-xl border border-slate-800 relative overflow-hidden">
                {/* Ambient Decorative Glows */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 space-y-5">
                      {/* Blueprint Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                        <div>
                          <span className="text-[10px] font-extrabold tracking-widest uppercase text-blue-400">
                            AI Curriculum Specification
                          </span>
                          <h3 className="text-lg font-black text-white tracking-tight mt-0.5">
                            {formData.career_goal || "No Career Goal Selected Yet"}
                          </h3>
                        </div>
                        <div className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-[11px] font-bold text-slate-300 border border-white/10">
                          Model: Gemini 2.0 Flash
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Target & Career */}
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold mb-1">
                            <FaBriefcase size={13} />
                            <span>Target Direction</span>
                          </div>
                          <p className="text-sm font-extrabold text-white truncate">
                            {formData.career_goal || "Pending selection"}
                          </p>
                        </div>

                      {/* Skill Level */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                          <FaChartLine size={13} />
                          <span>Difficulty Baseline</span>
                        </div>
                        <p className="text-sm font-extrabold text-white">
                          {formData.skill_level}
                        </p>
                      </div>

            {/* Weekly Commitment */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                          <FaClock size={13} />
                          <span>Pacing Commitment</span>
                        </div>
                        <p className="text-sm font-extrabold text-white">
                          {formData.study_hours} hrs / week
                        </p>
                      </div>
                    </div>

                      {/* Domains Selected Strip */}
                      <div className="pt-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
                          <FaBoxesStacked size={12} className="text-indigo-400" />
                          <span>Selected Domain Electives ({domainsCount}):</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {domainsCount > 0 ? (
                            formData.preferred_domains.map((dom) => (
                              <span
                                key={dom}
                                className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-200 border border-indigo-400/30"
                              >
                                ✓ {dom}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 italic">
                              No specific electives selected — AI will generate a complete balanced curriculum.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
};

                export default Summary;