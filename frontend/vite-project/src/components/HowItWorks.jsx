import React from "react";
import {
  FaUserPen,
  FaGears,
  FaFlagCheckered,
} from "react-icons/fa6";

const steps = [
  {
    id: 1,
    icon: <FaUserPen />,
    title: "Define Your Goals",
    description:
      "Tell the AI your learning objectives, current skill level, and available study time.",
  },
  {
    id: 2,
    icon: <FaGears />,
    title: "AI Builds Your Roadmap",
    description:
      "Our AI generates a personalized roadmap with weekly topics and curated learning resources.",
  },
  {
    id: 3,
    icon: <FaFlagCheckered />,
    title: "Learn & Get Assessed",
    description:
      "Study each module, complete quizzes, track progress, and earn your certificate.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-widest text-blue-600 font-semibold text-sm mb-3">
            Simple Workflow
          </p>

          <h2 className="text-4xl font-bold mb-4">
            Start Learning in
            <br />
            Three Steps
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto">
            Tell us your goal, let AI prepare your roadmap, and start learning
            with personalized resources.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition duration-300"
            >
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {step.id}
              </div>

              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl mx-auto mb-6">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>

              <p className="text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;