import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import selfLove from "../../images/selflove 1.png";
import Planet from "../../images/Group 3.png";
import Sun from "../../images/Group 4.png";
import player from "../../images/Group 1 (5).png";

import "./HomePage.css";

function HomePage() {
  const [journeys, setJourneys] = useState([]);
  const [userHasDone, setuserHasDone] = useState([]);
  const [userJourneys, setUserJourneys] = useState([]);
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
    if (isLoggedIn && user) {
      getAllJourneys();
      getUserJourneys();
      const fetchUserRes = async () => {
        const userResponse = await authService.allUserInfo();
        setuserHasDone(userResponse.data.hasDone);
        console.log(userResponse.data.hasDone);
      };
      fetchUserRes();
    }
  }, [isLoggedIn, user]);

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
            {/* {user && userHasDone.length === false && navigate("/introduction")} */}

            <p>Your Subscriptions</p>
            <div className="Journey">
              {userJourneys &&
                userJourneys.map((oneUserJourney) => {
                  return (
                    <div className="JourneyCard" key={oneUserJourney._id}>
                      <Link to={`/journey/${oneUserJourney._id}`}>
                        <h3>{oneUserJourney.name}</h3>
                        <div className="player">
                          <img src={player} alt="play-symbol" />
                        </div>
                      </Link>
                      <img className="planet" src={Planet} alt="" />
                    </div>
                  );
                })}
            </div>
            <p>Inpiration</p>
            <div className="Journey">
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
                      {/* <img className="planet" src={Sun} alt="" /> */}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
