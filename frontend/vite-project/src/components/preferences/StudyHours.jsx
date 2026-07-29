import { FaClock, FaInfoCircle } from "react-icons/fa";

const StudyHours = ({ value, setValue }) => {
  const getRecommendation = () => {
    if (value <= 5) {
      return `${value} hrs/week is a Casual pace — estimated completion in 8-12 months.`;
    }

    if (value <= 15) {
      return `${value} hrs/week is a Part-time pace — estimated completion in 3–5 months.`;
    }

    if (value <= 25) {
      return `${value} hrs/week is an Intensive pace — estimated completion in 6–10 weeks.`;
    }

    return `${value} hrs/week is Full-time immersion — estimated completion in 3–5 weeks 🚀`;
  };

  const percentage = ((value - 1) / 39) * 100;

  return (
    <div>

      {/* Heading */}

      <div className="flex items-center gap-3 mb-5">

        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">

          <FaClock className="text-blue-600" />

        </div>

        <div>

          <h2 className="text-xl font-bold">
            Weekly Study Hours
          </h2>

          <p className="text-gray-500 text-sm">
            How many hours can you dedicate every week?
          </p>

        </div>

      </div>

      {/* Current Value */}

      <div className="flex justify-between items-center mb-6">

        <span className="text-gray-500 text-sm">
          1 hr/week
        </span>

        <div className="bg-blue-600 text-white rounded-xl px-5 py-2 shadow">

          <span className="text-2xl font-bold">
            {value}
          </span>

          <span className="ml-2 text-sm">
            hrs/week
          </span>

        </div>

        <span className="text-gray-500 text-sm">
          40 hrs/week
        </span>

      </div>

      {/* Slider */}

      <input
        type="range"
        min={1}
        max={40}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right,
          #2563eb 0%,
          #2563eb ${percentage}%,
          #e5e7eb ${percentage}%,
          #e5e7eb 100%)`,
        }}
      />

      {/* Labels */}

      <div className="flex justify-between mt-3 text-xs text-gray-400">

        <span>Casual</span>

        <span>Part-time</span>

        <span>Full-time</span>

      </div>

      {/* Recommendation */}

      <div className="mt-6 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">

        <FaInfoCircle className="text-blue-600 mt-1" />

        <p className="text-blue-700 text-sm leading-relaxed">

          {getRecommendation()}

        </p>

      </div>

    </div>
  );
};

export default StudyHours;