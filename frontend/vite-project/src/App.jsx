import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Roadmap from "./pages/Roadmap";
// import Progress from "./pages/Progress";
import Resources from "./pages/Resources";
import Preferences from "./pages/Preferences";
import Quiz from "./pages/Quiz";
import MyRoadmaps from "./pages/MyRoadmaps";
import RoadmapDetail from "./pages/RoadmapDetail";
import CertificatesAll from "./pages/CertificatesAll"
// import Bookmarks from "./pages/Bookmarks";
// import Achievements from "./pages/Achievements";
// import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import QuizResult from "./pages/QuizResult";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/preferences" element={<Preferences />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />


      <Route
        path="/roadmap"
        element={
          <ProtectedRoute>
            <Roadmap />
          </ProtectedRoute>
        }
      />


      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        }
      />

      <Route
      path = "/quiz"
      element = {
        <ProtectedRoute>
          <Quiz />
        </ProtectedRoute>
      }
      />

      <Route
      path = "/quiz/results"
      element = {
        <ProtectedRoute>
          <QuizResult />
        </ProtectedRoute>
      }
      />

      


      <Route
        path="/myroadmaps"
        element={
          <ProtectedRoute>
            <MyRoadmaps />
          </ProtectedRoute>
        }
      />

      <Route
      path="/roadmap/:roadmap_id"
      element={
        <ProtectedRoute>
          <RoadmapDetail />
        </ProtectedRoute>
    }
    />

    <Route
      path="/certificates"
      element={
        <ProtectedRoute>
          <CertificatesAll />
        </ProtectedRoute>
    }
    />

      {/* <Route
        path="/bookmarks"
        element={
          <ProtectedRoute>
            <Bookmarks />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/achievements"
        element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      /> */}
      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;