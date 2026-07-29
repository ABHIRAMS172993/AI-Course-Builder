import TopicCard from "./TopicCard";

const LevelSection = ({
  title,
  description,
  icon,
  iconBg,
  iconColor,
  badgeColor,
  progress,
  completed,
  total,
  duration,
  topics,
}) => {
  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}
        >
          <i className={icon}></i>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{title}</h2>

            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${badgeColor}`}
            >
              {completed} / {total} Completed
            </span>
          </div>

          <p className="text-sm text-slate-500 mt-1">
            {description}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
          <i className="fa-regular fa-clock"></i>
          {duration}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <span className="text-sm font-semibold text-blue-600">
          {progress}%
        </span>
      </div>

      {/* Topics */}
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <TopicCard key={index} topic={topic} />
        ))}
      </div>
    </section>
  );
};

export default LevelSection;