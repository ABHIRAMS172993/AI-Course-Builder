const RoadmapHeader = () => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      {/* Left */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          My Learning Roadmap
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2 leading-relaxed">
          AI-generated path for{" "}
          <span className="font-semibold text-blue-600">
            Web Development
          </span>{" "}
          • Full-Stack Engineering
        </p>
      </div>
    </div>
  );
};

export default RoadmapHeader;