import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CertificatesAll = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(`${API}/roadmap/total-certificates/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state with certificates array from response
      setCertificates(response.data.certificates || []);
    } catch (err) {
      console.error("Error fetching certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = async (roadmapId) => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(
        `${API}/roadmap/certificate/download/${roadmapId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate_${roadmapId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading certificate:", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased">
      <div className="flex">
        <Sidebar logout={logout} />

        {/* 
          Responsive Layout Fixes:
          - `ml-0 lg:ml-64`: Resets left margin on mobile/tablet screens.
          - `pt-20 lg:pt-8`: Adds clearance for top navigation bars on mobile.
          - `px-4 sm:px-6 lg:px-8`: Dynamically scales container side padding.
        */}
        <main className="flex-1 ml-0 lg:ml-64 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-12 max-w-7xl mx-auto w-full min-w-0 transition-all duration-300">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              My Certificates
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              View and download your earned completion certificates.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8 sm:p-16 text-center">
              <div className="animate-spin h-8 w-8 sm:h-10 sm:w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Loading Your Certificates...
              </h2>
            </div>
          ) : certificates.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8 sm:p-12 text-center max-w-md mx-auto my-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl font-bold">
                🎓
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                No Certificates Found
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Complete all modules in a roadmap to earn your official completion certificate!
              </p>
              <button
                onClick={() => navigate("/roadmap")}
                className="mt-6 w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Go to Roadmaps
              </button>
            </div>
          ) : (
            /* Certificates Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id || certificate.roadmap_id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    {/* Top Tag & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider truncate">
                        Cert #{certificate.certificate_number?.slice(0, 8)}
                      </span>
                      <span className="inline-flex items-center bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        Verified
                      </span>
                    </div>

                    {/* Career Goal / Title */}
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-2 leading-snug">
                      {certificate.career_goal}
                    </h2>

                    {/* Meta Info */}
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-600">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Average Quiz Score</span>
                        <span className="font-bold text-blue-600">
                          {certificate.average_quiz_percentage}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Issued On</span>
                        <span className="font-semibold text-slate-800">
                          {new Date(certificate.issued_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => downloadCertificate(certificate.roadmap_id)}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download Certificate
                    </button>
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

export default CertificatesAll;