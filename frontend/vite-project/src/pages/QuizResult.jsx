import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import {
  FaClipboardCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
  FaCalendarAlt,
  FaRedo,
  FaBookOpen,
  FaTrophy,
} from "react-icons/fa";

const QuizResult = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await axios.get(`${API}/roadmap/quiz/results/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setResults(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  /* ----------------------- Statistics ----------------------- */

  const stats = useMemo(() => {
    const totalQuizzes = results.length;
    const passed = results.filter((q) => q.passed).length;
    const failed = totalQuizzes - passed;

    const average =
      totalQuizzes > 0
        ? (
            results.reduce((sum, q) => sum + Number(q.percentage), 0) /
            totalQuizzes
          ).toFixed(1)
        : 0;

    return {
      totalQuizzes,
      passed,
      failed,
      average,
    };
  }, [results]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased">
      <div className="flex">
        <Sidebar />

       
        <main className="flex-1 ml-0 lg:ml-64 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-12 max-w-7xl mx-auto w-full min-w-0 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Quiz Results
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                View all your quiz attempts and performance statistics.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-3 sm:gap-4 self-start md:self-auto w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl shrink-0">
                <FaTrophy />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Average Score
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-blue-700">
                  {stats.average}%
                </h2>
              </div>
            </div>
          </div>

          {/* Summary Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
            {/* Total Quizzes Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 hover:border-slate-300 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Total Quizzes
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 sm:mt-2">
                    {stats.totalQuizzes}
                  </h2>
                </div>
                <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <FaClipboardCheck className="text-lg sm:text-2xl" />
                </div>
              </div>
            </div>

            {/* Passed Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 hover:border-slate-300 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Passed
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1 sm:mt-2">
                    {stats.passed}
                  </h2>
                </div>
                <div className="p-2.5 sm:p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <FaCheckCircle className="text-lg sm:text-2xl" />
                </div>
              </div>
            </div>

            {/* Failed Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 hover:border-slate-300 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Failed
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-rose-600 mt-1 sm:mt-2">
                    {stats.failed}
                  </h2>
                </div>
                <div className="p-2.5 sm:p-3 bg-rose-50 text-rose-600 rounded-xl">
                  <FaTimesCircle className="text-lg sm:text-2xl" />
                </div>
              </div>
            </div>

            {/* Average Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 hover:border-slate-300 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Average
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mt-1 sm:mt-2">
                    {stats.average}%
                  </h2>
                </div>
                <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <FaChartLine className="text-lg sm:text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Body State */}
          {loading ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8 sm:p-16 text-center">
              <div className="animate-spin h-8 w-8 sm:h-10 sm:w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Loading Quiz Results...
              </h2>
            </div>
          ) : results.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8 sm:p-16 text-center max-w-md mx-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl">
                <FaClipboardCheck />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                No Quiz Attempts Yet
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2">
                Complete a quiz to view your performance history and AI recommendations here.
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {results.map((result) => (
                <div
                  key={result.attempt_id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200 hover:border-slate-300"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:px-6 sm:py-5 border-b border-slate-100 bg-slate-50/50">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        {result.topic}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1.5 text-xs font-medium text-slate-500">
                        <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                          📚 Week {result.week}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <FaCalendarAlt className="text-slate-400" />
                          {new Date(result.completed_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center justify-center px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider self-start sm:self-center ${
                        result.passed
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {result.passed ? "PASSED" : "FAILED"}
                    </span>
                  </div>

                  {/* Statistics Breakdown Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 sm:p-6">
                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 sm:p-4 text-center">
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Score
                      </p>
                      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mt-1">
                        {result.score}/{result.total}
                      </h2>
                    </div>

                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 sm:p-4 text-center">
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Percentage
                      </p>
                      <h2
                        className={`text-xl sm:text-2xl font-bold mt-1 ${
                          result.passed ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {result.percentage}%
                      </h2>
                    </div>

                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 sm:p-4 text-center">
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Correct
                      </p>
                      <h2 className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
                        {result.score}
                      </h2>
                    </div>

                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 sm:p-4 text-center">
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Wrong
                      </p>
                      <h2 className="text-xl sm:text-2xl font-bold text-rose-600 mt-1">
                        {result.total - result.score}
                      </h2>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="px-4 sm:px-6">
                    <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                      <span className="text-slate-600">Performance Bar</span>
                      <span className="text-slate-900">{result.percentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          result.passed ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                        style={{
                          width: `${result.percentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* AI Recommendation */}
                  <div className="mx-4 sm:mx-6 mt-4 sm:mt-6 bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-bold text-blue-800 flex items-center gap-2 mb-2">
                      <span>🤖</span> AI Recommendation
                    </h3>
                    {result.passed ? (
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Excellent work! You demonstrated a strong understanding of this topic.
                        <br className="hidden sm:inline" />
                        <span className="font-semibold text-slate-800">
                          {" "}Recommended next step:
                        </span>{" "}
                        Continue progressing with the next roadmap module.
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Revise the core concepts of{" "}
                        <strong className="text-slate-900">{result.topic}</strong>{" "}
                        and attempt the quiz again after reviewing your learning materials.
                      </p>
                    )}
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-2 sm:gap-3 p-4 sm:px-6 sm:py-5 mt-2 border-t border-slate-100">
                    <button
                      onClick={() => navigate("/roadmap")}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer w-full sm:w-auto"
                    >
                      <FaBookOpen />
                      View Roadmap
                    </button>

                    {!result.passed && (
                      <button
                        onClick={() =>
                          navigate("/roadmap", {
                            state: {
                              week: result.week,
                              topic: result.topic,
                            },
                          })
                        }
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <FaRedo />
                        Retake Quiz
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuizResult;