const SearchBar = ({
  search,
  setSearch,
  savedCount = 4,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-textMuted text-sm"></i>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources by title, platform, or topic..."
          className="w-full pl-11 pr-4 py-3 bg-surface border border-lineMuted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all shadow-sm placeholder:text-slate-400"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">
        <select
          onChange={onSortChange}
          className="px-3 py-2.5 bg-surface border border-lineMuted rounded-xl text-sm text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm"
        >
          <option value="recommended">
            Sort: Recommended
          </option>

          <option value="newest">
            Sort: Newest
          </option>

          <option value="duration">
            Sort: Duration ↑
          </option>

          <option value="beginner">
            Sort: Beginner First
          </option>
        </select>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-lineMuted rounded-xl text-sm text-textMuted hover:bg-slate-50 transition-colors shadow-sm">
          <i className="fa-solid fa-bookmark text-primary"></i>

          Saved

          <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {savedCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;