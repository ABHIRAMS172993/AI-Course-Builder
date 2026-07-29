import { FaGraduationCap, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">

                <FaGraduationCap className="text-white" />

              </div>

              <div>

                <h2 className="font-bold text-xl text-white">
                  AI Course Builder
                </h2>

                <p className="text-sm text-gray-400">
                  Personalized Learning
                </p>

              </div>

            </div>

            <p className="leading-7 text-gray-400">
              AI-powered personalized learning roadmap platform with
              resource recommendations, quizzes, progress tracking,
              and certificates.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <a href="#home" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>

              <li>
                <Link to="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>

            </ul>

          </div>

          {/* Features */}

          <div>

            <h3 className="text-white font-semibold mb-5">
              Platform
            </h3>

            <ul className="space-y-3">

              <li>AI Roadmaps</li>

              <li>Learning Resources</li>

              <li>Progress Tracking</li>

              <li>AI Quiz</li>

              <li>Certificates</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <FaEnvelope />

                <span>aicoursebuilder@gmail.com</span>

              </div>

              <div className="flex gap-5 mt-6">

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
                >
                  <FaGithub />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
                >
                  <FaLinkedin />
                </a>

              </div>

            </div>

          </div>

        </div>

        <hr className="border-slate-700 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} AI Course Builder. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Built using React, Django REST Framework & Gemini AI
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;