const LoadMore = ({ remaining = 36, onLoadMore }) => {
  return (
    <div className="flex justify-center mt-8 mb-4">
      <button
        onClick={onLoadMore}
        className="flex items-center gap-2 px-6 py-3 bg-surface border border-lineMuted rounded-xl text-sm font-semibold text-textMuted hover:bg-slate-50 transition-colors shadow-sm"
      >
        <i className="fa-solid fa-rotate-right"></i>

        Load More Resources

        <span className="text-xs text-primary font-bold bg-blue-50 px-2 py-0.5 rounded-full">
          +{remaining}
        </span>
      </button>
    </div>
  );
};

export default LoadMore;