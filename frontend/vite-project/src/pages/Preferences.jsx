import { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PreferenceHeader from "../components/preferences/PreferenceHeader";
import CareerGoal from "../components/preferences/CareerGoal";
import SkillLevel from "../components/preferences/SkillLevel";
import StudyHours from "../components/preferences/StudyHours";
import PreferredDomains from "../components/preferences/PreferredDomains";
import Summary from "../components/preferences/Summary";
import GenerateButton from "../components/preferences/GenerateButton";
import { HiSparkles } from "react-icons/hi2";

const Preferences = () => {
  const API = import.meta.env.VITE_API_URL || "/api";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    career_goal: "",
    skill_level: "Beginner",
    learning_style: "Reading",
    study_hours: 10,
    preferred_domains: ["Frontend Development", "Backend Development"],
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleDomain = (domain) => {
    setFormData((prev) => {
      if (prev.preferred_domains.includes(domain)) {
          return {
            ...prev,
            preferred_domains: prev.preferred_domains.filter((d) => d !== domain),
          };
        }
        return {
          ...prev,
          preferred_domains: [...prev.preferred_domains, domain],
        };
      });
  };

  // Completion calculation
  const completionPercentage = useMemo(() => {
    let score = 0;
    if (formData.career_goal) score += 35;
    if (formData.skill_level) score += 25;
    if (formData.study_hours) score += 20;
    if (formData.preferred_domains?.length > 0) score += 20;
    return score;
  }, [formData]);

const generateRoadmap = async () => {
  if (!formData.career_goal) {
    alert("Please choose or search your Target Career Goal before generating.");
    return;
  }

  try {
    setLoading(true);
    const token = localStorage.getItem("access");

        await axios.post(
          `${API}/roadmap/generate/`,
          {
            goal: formData.career_goal,
            skill_level: formData.skill_level,
            learning_style: formData.learning_style,
            weekly_study_hours: formData.study_hours,
            preferred_domains: formData.preferred_domains,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        navigate("/roadmap");
      } catch (error) {
        console.error("Axios Error:", error);

        if (error.response?.data) {
          const errorMsg =
            error.response.data.error ||
            error.response.data.detail ||
            error.response.data.message ||
            JSON.stringify(error.response.data);
          alert(errorMsg);
        } else {
          alert(
            error.message ||
            "Failed to generate roadmap. Please verify the backend connection."
          );
        }
      } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-slate-50/80 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Ambient Radial Background Glows */}
      <div className="fixed top-0 left-64 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Modern Sidebar */}
        <Sidebar logout={logout} />

        {/* Main Content Area */}
        <div className="flex-1 ml-0 lg:ml-64 pt-20 lg:pt-8 transition-all duration-300 min-w-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
            {/* Header Banner */}
            <PreferenceHeader />

              {/* Stepper Progress Bar */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 font-bold text-xs">
                    <HiSparkles size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Roadmap Setup Progress
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {completionPercentage === 100
                        ? "All parameters tuned · Ready to synthesize"
                        : `${4 - Math.round(completionPercentage / 25)} steps remaining`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-64">
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-slate-700 shrink-0">
                    {completionPercentage}%
                  </span>
                </div>
              </div>

                    {/* Main Card Container */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
                    <div className="p-5 sm:p-8 lg:p-10 space-y-10 sm:space-y-12">
                      {/* Step 1: Career Goal */}
                      <CareerGoal
                        value={formData.career_goal}
                        setValue={(value) => updateField("career_goal", value)}
                      />

                      <div className="h-px bg-slate-100" />

                      {/* Step 2: Skill Level */}
                      <SkillLevel
                        value={formData.skill_level}
                        setValue={(value) => updateField("skill_level", value)}
                      />

                      <div className="h-px bg-slate-100" />

                      {/* Step 3: Study Hours */}
                      <StudyHours
                        value={formData.study_hours}
                        setValue={(value) => updateField("study_hours", value)}
                      />

                      <div className="h-px bg-slate-100" />

                      {/* Step 4: Preferred Domains */}
                      <PreferredDomains
                        domains={formData.preferred_domains}
                        toggleDomain={toggleDomain}
                      />

                      {/* Step 5: Executive AI Summary */}
                      <Summary formData={formData} />

                        {/* Step 6: Generate CTA */}
              <GenerateButton
                        loading={loading}
                        disabled={!formData.career_goal}
                        generateRoadmap={generateRoadmap}
                      />
                    </div>
                  </div>
                </div>
              </div>
          </div>
          );
};

          export default Preferences;