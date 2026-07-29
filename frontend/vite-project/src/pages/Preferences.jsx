import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PreferenceHeader from "../components/preferences/PreferenceHeader";
import CareerGoal from "../components/preferences/CareerGoal";
import SkillLevel from "../components/preferences/SkillLevel";
import LearningStyle from "../components/preferences/LearningStyle";
import StudyHours from "../components/preferences/StudyHours";
import PreferredDomains from "../components/preferences/PreferredDomains";
import Summary from "../components/preferences/Summary";
import GenerateButton from "../components/preferences/GenerateButton";

const Preferences = () => {

  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({

    career_goal: "",

    skill_level: "Beginner",

    learning_style: "Reading",


    study_hours: 10,


    preferred_domains: [],


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

          preferred_domains: prev.preferred_domains.filter(

            (d) => d !== domain

          ),

        };

      }

      return {

        ...prev,

        preferred_domains: [

          ...prev.preferred_domains,

          domain,

        ],

      };


    });



  };

  const generateRoadmap = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("access");
     const response = await axios.post(

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

if (error.response) {

  console.log("Status:", error.response.status);

  console.log("Data:", error.response.data);
 alert(JSON.stringify(error.response.data));

} else {

  console.log(error.message);
  alert(error.message);


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


    <div className="flex min-h-screen bg-slate-100">


      <Sidebar logout={logout} />

      <div className="flex-1 ml-0 lg:ml-64 pt-20 lg:pt-8 transition-all duration-300 min-w-0">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

          <PreferenceHeader/>

          <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 mt-6 sm:mt-8 overflow-hidden">

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-10">


             <CareerGoal

                value={formData.career_goal}
                setValue={(value) =>
                updateField("career_goal", value)

                }

              />


              <SkillLevel

               value={formData.skill_level}
               setValue={(value) =>
               updateField("skill_level", value)

                }

              />


              <StudyHours

                value={formData.study_hours}
                setValue={(value) =>
                updateField("study_hours", value)
                }

             />

              <PreferredDomains

                domains={formData.preferred_domains}

                toggleDomain={toggleDomain}

              />


              <Summary formData={formData} />


             <GenerateButton

                loading={loading}
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