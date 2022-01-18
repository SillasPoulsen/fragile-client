import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import Planet from "../../images/Group 3.png";
import LandingPage from "../../components/Landingpage/Landingpage";
import JourneyCard from "../../components/JourneyCard/JourneyCard";

import "./HomePage.css";

function HomePage() {
  const [journeys, setJourneys] = useState([]);
  const [userHasDone, setuserHasDone] = useState([]);
  const [userJourneys, setUserJourneys] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const getAllJourneys = async () => {
    try {
      const response = await authService.journeys();
      setJourneys(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserJourneys = async () => {
    try {
      const response = await authService.userJourneys();
      setUserJourneys(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let isSubscribed = true;

    if (isLoggedIn && user) {
      const fetchUserRes = async () => {
        const userResponse = await authService.allUserInfo();
        setuserHasDone(userResponse.data.hasDone);
        setIsReady(true);
      };

      fetchUserRes();
      getAllJourneys();
      getUserJourneys();
    }
    return () => (isSubscribed = false);
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (isReady) {
      if (user && userHasDone.length === 0) {
        navigate("/introduction");
      }
    }
  }, [isReady, user, userHasDone, navigate]);

  return (
    <div className="Wrapper">
      {/* If the user is not logged in, it will load landing page */}
      {!isLoggedIn && <LandingPage />}

      {isLoggedIn && (
        <div className="Wrapper">
          <div className="Homepageloggedin">
            <p>Your Subscriptions</p>
            <div className="Journey">
              {userJourneys &&
                userJourneys.map((oneUserJourney) => {
                  return (
                    <JourneyCard oneJourney={oneUserJourney} Planet={Planet} />
                  );
                })}
            </div>
            <p>Inpiration</p>
            <div className="Journey">
              {journeys.length > 0 &&
                journeys.map((oneJourney) => {
                  return <JourneyCard oneJourney={oneJourney} />;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
