const ResourceCard = ({ resource, toggleBookmark }) => {
  return (
    <div className="resource-card bg-surface rounded-2xl border border-lineMuted shadow-sm overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div
        className={`relative h-40 ${resource.gradient} flex items-center justify-center overflow-hidden`}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        ></div>

        <i className={`${resource.heroIcon} text-6xl text-white/25`}></i>

        {/* AI Pick */}
        {resource.aiPick && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold text-white bg-primary/80 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
              <i className="fa-solid fa-star"></i>
              AI Pick
            </span>
          </div>
        )}

        {/* Bookmark */}
        <div className="absolute top-3 right-3">
          <button
            onClick={() => toggleBookmark(resource.id)}
            className={`w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
              resource.bookmarked
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            <i
              className={`${
                resource.bookmarked
                  ? "fa-solid"
                  : "fa-regular"
              } fa-bookmark text-sm`}
            ></i>
          </button>
        </div>

        {/* Tags */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
          <span className="text-[10px] font-semibold text-white bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <i className={resource.typeIcon}></i>
            {resource.typeLabel}
          </span>

          {resource.badge && (
            <span className="text-[10px] font-semibold text-white bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
              {resource.badge}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-6 h-6 rounded-md ${resource.platformBg} flex items-center justify-center shrink-0`}
          >
            <i
              className={`${resource.platformIcon} text-[10px] ${resource.platformColor}`}
            ></i>
          </div>

          <span className="text-xs font-medium text-textMuted">
            {resource.platform}
          </span>
        </div>

        <h3 className="text-base font-bold text-textMain mb-2 leading-snug">
          {resource.title}
        </h3>

        <p className="text-xs text-textMuted mb-4 leading-relaxed">
          {resource.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${resource.levelStyle}`}
          >
            <i className="fa-solid fa-signal text-[9px]"></i>
            {resource.level}
          </span>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-textMuted bg-slate-100 px-2.5 py-1 rounded-full">
            <i className="fa-regular fa-clock text-[9px]"></i>
            {resource.duration}
          </span>

          {resource.extra && (
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${resource.extraStyle}`}
            >
              {resource.extra}
            </span>
          )}
        </div>

        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full py-2.5 bg-primary hover:bg-primaryHover text-white rounded-xl text-sm font-semibold text-center transition-colors flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
          Open Resource
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;