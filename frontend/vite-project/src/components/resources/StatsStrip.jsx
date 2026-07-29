const StatsStrip = ({
  totalResources = 48,
  completed = 12,
  bookmarked = 4,
  totalHours = "86h",
}) => {
  const stats = [
    {
      icon: "fa-solid fa-layer-group",
      bg: "bg-blue-50",
      iconColor: "text-primary",
      value: totalResources,
      label: "Total Resources",
    },
    {
      icon: "fa-solid fa-circle-check",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      value: completed,
      label: "Completed",
    },
    {
      icon: "fa-solid fa-bookmark",
      bg: "bg-amber-50",
      iconColor: "text-amber-500",
      value: bookmarked,
      label: "Bookmarked",
    },
    {
      icon: "fa-solid fa-clock",
      bg: "bg-purple-50",
      iconColor: "text-purple-500",
      value: `~${totalHours}`,
      label: "Total Content",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-surface border border-lineMuted rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm"
        >
          <div
            className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center ${item.iconColor} shrink-0`}
          >
            <i className={`${item.icon} text-sm`}></i>
          </div>

          <div>
            <p className="text-lg font-bold text-textMain leading-tight">
              {item.value}
            </p>

            <p className="text-[11px] text-textMuted">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsStrip;