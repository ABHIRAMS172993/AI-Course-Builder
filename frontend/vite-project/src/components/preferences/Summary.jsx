import {
  FaBriefcase,
  FaChartLine,
  FaBookOpen,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";

const Summary = ({ formData }) => {
  return (
    <div className="border-t pt-8">

      {/* Heading */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          Summary
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Review your roadmap preferences before generating.
        </p>

      </div>

      {/* Summary Grid */}

      <div className="grid md:grid-cols-2 gap-5">

        {/* Career */}

        <div className="bg-slate-50 rounded-xl p-5 border">

          <div className="flex items-center gap-3 mb-3">

            <FaBriefcase className="text-blue-600 text-lg" />

            <h3 className="font-semibold">
              Career Goal
            </h3>

          </div>

          <p className="text-gray-700">
            {formData.career_goal || "Not Selected"}
          </p>

        </div>

        {/* Skill */}

        <div className="bg-slate-50 rounded-xl p-5 border">

          <div className="flex items-center gap-3 mb-3">

            <FaChartLine className="text-green-600 text-lg" />

            <h3 className="font-semibold">
              Skill Level
            </h3>

          </div>

          <p className="text-gray-700">
            {formData.skill_level}
          </p>

        </div>

        {/* Learning Style */}

        {/* <div className="bg-slate-50 rounded-xl p-5 border">

          <div className="flex items-center gap-3 mb-3">

            <FaBookOpen className="text-purple-600 text-lg" />

            <h3 className="font-semibold">
              Learning Style
            </h3>

          </div>

          <p className="text-gray-700">
            {formData.learning_style}
          </p>

        </div> */}

        {/* Study Hours */}

        <div className="bg-slate-50 rounded-xl p-5 border">

          <div className="flex items-center gap-3 mb-3">

            <FaClock className="text-orange-500 text-lg" />

            <h3 className="font-semibold">
              Weekly Study Hours
            </h3>

          </div>

          <p className="text-gray-700">
            {formData.study_hours} hrs / week
          </p>

        </div>

      </div>

      {/* Domains */}

      <div className="mt-6 bg-slate-50 border rounded-xl p-5">

        <div className="flex items-center gap-3 mb-4">

          <FaLayerGroup className="text-blue-600 text-lg" />

          <h3 className="font-semibold">
            Preferred Domains
          </h3>

        </div>

        <div className="flex flex-wrap gap-3">

          {formData.preferred_domains.length > 0 ? (
            formData.preferred_domains.map((domain) => (
              <span
                key={domain}
                className="
                  px-4
                  py-2
                  bg-blue-600
                  text-white
                  rounded-full
                  text-sm
                  font-medium
                "
              >
                {domain}
              </span>
            ))
          ) : (
            <span className="text-gray-500">
              No domains selected
            </span>
          )}

        </div>

      </div>

    </div>
  );
};

export default Summary;