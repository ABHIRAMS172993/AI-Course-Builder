import { useState } from "react";
import { NavLink } from "react-router-dom";
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
} from "react-icons/fa";

const Sidebar = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const menu = [
    {
      name: "Home",
      icon: <FaHome />,
      path: "/",
    },
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Preferences",
      icon: <FaCog />,
      path: "/preferences",
    },
    {
      name: "Current Roadmap",
      icon: <FaRoad />,
      path: "/roadmap",
    },
    {
      name: "My Roadmaps",
      icon: <FaBook />,
      path: "/myroadmaps",
    },
    {
      name: "Quiz",
      icon: <FaClipboardCheck />,
      path: "/quiz/results",
    },
    {
      name: "Certificates",
      icon: <FaBook />,
      path: "/certificates",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  return (
    <>
      {/* Mobile Header Bar & Hamburger Toggle Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-xs shadow-blue-200">
            <FaGraduationCap size={18} />
          </div>
          <h2 className="font-bold text-base text-slate-900 tracking-tight">
            AI Course Builder
          </h2>
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
        className={`fixed left-0 top-0 w-64 h-screen bg-white border-r border-slate-200 shadow-xl lg:shadow-xs flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* App Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-xl shadow-xs shadow-blue-200">
                <FaGraduationCap size={18} />
              </div>
              <h2 className="ml-3 font-bold text-base text-slate-900 tracking-tight">
                AI Course Builder
              </h2>
            </div>

            {/* Mobile Close Button inside Drawer */}
            <button
              onClick={closeSidebar}
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1"
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
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom User Info & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3 shrink-0">
          {/* User Brief */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
              {(user?.first_name ?? user?.username ?? "U")
                .charAt(0)
                .toUpperCase()}
            </div>
            <div className="truncate">
              <h3 className="text-sm font-semibold text-slate-800 truncate">
                {user?.first_name || user?.username || "User"}
              </h3>
              <p className="text-xs text-slate-500 truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              closeSidebar();
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
          >
            <FaSignOutAlt size={14} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;