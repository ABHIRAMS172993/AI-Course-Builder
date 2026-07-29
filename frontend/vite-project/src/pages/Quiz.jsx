import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Topbar from "../components/roadmap/Topbar";
import Sidebar from "../components/Sidebar";

const Quiz = () => {

    const API = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const location = useLocation();

    // Data received from RoadmapPage
    const {
        attempt_id,
        topic,
        questions = []
    } = location.state || {};

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState({});

    const [submitting, setSubmitting] = useState(false);

    const [showResult, setShowResult] = useState(false);

    const [result, setResult] = useState(null);

    // 15 minute timer
    const [timeLeft, setTimeLeft] = useState(4 * 60);

    // Timer
    useEffect(() => {

        if (showResult) return;

        if (timeLeft <= 0) {

            submitQuiz();

            return;
        }

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft, showResult]);



    // Redirect if page refreshed
    useEffect(() => {

        if (!questions.length) {

            navigate("/roadmap");

        }

    }, []);



    const formatTime = (seconds) => {

        const mins = Math.floor(seconds / 60);

        const secs = seconds % 60;

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    };



    const answeredCount = Object.keys(answers).length;

    const progressPercentage = Math.round(

        ((currentQuestion + 1) / questions.length) * 100

    );



    const handleOptionSelect = (index) => {

        setAnswers(prev => ({
    ...prev,
     [questions[currentQuestion].id]: index,
}));

    };



    const goNext = () => {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(currentQuestion + 1);


        }

    };



    const goPrevious = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(currentQuestion - 1);


        }

    };



    const jumpToQuestion = (index) => {

        setCurrentQuestion(index);


    };



    const submitQuiz = async () => {

        if (submitting) return;

        try {

            setSubmitting(true);

            const token = localStorage.getItem("access");

            const formattedAnswers = Object.entries(answers).map(

                ([questionId, selected]) => ({

                    question_id: Number(questionId),

                    selected_answer: selected,

                })

            );

            const response = await axios.post(

                `${API}/roadmap/quiz/submit/`,

                {

                    attempt_id,

                    answers: formattedAnswers,

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setResult(response.data);

            setShowResult(true);

        }

        catch (err) {

            console.error(err);

            alert(

                err.response?.data?.error ??

                "Unable to submit quiz."

            );

        }

        finally {

            setSubmitting(false);

        }

    };



    if (!questions.length) {

        return null;

    }



    const question = questions[currentQuestion];

    const selectedAnswer = answers[question.id];


return (
  <div className="bg-slate-100 min-h-screen">

    {/* <Topbar /> */}

    <div className="flex">

      <Sidebar />

      <main className="flex-1 p-8 max-w-6xl mt-8 ml-60">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold text-blue-700">
              AI Quiz Assessment
            </h1>

            <p className="text-gray-500 mt-2">
              {topic}
            </p>

          </div>

          <div className={`px-5 py-3 rounded-xl font-bold ${
            timeLeft <= 60
              ? "bg-red-100 text-red-600 animate-pulse"
              : "bg-white shadow"
          }`}>

            ⏰ {formatTime(timeLeft)}

          </div>

        </div>

        {/* Progress */}

        <div className="bg-white rounded-xl p-5 shadow mb-8">

          <div className="flex justify-between mb-2">

            <span className="font-semibold">

              Question {currentQuestion + 1} / {questions.length}

            </span>

            <span>

              {progressPercentage}%

            </span>

          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

            <div

              className="bg-blue-600 h-full transition-all duration-300"

              style={{
                width: `${progressPercentage}%`,
              }}

            />

          </div>

        </div>

        <div className="grid grid-cols-12 gap-8">

          {/* Left Side */}

          <div className="col-span-9">

            <div className="bg-white rounded-2xl shadow p-8">

              <div className="flex justify-between items-center mb-5">

                <div>

                  <h2 className="text-2xl font-bold">
                    Question {currentQuestion + 1}
                  </h2>

                  <p className="text-blue-600 mt-2 font-semibold">
                    {question.topic_name}
                  </p>

                </div>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">

                  {question.difficulty}

                </span>

              </div>

              <h3 className="text-xl font-semibold leading-relaxed mb-8">

                {question.question}

              </h3>

              <div className="space-y-4">

                {[
                  question.option_a,
                  question.option_b,
                  question.option_c,
                  question.option_d,
                ].map((option, index) => {

                  const letters = ["A", "B", "C", "D"];

                  return (

                    <button

                      key={index}

                      onClick={() => handleOptionSelect(index)}

                      className={`

                        w-full

                        border-2

                        rounded-xl

                        px-5

                        py-4

                        flex

                        items-center

                        gap-5

                        text-left

                        transition

                        ${
                          selectedAnswer === index

                            ? "border-blue-600 bg-blue-50"

                            : "border-gray-200 hover:border-blue-400"

                        }

                      `}

                    >

                      <div
                        className={`

                          w-10

                          h-10

                          rounded-full

                          flex

                          items-center

                          justify-center

                          font-bold

                          ${
                            selectedAnswer === index

                              ? "bg-blue-600 text-white"

                              : "bg-gray-100 text-gray-700"

                          }

                        `}
                      >

                        {letters[index]}

                      </div>

                      <span className="text-lg">
                        {option}
                      </span>

                    </button>

                  );

                })}

              </div>

              

              {/* Navigation */}

              <div className="flex justify-between mt-10">

                <button

                  disabled={currentQuestion === 0}

                  onClick={goPrevious}

                  className="px-6 py-3 rounded-xl bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"

                >

                  Previous

                </button>

                {currentQuestion === questions.length - 1 ? (

                  <button

                    onClick={submitQuiz}

                    disabled={submitting}

                    className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-50"

                  >

                    {submitting

                      ? "Submitting..."

                      : "Submit Quiz"}

                  </button>

                ) : (

                  <button

                    onClick={goNext}

                    className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"

                  >

                    Next

                  </button>

                )}

              </div>

            </div>

          </div>

          {/* Right Sidebar */}

          <div className="col-span-3">

            <div className="bg-white rounded-2xl shadow p-6 sticky top-24">

              <h2 className="font-bold mb-5">

                Quiz Details

              </h2>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between">

                  <span className="text-gray-500">Total Questions</span>

                  <span className="font-semibold">{questions.length}</span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">Answered</span>

                  <span className="font-semibold">{answeredCount}</span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">Remaining</span>


                  <span className="font-semibold">
                      {questions.length - answeredCount}
                  </span>

                </div>

              </div>

              <hr className="my-5" />

              <div className="grid grid-cols-5 gap-2">

                {questions.map((q, index) => (

                  <button

                    key={q.id}

                    onClick={() => jumpToQuestion(index)}

                    className={`

                      w-10

                      h-10

                      rounded-lg

                      font-semibold

                      ${
                        currentQuestion === index

                          ? "bg-blue-600 text-white"

                          : answers[q.id] !== undefined

                          ? "bg-green-500 text-white"

                          : "bg-gray-200"

                      }

                    `}

                  >

                    {index + 1}

                  </button>

                ))}

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>

    {/* Result Modal */}

    {showResult && result && (

      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

        <div className="bg-white rounded-3xl p-10 w-full max-w-md text-center shadow-2xl">

          <h2 className="text-3xl font-bold mb-6">

            Quiz Completed 🎉

          </h2>

          <div className="text-6xl font-bold text-blue-600">

            {result.percentage}%

          </div>

          <div className="mt-6 space-y-2 text-lg">

            <p>

              Score: {result.score} / {result.total}

            </p>

            <p>

              Status:

              {result.passed ? (

                <span className="text-green-600 font-bold">
                  {" "}Passed
                </span>

              ) : (

                <span className="text-red-600 font-bold">
                  {" "}Failed
                </span>

              )}

            </p>

          </div>

          {result.skill_gap && (

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
                <h4 className="font-semibold text-yellow-800 mb-1">

                AI Recommendation
              </h4>

              <p className="text-sm text-yellow-900">{result.skill_gap.recommendation}</p>

            </div>

          )}

          <div className="mt-8">

            <button

              onClick={() => navigate("/roadmap")}

              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"

            >

              Back to Roadmap

            </button>

          </div>

        </div>

      </div>

    )}

  </div>
);

};

export default Quiz;