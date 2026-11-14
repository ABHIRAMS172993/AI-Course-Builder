import {
  FaLaptopCode,
  FaServer,
  FaLayerGroup,
  FaChartPie,
  FaRobot,
FaCloud,
  FaCheck,
  FaBoxesStacked,
} from "react-icons/fa6";

const domainList = [
  {
    name: "Frontend Development",
    desc: "Component architecture, reactive states, UI systems & styling",
    icon: FaLaptopCode,
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    color: "blue",
  },
  {
    name: "Backend Development",
    desc: "Robust endpoints, databases, authentication & caching",
    icon: FaServer,
    tags: ["Python", "Django", "PostgreSQL", "REST APIs"],
    color: "emerald",
  },
  {
    name: "Full Stack Development",
    desc: "Seamless integration between client, server, and cloud",
    icon: FaLayerGroup,
    tags: ["Full Stack", "System Design", "Microservices"],
    color: "indigo",
  },
  {
    name: "Data Science",
    desc: "Data modeling, statistical analysis & actionable insights",
    icon: FaChartPie,
    tags: ["Pandas", "NumPy", "Exploratory Analysis", "SQL"],
    color: "amber",
  },
  {
    name: "Machine Learning",
    desc: "Supervised & unsupervised learning, neural nets & LLMs",
    icon: FaRobot,
    tags: ["PyTorch", "Transformers", "RAG", "Embeddings"],
    color: "purple",
  },
  {
    name: "Cloud & DevOps",
    desc: "Automated deployment pipelines, Docker & cloud infrastructure",
    icon: FaCloud,
    tags: ["Docker", "CI/CD", "AWS", "Monitoring"],
    color: "cyan",
  },
];

const PreferredDomains = ({ domains, toggleDomain }) => {
  const selectAll = () => {
        domainList.forEach((d) => {
          if (!domains.includes(d.name)) {
            toggleDomain(d.name);
          }
        });
  };

  const clearAll = () => {
            domainList.forEach((d) => {
              if (domains.includes(d.name)) {
                toggleDomain(d.name);
              }
            });
  };

          return (
          <div className="space-y-4">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-500/10 to-indigo-500/15 border border-purple-200/60 text-purple-600 flex items-center justify-center shrink-0 shadow-xs">
                  <FaBoxesStacked size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-purple-100/70 text-purple-700">
                      Step 4
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      Preferred Domains & Electives
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Select one or more domain focuses you'd like woven into your roadmap.
                  </p>
                </div>
              </div>

              {/* Quick Selection Helpers */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg text-slate-500 hover:bg-slate-100 transition cursor-pointer"
                >
                  Clear
                </button>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {domains.length} Selected
                </span>
              </div>
            </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {domainList.map((domain) => {
                  const Icon = domain.icon;
                  const isSelected = domains.includes(domain.name);

                  return (
                    <button
                      key={domain.name}
                      type="button"
                      onClick={() => toggleDomain(domain.name)}
                      className={`relative text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${isSelected
                          ? "border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20"
                          : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                        }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors ${isSelected
                                ? "bg-blue-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-600"
                              }`}
                          >
                            <Icon />
                          </div>

                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${isSelected
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "border-slate-300 bg-white"
                              }`}
                          >
                            {isSelected && <FaCheck size={10} />}
                          </div>
                        </div>

                        <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                          {domain.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {domain.desc}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-slate-100">
                        {domain.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${isSelected
                                ? "bg-white text-blue-700 border border-blue-200/60"
                                : "bg-slate-100 text-slate-600"
                              }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            );
};

            export default PreferredDomains;
