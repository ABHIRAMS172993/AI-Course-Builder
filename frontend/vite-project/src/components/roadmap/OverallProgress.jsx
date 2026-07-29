const OverallProgress = ({ completed, total, percentage }) => {
  const remaining = total - completed;

  const completedWidth = total === 0 ? 0 : (completed / total) * 100;
  const remainingWidth = 100 - completedWidth;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">
            Overall Progress
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
            {completed} of {total} topics completed
          </p>
        </div>

        <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 flex-shrink-0"></span>
            <span className="text-slate-500">
              Completed{" "}
              <strong className="text-slate-900">{completed}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-300 flex-shrink-0"></span>
            <span className="text-slate-500">
              Remaining{" "}
              <strong className="text-slate-900">{remaining}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-2.5 sm:h-3 rounded-full overflow-hidden bg-slate-100 flex">
        <div
          className="bg-emerald-500 transition-all duration-500 h-full"
          style={{ width: `${completedWidth}%` }}
        />
        <div
          className="bg-slate-200 transition-all duration-500 h-full"
          style={{ width: `${remainingWidth}%` }}
        />
      </div>

      <div className="flex justify-between items-center mt-2.5 sm:mt-3 text-xs">
        <span className="text-slate-500">Start</span>
        <span className="font-bold text-slate-900">{percentage}% Complete</span>
        <span className="text-slate-500">Goal</span>
      </div>
    </div>
  );
};

export default OverallProgress;