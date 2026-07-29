const topics = [
  "All Topics",
  "HTML & CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "MongoDB",
  "Git & GitHub",
];

const TopicSidebar = ({ selectedTopic, setSelectedTopic }) => {
  return (
    <div className="mt-8 px-2">
      <p className="text-[11px] font-semibold text-textMuted uppercase tracking-wider mb-3">
        Filter by Topic
      </p>

      <div className="space-y-1">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTopic === topic
                ? "bg-blue-50 text-primary"
                : "text-textMuted hover:bg-slate-50 hover:text-textMain"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-lineMuted bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm font-medium mb-1">
          <i className="fa-solid fa-bolt text-amber-500"></i>
          Pro Tip
        </div>

        <p className="text-xs text-textMuted leading-relaxed">
          Bookmark resources to revisit them later from your saved list.
        </p>
      </div>
    </div>
  );
};

export default TopicSidebar;