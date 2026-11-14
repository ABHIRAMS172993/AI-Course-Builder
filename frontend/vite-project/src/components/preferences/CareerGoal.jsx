import { useState, useRef, useEffect } from "react";
import {
  FaBullseye,
  FaBriefcase,
  FaChevronDown,
  FaMagnifyingGlass,
  FaCheck,
  FaCode,
  FaRobot,
  FaDatabase,
  FaCloud,
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

const careerCategories = [
  {
    category: "Full Stack & Web",
    icon: FaCode,
    color: "text-blue-500",
    roles: [
      {
        name: "Full Stack Developer",
        desc: "End-to-end web apps, modern frameworks & databases",
        tags: ["React", "Node", "PostgreSQL", "Next.js"],
      },
      {
        name: "Frontend Developer",
        desc: "Interactive UI, component architectures & performance",
        tags: ["React", "TypeScript", "Tailwind", "Vite"],
      },
      {
        name: "React Developer",
        desc: "Specialized in scalable React ecosystems & state",
        tags: ["React", "Redux", "Hooks", "Next.js"],
      },
      {
        name: "Backend Developer",
        desc: "High-throughput APIs, databases & distributed systems",
        tags: ["Python", "Django", "FastAPI", "SQL"],
      },
      {
        name: "Python Developer",
        desc: "General purpose backend, automation & data handling",
        tags: ["Python", "Django", "APIs", "Algorithms"],
      },
      {
        name: "Django Developer",
        desc: "Robust monolithic & REST API web applications",
        tags: ["Django", "DRF", "Postgres", "Redis"],
      },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: FaRobot,
    color: "text-purple-500",
    roles: [
      {
        name: "AI Engineer",
        desc: "LLMs, prompt engineering, RAG & agentic workflows",
        tags: ["Gemini API", "LangChain", "RAG", "Embeddings"],
      },
      {
        name: "Machine Learning Engineer",
        desc: "End-to-end model training, evaluation & deployment",
        tags: ["PyTorch", "Scikit-Learn", "MLOps", "NumPy"],
      },
      {
        name: "Deep Learning Engineer",
        desc: "Neural networks, transformers & generative AI",
        tags: ["Transformers", "PyTorch", "CUDA", "Vision"],
      },
      {
        name: "NLP Engineer",
        desc: "Natural language processing, tokenizers & semantic search",
        tags: ["Transformers", "HuggingFace", "BERT", "Vector DBs"],
      },
    ],
  },
  {
    category: "Data Science & Analytics",
    icon: FaDatabase,
    color: "text-emerald-500",
    roles: [
      {
        name: "Data Scientist",
        desc: "Statistical inference, predictive modeling & ML",
        tags: ["Python", "Pandas", "Statistics", "Scikit-Learn"],
      },
      {
        name: "Data Analyst",
        desc: "Business insights, dashboards & data exploration",
        tags: ["SQL", "Tableau", "PowerBI", "Excel"],
      },
      {
        name: "Business Intelligence Analyst",
        desc: "KPI architecture, executive reports & data pipelines",
        tags: ["SQL", "ETL", "Reporting", "Dashboards"],
      },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: FaCloud,
    color: "text-amber-500",
    roles: [
      {
        name: "DevOps / Cloud Engineer",
        desc: "CI/CD pipelines, containerization & cloud architecture",
        tags: ["Docker", "Kubernetes", "AWS", "GitHub Actions"],
      },
      {
        name: "Software Engineer",
        desc: "Core computer science, system design & scalable apps",
        tags: ["Data Structures", "Algorithms", "System Design"],
      },
    ],
  },
];

const trendingPills = [
  "Full Stack Developer",
  "AI Engineer",
  "Frontend Developer",
  "Machine Learning Engineer",
  "Python Developer",
  "Data Scientist",
];

const CareerGoal = ({ value, setValue }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState("");
      const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter roles based on search query
        const filteredCategories = careerCategories
    .map((cat) => ({
          ...cat,
          roles: cat.roles.filter(
        (role) =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          role.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
        ),
    }))
    .filter((cat) => cat.roles.length > 0);

  // Find currently selected role info
          const selectedRoleInfo = careerCategories
    .flatMap((c) => c.roles)
    .find((r) => r.name.toLowerCase() === (value || "").toLowerCase());

          return (
          <div className="space-y-4">
            {/* Section Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500/10 to-indigo-500/15 border border-blue-200/60 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                  <FaBullseye size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-700">
                      Step 1
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      Target Career Goal
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Select the role you want the AI to design your curriculum around.
                  </p>
                </div>
              </div>
            </div>

              {/* Trending Quick-Picks */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <HiSparkles size={12} className="text-amber-500" />
                  <span>Popular Targets:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingPills.map((role) => {
                    const isSelected = value === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          setValue(role);
                          setIsOpen(false);
                        }}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer ${isSelected
                            ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/25 scale-[1.02]"
                            : "bg-white border-slate-200/80 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                          }`}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

                  {/* Custom Modern Dropdown */}
      <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border bg-white cursor-pointer transition-all duration-200 ${isOpen
                        ? "border-blue-600 ring-4 ring-blue-500/10 shadow-md"
                        : "border-slate-200/90 hover:border-slate-300 shadow-xs"
                      }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <FaBriefcase size={15} />
                      </div>
                      <div className="truncate">
                        {value ? (
                          <div>
                            <span className="block text-sm font-bold text-slate-900 truncate">
                              {value}
                            </span>
                            <span className="block text-[11px] text-blue-600 font-semibold truncate">
                              {selectedRoleInfo
                                ? selectedRoleInfo.desc
                                : "Custom Career Direction"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-slate-400">
                            Select or search your career goal...
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-3 shrink-0">
                      {value && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <FaCheck size={9} /> Selected
                        </span>
                      )}
                      <FaChevronDown
                        size={13}
                        className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : ""
                          }`}
                      />
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                      {/* Search Input Bar */}
                      <div className="p-3 border-b border-slate-100 bg-slate-50/70">
                        <div className="relative">
                          <FaMagnifyingGlass
                            size={13}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                          <input
                            type="text"
                            placeholder="Search roles, skills, or frameworks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                            autoFocus
                          />
                        </div>
                      </div>

            {/* Roles List */}
                  <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 scrollbar-thin">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((cat) => {
                        const CatIcon = cat.icon;
                        return (
                          <div key={cat.category} className="py-2.5 first:pt-1 last:pb-1">
                            <div className="flex items-center gap-2 px-3 py-1 mb-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                              <CatIcon size={12} className={cat.color} />
                              <span>{cat.category}</span>
                            </div>
                            <div className="space-y-1">
                              {cat.roles.map((role) => {
                                const isSelected = value === role.name;
                                return (
                                  <button
                                    key={role.name}
                                    type="button"
                                    onClick={() => {
                                      setValue(role.name);
                                      setIsOpen(false);
                                      setSearchQuery("");
                                    }}
                                    className={`w-full flex items-start justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${isSelected
                                        ? "bg-blue-50/80 border border-blue-200/80 text-blue-900"
                                        : "hover:bg-slate-50 text-slate-800"
                                      }`}
                                  >
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs sm:text-sm font-bold">
                                          {role.name}
                                        </span>
                                        {isSelected && (
                                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                        )}
                                      </div>
                                      <p className="text-[11px] text-slate-500 mt-0.5">
                                        {role.desc}
                                      </p>
                                      <div className="flex flex-wrap gap-1 mt-1.5">
                                        {role.tags.map((tag) => (
                                          <span
                                            key={tag}
                                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    {isSelected && (
                                      <FaCheck
                                        size={13}
                                        className="text-blue-600 shrink-0 mt-1"
                                      />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-sm font-semibold text-slate-700">
                          "{searchQuery}" not found
                        </p>
                        <p className="text-xs text-slate-400 mt-1 mb-3">
                          Want to use this as your custom career goal?
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setValue(searchQuery);
                            setIsOpen(false);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
                        >
                          <span>Use "{searchQuery}"</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
        )}
              </div>
            </div>
            );
};

            export default CareerGoal;