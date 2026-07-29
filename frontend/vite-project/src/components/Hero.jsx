import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="pt-14 min-h-[90vh] flex items-center bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left Content */}
          <div className="w-full lg:w-[58%]">

            <div className="relative inline-flex items-center rounded-full p-[1px] mb-8 overflow-hidden bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 animate-pulse">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>

                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  AI Powered Learning Platform
                </span>
             </div>
          </div>


            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Build Your
              <span className="text-blue-600"> Personalized </span>
              Learning Roadmap
            </h1>

            <p className="mt-6 text-lg text-slate-500 leading-8 max-w-xl">
              Learn smarter with AI-generated study plans, personalized
              resources, quizzes, progress tracking, and certificates —
              everything tailored to your career goals.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/register"
              className="relative overflow-hidden bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 group"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700"></span>

              <span className="relative">
                Get Started
              </span>
            </Link>
          </div>

            <div className="flex gap-10 mt-12">

              <div>
                <h3 className="text-2xl font-bold">100+</h3>
                <p className="text-slate-500 text-sm">
                  Learning Resources
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">AI</h3>
                <p className="text-slate-500 text-sm">
                  Personalized Roadmaps
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-slate-500 text-sm">
                  Forever
                </p>
              </div>

            </div>

          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[42%]">

            <div className="relative">

              <div className="absolute inset-0 bg-blue-100 rounded-3xl rotate-3"></div>

              <div className="relative rounded-3xl overflow-hidden shadow-xl border bg-white p-3">

                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_1b744f77c9_fd19e58d054bf8d3.png"
                  alt="AI Learning"
                  className="rounded-2xl w-full"
                />

                <div className="absolute bottom-8 left-6 right-6 bg-white shadow-xl rounded-xl p-4 flex items-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-[float_4s_ease-in-out_infinite]">

                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center text-xl animate-pulse">
                  🧠
                </div>

                <div className="ml-4">
                  <h4 className="font-semibold">
                    Roadmap Generated
                  </h4>
                  <p className="text-sm text-slate-500">
                    20 Weeks • Personalized
                  </p>
                </div>

                <div className="ml-auto text-green-500 text-2xl animate-bounce">
                  ✓
                </div>

              </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;