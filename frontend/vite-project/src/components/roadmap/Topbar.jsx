const Topbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 lg:px-10 h-16 flex items-center justify-between">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>

        <input
          type="text"
          placeholder="Search courses, topics, or skills..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-slate-100 transition">
          <i className="fa-solid fa-bell text-slate-600"></i>

          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-500 rounded-full border-2 border-white"></span>
        </button>

        <img
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
          alt="User"
          className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200"
        />
      </div>
    </header>
  );
};

export default Topbar;