import { FaGithub, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section
      id="about"
      className="bg-slate-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <p className="uppercase tracking-widest text-blue-600 font-semibold text-sm mb-4">
              About The Project
            </p>

            <h2 className="text-4xl font-bold leading-tight mb-6">
              Built as a College
              <br />
              Capstone Project
            </h2>

            <p className="text-gray-500 leading-8 mb-6">
              AI Course Builder is an AI-powered personalized learning
              platform that generates custom learning roadmaps based on
              a learner's goals, current skill level, and available
              study time.
            </p>

            <p className="text-gray-500 leading-8 mb-10">
              The platform recommends learning resources, generates AI
              quizzes, tracks progress, and rewards learners with a
              certificate after successfully completing their roadmap.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg flex items-center gap-2 transition"
              >
                <FaRocket />
                Get Started
              </Link>

              {/* <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="border border-gray-300 px-7 py-3 rounded-lg flex items-center gap-2 hover:border-blue-600 hover:text-blue-600 transition"
              >
                <FaGithub />
                GitHub
              </a> */}

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="rounded-3xl overflow-hidden shadow-xl">

              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_1b744f77c9_a73fa08a958a7db3.png"
                alt="AI Course Builder"
                className="w-full object-cover"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;