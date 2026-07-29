import { Link } from "react-router-dom";
import { FaGraduationCap, FaRocket } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-slate-50 border border-gray-200 rounded-3xl py-16 px-8 text-center">

          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-8">
            <FaGraduationCap className="text-blue-600 text-2xl" />
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-5">
            Ready to Build Your
            <br />
            Learning Roadmap?
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto leading-8 mb-10">
            Join thousands of learners using AI to build personalized
            study plans, discover quality learning resources,
            track progress, and achieve their career goals.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition duration-300"
          >
            <FaRocket />
            Get Started For Free
          </Link>

        </div>

      </div>
    </section>
  );
};

export default CTA;