const FilterBar = ({
  activeFilter,
  setActiveFilter,
  resultCount,
}) => {
  const filters = [
    {
      id: "all",
      label: "All",
      icon: "fa-solid fa-border-all",
    },
    {
      id: "courses",
      label: "Courses",
      icon: "fa-solid fa-graduation-cap",
    },
    {
      id: "youtube",
      label: "YouTube",
      icon: "fa-brands fa-youtube",
    },
    {
      id: "docs",
      label: "Documentation",
      icon: "fa-solid fa-file-lines",
    },
    {
      id: "practice",
      label: "Practice",
      icon: "fa-solid fa-dumbbell",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "fa-solid fa-code-branch",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-7">
      <span className="text-xs font-semibold text-textMuted mr-1">
        Filter:
      </span>

      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium shadow-sm transition-all
            ${
              activeFilter === filter.id
                ? "bg-primary text-white border-primary"
                : "bg-surface border-lineMuted text-textMuted hover:border-primary hover:text-primary"
            }`}
        >
          <i className={`${filter.icon} text-xs`}></i>
          {filter.label}
        </button>
      ))}

      <div className="ml-auto text-xs text-textMuted font-medium">
        Showing {resultCount} resource{resultCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default FilterBar;