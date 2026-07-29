const AdvancedSection = () => {
  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
          <i className="fa-solid fa-rocket"></i>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">Advanced</h2>

            <span className="text-xs px-3 py-1 rounded-full bg-pink-100 text-pink-600 font-semibold">
              0 / 8 Completed
            </span>

            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-500">
              🔒 Locked
            </span>
          </div>

          <p className="text-sm text-slate-500 mt-1">
            Architecture, Deployment, Cloud & Performance
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
          <i className="fa-regular fa-clock"></i>
          ~28 hrs
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 bg-pink-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-500"
            style={{ width: "0%" }}
          ></div>
        </div>

        <span className="text-sm font-semibold text-pink-500">
          0%
        </span>
      </div>

      {/* Locked Card */}
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-white shadow flex items-center justify-center mb-5">
            <i className="fa-solid fa-lock text-3xl text-slate-400"></i>
          </div>

          <h3 className="text-xl font-bold mb-2">
            Advanced Level Locked
          </h3>

          <p className="text-slate-500 max-w-lg">
            Complete all Intermediate topics to unlock the
            Advanced Roadmap.
          </p>

          <div className="w-full max-w-md mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Unlock Progress</span>
              <span>67%</span>
            </div>

            <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-amber-400"
                style={{ width: "67%" }}
              ></div>
            </div>
          </div>

          {/* Preview Topics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 w-full">
            <div className="bg-white rounded-xl border p-4 opacity-60">
              <i className="fa-solid fa-cloud text-2xl text-slate-400 mb-3"></i>

              <h4 className="font-semibold">
                Cloud Deployment
              </h4>

              <p className="text-xs text-slate-500 mt-2">
                AWS, Railway, Vercel
              </p>
            </div>

            <div className="bg-white rounded-xl border p-4 opacity-60">
              <i className="fa-brands fa-docker text-2xl text-slate-400 mb-3"></i>

              <h4 className="font-semibold">
                Docker & CI/CD
              </h4>

              <p className="text-xs text-slate-500 mt-2">
                Containers & Pipelines
              </p>
            </div>

            <div className="bg-white rounded-xl border p-4 opacity-60">
              <i className="fa-solid fa-gauge-high text-2xl text-slate-400 mb-3"></i>

              <h4 className="font-semibold">
                Performance
              </h4>

              <p className="text-xs text-slate-500 mt-2">
                Optimization & Caching
              </p>
            </div>

            <div className="bg-white rounded-xl border p-4 opacity-60">
              <i className="fa-solid fa-sitemap text-2xl text-slate-400 mb-3"></i>

              <h4 className="font-semibold">
                Microservices
              </h4>

              <p className="text-xs text-slate-500 mt-2">
                System Design
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedSection;