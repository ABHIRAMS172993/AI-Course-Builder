import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaHome,
  FaRoad,
  FaBook,
  FaUser,
  FaSlidersH,
  FaSignOutAlt,
  FaClipboardCheck,
  FaBars,
  FaTimes,
  FaAward,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Sidebar = ({ logout: propLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const safeLogout = () => {
    if (typeof propLogout === "function") {
      propLogout();
    } else {
      localStorage.clear();
      navigate("/login");
    }
  };

  const navSections = [
    {
      title: "Overview",
      items: [
        {
          name: "Home",
          icon: FaHome,
          path: "/",
        },
        {
          name: "Dashboard",
          icon: FaHome,
          path: "/dashboard",
        },
      ],
    },
    {
      title: "AI Learning Engine",
      items: [
        {
          name: "Preferences",
          icon: FaSlidersH,
          path: "/preferences",
          badge: "AI Setup",
        },
        {
          name: "Current Roadmap",
          icon: FaRoad,
          path: "/roadmap",
        },
        {
          name: "My Roadmaps",
          icon: FaBook,
          path: "/myroadmaps",
        },
      ],
    },
    {
      title: "Credentials",
      items: [
        {
          name: "Quiz Assessments",
          icon: FaClipboardCheck,
          path: "/quiz/results",
        },
        {
          name: "Certificates",
          icon: FaAward,
          path: "/certificates",
        },
        {
          name: "Profile",
          icon: FaUser,
          path: "/profile",
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Header Bar & Hamburger Toggle Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 flex items-center justify-between z-40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center">
                <FaGraduationCap size={18} />
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
                  AI Course Builder
                </h2>
                <span className="text-[10px] font-semibold text-blue-600 tracking-wide">
                  Learning Portal
                </span>
              </div>
            </div>

            <button
              onClick={toggleSidebar}
              aria-label="Toggle Navigation Menu"
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-hidden"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Dark Overlay Backdrop for Mobile */}
          {isOpen && (
            <div
              onClick={closeSidebar}
              className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-45 transition-opacity"
            />
          )}

          {/* Sidebar Drawer */}
          <aside
                }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* App Logo */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100/90 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white rounded-2xl shadow-md shadow-indigo-500/25 flex items-center justify-center">
                <FaGraduationCap size={20} />
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
                    AI Course Builder
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                    Portal
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="inline-flex items-center gap-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 leading-none">
                    <HiSparkles size={9} /> AI Core
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Close Button inside Drawer */}
            <button
              onClick={closeSidebar}
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6 scrollbar-thin">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold tracking-wider uppercase text-slate-400 mb-2">
                {section.title}
              </p>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md shadow-blue-500/20"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <span
                            className={`shrink-0 p-1.5 rounded-lg transition-colors ${isActive
                                ? "bg-white/20 text-white"
                                : "text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50"
                              }`}
                          >
                            <Icon size={14} />
                          </span>
                          <span className="truncate">{item.name}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${isActive
                                ? "bg-white/20 text-white"
                                : "bg-blue-50 text-blue-700 border border-blue-200/50"
                              }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Info & Logout */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md space-y-3 shrink-0">
              {/* User Card */}
              <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/60 shadow-xs">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-blue-500/20">
                  {(user?.first_name ?? user?.username ?? "U")
                    .charAt(0)
                    .toUpperCase()}
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                    <div className="truncate flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-slate-800 truncate">
                          {user?.first_name || user?.username || "Learner"}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {user?.email || "learner@domain.com"}
                      </p>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    closeSidebar();
                    safeLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50/80 transition-all duration-200 cursor-pointer border border-slate-200/60 hover:border-rose-200/60"
                >
                  <FaSignOutAlt size={12} />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>
          </>
          );
};

          export default Sidebar;