import {
  FaLaptopCode,
  FaServer,
  FaLayerGroup,
  FaChartPie,
  FaRobot,
} from "react-icons/fa";

const domainList = [
  {
    name: "Frontend Development",
    icon: <FaLaptopCode />,
  },
  {
    name: "Backend Development",
    icon: <FaServer />,
  },
  {
    name: "Full Stack Development",
    icon: <FaLayerGroup />,
  },
  {
    name: "Data Science",
    icon: <FaChartPie />,
  },
  {
    name: "Machine Learning",
    icon: <FaRobot />,
  },
];

const PreferredDomains = ({ domains, toggleDomain }) => {
  return (
    <div>
      {/* Heading */}

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Preferred Domains
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Select one or more domains that interest you.
          </p>
        </div>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">
          Multiple Selection
        </span>
      </div>

      {/* Domain Chips */}

      <div className="flex flex-wrap gap-4">
        {domainList.map((domain) => {
          const selected = domains.includes(domain.name);

          return (
            <button
              key={domain.name}
              type="button"
              onClick={() => toggleDomain(domain.name)}
              className={`
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-full
                border
                font-medium
                transition-all
                duration-300

                ${
                  selected
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                    : "bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow"
                }
              `}
            >
              <span className="text-lg">
                {domain.icon}
              </span>

              {domain.name}
            </button>
          );
        })}
      </div>

      {/* Selected Count */}

      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Selected Domains:
          <span className="ml-2 font-semibold text-blue-600">
            {domains.length}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PreferredDomains;