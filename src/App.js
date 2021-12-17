import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import TheNavbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import JourneyPage from "./pages/JourneyPage/Journeypage";
import NotesPage from "./pages/NotesPage/NotesPage";
import IntroductionPage from "./pages/IntroductionPage/IntroductionPage";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import EpisodePage from "./pages/AudioPage/AudioPage";

import { AuthContext } from "./context/auth.context";

function App() {
  const [show, setShow] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);

  // if (!isLoggedIn) {
  // setShow(false);
  // }

  useEffect(() => {
    if (!isLoggedIn) {
      setShow(false);
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <TheNavbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/introduction" element={<IntroductionPage />} />

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
              <LoginPage setShow={setShow} show={show} />
            </IsAnon>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
