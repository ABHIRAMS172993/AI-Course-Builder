import {
  FaSeedling,
  FaCodeBranch,
  FaMountain,
  FaCheck,
} from "react-icons/fa";

const SkillLevel = ({ value, setValue }) => {
  const levels = [
    {
      title: "Beginner",
      description: "Just getting started",
      icon: <FaSeedling />,
      color: "text-green-500",
    },
    {
      title: "Intermediate",
      description: "Some experience",
      icon: <FaCodeBranch />,
      color: "text-blue-500",
    },
    {
      title: "Advanced",
      description: "Solid foundation",
      icon: <FaMountain />,
      color: "text-purple-500",
    },
  ];

  return (
    <div>

      {/* Heading */}

      <div className="flex items-center gap-3 mb-2">

        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">

          <FaCodeBranch className="text-blue-600" />

        </div>

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            Current Skill Level
          </h2>

          <p className="text-gray-500 text-sm">
            Honestly assess where you stand right now.
          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-5 mt-6">

        {levels.map((level) => (
          <button
            key={level.title}
            type="button"
            onClick={() => setValue(level.title)}
            className={`
              relative
              border-2
              rounded-2xl
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
              ${
                value === level.title
                  ? "border-blue-600 bg-blue-50 shadow-md"
                  : "border-gray-200 bg-white"
              }
            `}
          >
            {/* Check */}

            {value === level.title && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <FaCheck className="text-white text-xs" />
              </div>
            )}

            {/* Icon */}

            <div
              className={`
                w-16 h-16 mx-auto rounded-2xl
                flex items-center justify-center
                text-2xl
                ${
                  value === level.title
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-100"
                }
              `}
            >
              <span className={level.color}>
                {level.icon}
              </span>
            </div>

            {/* Text */}

            <h3
              className={`
                mt-5
                text-lg
                font-bold
                ${
                  value === level.title
                    ? "text-blue-700"
                    : "text-gray-800"
                }
              `}
            >
              {level.title}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              {level.description}
            </p>

          </button>
        ))}

      </div>

    </div>
  );
};

export default SkillLevel;