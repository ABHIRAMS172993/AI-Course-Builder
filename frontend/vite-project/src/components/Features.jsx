import {
  FaMapMarkedAlt,
  FaBookOpen,
  FaChartLine,
  FaQuestionCircle,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    icon: <FaMapMarkedAlt className="text-blue-600 text-xl" />,
    title: "AI Roadmap Generation",
    description:
      "Generate a personalized learning roadmap based on your goals, skill level, and available study time.",
  },
  {
    icon: <FaBookOpen className="text-blue-600 text-xl" />,
    title: "Learning Resource Recommendation",
    description:
      "Receive curated YouTube videos, documentation, courses, books, and articles for every topic.",
  },
  {
    icon: <FaChartLine className="text-blue-600 text-xl" />,
    title: "Progress Tracking",
    description:
      "Monitor completed topics, learning streaks, weekly progress, and overall roadmap completion.",
  },
  {
    icon: <FaQuestionCircle className="text-blue-600 text-xl" />,
    title: "AI Quiz Assessment",
    description:
      "Practice with AI-generated quizzes, receive instant feedback, explanations, and track your scores.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-blue-600 uppercase font-semibold tracking-widest text-sm">
            Features
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Everything You Need
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Our AI-powered platform helps you plan, learn, practice and
            monitor your journey—all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-7">
                {feature.description}
              </p>

              {/* <button className="mt-6 flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                Learn More
                <FaArrowRight />
              </button> */}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;