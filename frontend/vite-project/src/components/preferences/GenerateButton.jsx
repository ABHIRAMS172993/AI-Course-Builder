import { FaWandMagicSparkles, FaBolt } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

const GenerateButton = ({ loading, generateRoadmap }) => {
  return (
    <div className="pt-8 border-t">

      {/* Button */}

      <button
        type="button"
        onClick={generateRoadmap}
        disabled={loading}
        className={`
          relative
          overflow-hidden
          w-full
          flex
          items-center
          justify-center
          gap-3
          rounded-2xl
          py-4.5
          text-base
          sm:text-lg
          font-bold
          text-white
          transition-all
          duration-300
          cursor-pointer

          ${
            loading
              ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed opacity-80"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02]"
          }
        `}
      >

        {loading ? (
          <>
            <FaSpinner className="animate-spin text-xl text-white/90" />

            <span className="tracking-wide">Generating Your Custom Roadmap...</span>
          </>
        ) : (
          <>
            <FaWandMagicSparkles className="text-xl text-indigo-100 animate-pulse" />

           <span className="tracking-wide">Generate My Roadmap</span>

            <span className="flex items-center gap-1.5 bg-white/10 dark:bg-black/20 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">

              <FaBolt className="text-amber-300 animate-bounce" />

              AI Powered

            </span>
          </>
        )}

      </button>

      {/* Note */}

      <div className="mt-4 flex items-center justify-center gap-2 text-center px-4">

        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium leading-relaxed max-w-lg">
          🚀 Your personalized roadmap will be generated using AI based on your
          selected preferences.
        </p>

      </div>

    </div>
  );
};

export default GenerateButton;