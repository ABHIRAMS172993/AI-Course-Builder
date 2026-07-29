import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaGraduationCap,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <FaGraduationCap className="text-white text-sm" />
          </div>

          <span className="font-bold text-lg">
            AI Course Builder
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">

          <a href="#home" className="hover:text-blue-600">
            Home
          </a>

          <a href="#features" className="hover:text-blue-600">
            Features
          </a>

          <a href="#about" className="hover:text-blue-600">
            About
          </a>

          <Link
              to="/dashboard"
              className="hover:text-blue-600"
            >
              Dashboard
            </Link>

          
        </div>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4">

          <a href="#home" onClick={() => setOpen(false)}>
            Home
          </a>

          <a href="#features" onClick={() => setOpen(false)}>
            Features
          </a>

          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>

          {user ? (
            <>
              <p className="font-semibold">
                Hi, {user.first_name || user.username}
              </p>

              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block text-blue-600 font-semibold"
            >
              Login
            </Link>
          )}

          <Link
              to="/dashboard"
              className="hover:text-blue-600"
            >
              Dashboard
            </Link>



        </div>
      )}
    </header>
  );
};

export default Navbar;