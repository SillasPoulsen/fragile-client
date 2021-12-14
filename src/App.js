import "./App.css";
import { Routes, Route } from "react-router-dom";

import TheNavbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import JourneyPage from "./pages/JourneyPage/Journeypage";
import NotesPage from "./pages/NotesPage/NotesPage";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import EpisodePage from "./pages/AudioPage/AudioPage";

function App() {
  return (
    <div className="App">
      <TheNavbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/journey/:id"
          element={
            <IsPrivate>
              <JourneyPage />
            </IsPrivate>
          }
        />

        <Route
          path="/episode/:id"
          element={
            <IsPrivate>
              <EpisodePage />
            </IsPrivate>
          }
        />

        <Route
          path="/episode/:episodeId/notes"
          element={
            <IsPrivate>
              <NotesPage />
            </IsPrivate>
          }
        />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              {" "}
              <ProfilePage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
