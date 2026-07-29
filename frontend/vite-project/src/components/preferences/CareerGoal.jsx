import { FaBullseye, FaBriefcase } from "react-icons/fa";

const CareerGoal = ({ value, setValue }) => {
  return (
    <div>

      {/* Heading */}

      <div className="flex items-center gap-3 mb-2">

        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <FaBullseye className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Career Goal
          </h2>

          <p className="text-gray-500 text-sm">
            Choose the career path you want to pursue.
          </p>
        </div>

      </div>

      {/* Dropdown */}

      <div className="relative mt-5">

        <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="
            w-full
            bg-slate-50
            border
            border-gray-200
            rounded-xl
            py-4
            pl-12
            pr-5
            outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
          "
        >
          <option value="">
            Select a career goal...
          </option>

          {/* Frontend */}

          <optgroup label="Frontend Development">
            <option>Frontend Developer</option>
            <option>React Developer</option>
            <option>UI Developer</option>
          </optgroup>

          {/* Backend */}

          <optgroup label="Backend Development">
            <option>Backend Developer</option>
            <option>Python Developer</option>
            <option>Django Developer</option>
            <option>API Developer</option>
          </optgroup>

          {/* Full Stack */}

          <optgroup label="Full Stack Development">
            <option>Full Stack Developer</option>
            <option>Software Engineer</option>
            <option>Web Application Developer</option>
          </optgroup>

          {/* Data Science */}

          <optgroup label="Data Science">
            <option>Data Scientist</option>
            <option>Data Analyst</option>
            <option>Business Intelligence Analyst</option>
          </optgroup>

          {/* Machine Learning */}

          <optgroup label="Machine Learning">
            <option>Machine Learning Engineer</option>
            <option>AI Engineer</option>
            <option>Deep Learning Engineer</option>
            <option>Computer Vision Engineer</option>
            <option>NLP Engineer</option>
          </optgroup>

        </select>

      </div>

    </div>
  );
};

export default CareerGoal;