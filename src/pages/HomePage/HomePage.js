import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import selfLove from "../../images/selflove 1.png";
import player from "../../images/Group 1 (5).png";

import "./HomePage.css";

function HomePage() {
  const [journeys, setJourneys] = useState([]);
  const [userJourneys, setUserJourneys] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

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
    if (isLoggedIn) {
      getAllJourneys();
      getUserJourneys();
    }
  }, [isLoggedIn]);

  return (
    <div className="Wrapper">
      {!isLoggedIn && (
        <>
          <div className="HomepageNotLoggedIn">
            <div className="selfLove">
              <img src={selfLove} alt="Flawsfigure" />
            </div>
            <div>
              <h1 className="logofrontpage">Flaws</h1>
              <p>Because we all feel a little flawed at times</p>
            </div>
            <div className="signup">
              <Link to="/signup">
                <button className="btn-signup">Singup</button>
              </Link>
            </div>
            <div>
              <Link to="/login">
                <a className="btn-login" href="{#}">
                  Login
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
      {isLoggedIn && (
        <div className="Wrapper">
          <div className="Homepageloggedin">
            <p>This is all Your Journeys</p>
            {userJourneys &&
              userJourneys.map((oneUserJourney) => {
                return (
                  <div className="JourneyCard" key={oneUserJourney._id}>
                    <Link to={"#"}>
                      <h3>{oneUserJourney.name}</h3>
                      <div className="player">
                        <img src={player} alt="play-symbol" />
                      </div>
                    </Link>
                  </div>
                );
              })}

            <p>This is all Journeys</p>
            {journeys.length > 0 &&
              journeys.map((oneJourney) => {
                return (
                  <div className="JourneyCard" key={oneJourney._id}>
                    <Link to={`/journey/${oneJourney._id}`}>
                      <h3>{oneJourney.name}</h3>
                      <div className="player">
                        <img src={player} alt="play-symbol" />
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
