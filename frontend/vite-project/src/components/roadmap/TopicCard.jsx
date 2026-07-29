import React from "react";

const TopicCard = ({ topic }) => {
  const {
    title,
    description,
    duration,
    icon,
    status,
    progress = 0,
  } = topic;

  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isLocked = status === "locked";

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg
      ${
        isCurrent
          ? "border-blue-600 bg-blue-50 shadow-md"
          : isCompleted
          ? "border-green-200 bg-white"
          : "border-slate-200 bg-white opacity-70"
      }`}
    >
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {/* Left */}
        <div className="flex gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center
            ${
              isCompleted
                ? "bg-green-100 text-green-600"
                : isCurrent
                ? "bg-blue-100 text-blue-600"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            <i className={icon}></i>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {title}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {description}
            </p>

            <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
              <span>
                <i className="fa-regular fa-clock mr-2"></i>
                {duration}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end justify-between">
          {isCompleted && (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              ✔ Completed
            </span>
          )}

          {isCurrent && (
            <>
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                In Progress
              </span>

              <div className="w-56 mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>

                <div className="h-2 rounded-full bg-blue-100 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">
                  Continue Learning
                </button>
              </div>
            </>
          )}

          {isLocked && (
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold">
              Not Started
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicCard;