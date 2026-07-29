import {
  FaBookOpen,
  FaPlayCircle,
  FaHammer,
  FaCheck,
} from "react-icons/fa";

const styles = [
  {
    title: "Video",
    value: "Video",
    subtitle: "Watch & Learn",
    icon: <FaPlayCircle size={28} />,
  },
  {
    title: "Reading",
    value: "Reading",
    subtitle: "Articles & Books",
    icon: <FaBookOpen size={28} />,
  },
  {
    title: "Projects",
    value: "Projects",
    subtitle: "Hands-on Practice",
    icon: <FaHammer size={28} />,
  },
];

const LearningStyle = ({ value, setValue }) => {
  return (
    <div>

      {/* Heading */}

      <div className="flex items-center gap-3 mb-5">

        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">

          <FaBookOpen className="text-blue-600" />

        </div>

        <div>

          <h2 className="text-xl font-bold">
            Learning Style
          </h2>

          <p className="text-gray-500 text-sm">
            Choose how you prefer learning.
          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-5">

        {styles.map((style) => {

          const active = value === style.value;

          return (

            <div
              key={style.value}
              onClick={() => setValue(style.value)}
              className={`
                relative
                cursor-pointer
                rounded-2xl
                border-2
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg

                ${
                  active
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white"
                }
              `}
            >

              {/* Check */}

              {active && (

                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">

                  <FaCheck
                    size={11}
                    className="text-white"
                  />

                </div>

              )}

              {/* Icon */}

              <div
                className={`
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  mb-5

                  ${
                    active
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-100 text-gray-500"
                  }
                `}
              >

                {style.icon}

              </div>

              {/* Title */}

              <h3
                className={`
                  text-lg
                  font-bold

                  ${
                    active
                      ? "text-blue-700"
                      : "text-gray-800"
                  }
                `}
              >
                {style.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {style.subtitle}
              </p>

            </div>

          );
        })}

      </div>

    </div>
  );
};

export default LearningStyle;