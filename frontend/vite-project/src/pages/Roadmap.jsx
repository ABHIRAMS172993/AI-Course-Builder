import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import RoadmapHeader from "../components/roadmap/RoadmapHeader";
import OverallProgress from "../components/roadmap/OverallProgress";

const resourceIcons = {
  Video: "🎥",
  Article: "📄",
  Project: "💻",
  Book: "📚",
};

const RoadmapPage = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizLoading, setQuizLoading] = useState(null);

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(`${API}/roadmap/current/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoadmap(response.data);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Something went wrong.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const completeResource = async (id) => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        `${API}/roadmap/complete-resource/`,
        { resource_progress_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchRoadmap();
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Something went wrong.";
      alert(message);
    }
  };

  const completeWeek = async (roadmapId, weekNumber) => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        `${API}/roadmap/complete-week/`,
        {
          roadmap_id: roadmapId,
          week: weekNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchRoadmap();
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Something went wrong.";
      alert(message);
    }
  };

  const generateQuiz = async (roadmapId, week) => {
    try {
      setQuizLoading(`${roadmapId}-${week}`);
      const token = localStorage.getItem("access");
      const response = await axios.post(
        `${API}/roadmap/quiz/generate/`,
        {
          roadmap_id: roadmapId,
          week: week,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/quiz", { state: response.data });
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Something went wrong.";
      alert(message);
    } finally {
      setQuizLoading(null);
    }
  };

  const generateCertificate = async () => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        `${API}/roadmap/certificate/`,
        {
          roadmap_id: roadmap[0].roadmap_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Certificate Generated");
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Something went wrong.";
      alert(message);
    }
  };

  const completedWeeks = roadmap.filter((week) => week.completed).length;

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-5 text-base sm:text-lg text-gray-600 font-medium">
          Loading your personalized roadmap...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen antialiased">
      <div className="flex">
        <Sidebar />

       
        <main className="flex-1 ml-0 lg:ml-64 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-12 min-w-0 transition-all duration-300">
          <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
            <RoadmapHeader />

            <OverallProgress
              completed={completedWeeks}
              total={roadmap.length}
              percentage={
                roadmap.length === 0
                  ? 0
                  : Math.round((completedWeeks / roadmap.length) * 100)
              }
            />

            {/* Weeks List */}
            <div className="space-y-6 sm:space-y-8">
              {roadmap.map((week) => {
                const allResourcesCompleted =
                  (week.resources?.length || 0) > 0 &&
                  week.resources.every((resource) => resource.completed);

                return (
                  <div
                    key={week.id || week.week}
                    className={`bg-white rounded-2xl shadow-xs p-4 sm:p-6 lg:p-8 transition-shadow ${
                      !week.completed
                        ? "border-2 border-blue-500"
                        : "border border-slate-200/80"
                    }`}
                  >
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                          Week {week.week}
                        </h2>
                        <p className="text-base sm:text-lg text-blue-600 font-semibold mt-1">
                          {week.topic_name}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Estimated Hours: {week.hours}
                        </p>
                      </div>

                      <div className="self-start sm:self-auto">
                        {week.completed ? (
                          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-semibold">
                            ✓ Completed
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-orange-100 text-orange-700 text-xs sm:text-sm font-semibold">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                      {week.resources?.map((item) => (
                        <div
                          key={item.id}
                          className="border border-slate-200 rounded-xl p-3.5 sm:p-4 flex items-start justify-between gap-4 hover:border-slate-300 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base sm:text-lg text-slate-800 break-words">
                              {item.resource.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed break-words">
                              {item.resource.description}
                            </p>
                            <div className="mt-2 text-xs sm:text-sm font-medium text-slate-700">
                              <span>
                                {resourceIcons[item.resource.resource_type] || "🔗"}{" "}
                                {item.resource.resource_type}
                              </span>
                            </div>
                            <a
                              href={item.resource.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block mt-2.5 text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
                            >
                              Open Resource →
                            </a>
                          </div>

                          <div className="flex items-center pt-1">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => completeResource(item.id)}
                              className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                      {week.completed ? (
                        <button
                          className="w-full sm:w-auto bg-green-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold cursor-default text-sm sm:text-base text-center"
                          disabled
                        >
                          ✓ Week Completed
                        </button>
                      ) : (
                        <button
                          onClick={async () => {
                            if (
                              !window.confirm(
                                "Mark this week as completed?"
                              )
                            ) {
                              return;
                            }
                            await completeWeek(
                              week.roadmap_id,
                              week.week
                            );
                          }}
                          disabled={!allResourcesCompleted}
                          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-colors"
                        >
                          Complete Week
                        </button>
                      )}

                      {week.completed && (
                        <button
                          onClick={() =>
                            generateQuiz(week.roadmap_id, week.week)
                          }
                          disabled={
                            quizLoading ===
                            `${week.roadmap_id}-${week.week}`
                          }
                          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-colors"
                        >
                          {quizLoading ===
                          `${week.roadmap_id}-${week.week}`
                            ? "Generating..."
                            : "Generate Quiz"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certificate Section */}
            {roadmap.length > 0 && completedWeeks === roadmap.length && (
              <div className="mt-8 sm:mt-10 text-center">
                <button
                  onClick={generateCertificate}
                  className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl text-base sm:text-lg font-bold shadow-md transition-all active:scale-95"
                >
                  🎓 Generate Certificate
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoadmapPage;