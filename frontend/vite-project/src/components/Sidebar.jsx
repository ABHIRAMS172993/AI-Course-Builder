import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaHome,
  FaRoad,
  FaBook, 
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaClipboardCheck,
  FaBars,
  FaTimes,
  FaAward,
} from "react-icons/fa";

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

  const menu = [
    {
      name: "Home",
      icon: <FaHome size={16} />,
      path: "/",
    },
    {
      name: "Dashboard",
      icon: <FaHome size={16} />,
      path: "/dashboard",
    },
    {
      name: "Preferences",
      icon: <FaCog size={16} />,
      path: "/preferences",
    },
    {
      name: "Current Roadmap",
      icon: <FaRoad size={16} />,
      path: "/roadmap",
    },
    {
      name: "My Roadmaps",
      icon: <FaBook size={16} />,
      path: "/myroadmaps",
    },
    {
      name: "Quiz Assessments",
      icon: <FaClipboardCheck size={16} />,
      path: "/quiz/results",
    },
    {
      name: "Certificates",
      icon: <FaAward size={16} />,
      path: "/certificates",
    },
    {
      name: "Profile",
      icon: <FaUser size={16} />,
      path: "/profile",
    },
  ];

  return (
    <>
      {/* Mobile Header Bar & Hamburger Toggle Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl shadow-xs flex items-center justify-center">
            <FaGraduationCap size={18} />
          </div>
          <h2 className="font-extrabold text-base text-slate-900 tracking-tight">
            AI Course Builder
          </h2>
        </div>

        <button
          onClick={toggleSidebar}
          aria-label="Toggle Navigation Menu"
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-hidden"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Dark Overlay Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-45 transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed left-0 top-0 w-64 h-screen bg-white border-r border-slate-200/80 shadow-xl lg:shadow-none flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* App Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl shadow-xs flex items-center justify-center">
                <FaGraduationCap size={18} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
                  AI Course Builder
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none mt-1">
                  Portal
                </span>
              </div>
            </div>

            {/* Mobile Close Button inside Drawer */}
            <button
              onClick={closeSidebar}
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {menu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-bold border border-blue-200/50 shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom User Info & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-3 shrink-0">
          {/* User Brief */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              {(user?.first_name ?? user?.username ?? "U")
                .charAt(0)
                .toUpperCase()}
            </div>
            <div className="truncate">
              <h3 className="text-xs font-bold text-slate-800 truncate">
                {user?.first_name || user?.username || "Student"}
              </h3>
              <p className="text-[11px] text-slate-500 truncate">
                {user?.email || "student@example.com"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              closeSidebar();
              safeLogout();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer border border-transparent hover:border-rose-200/60"
          >
            <FaSignOutAlt size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;