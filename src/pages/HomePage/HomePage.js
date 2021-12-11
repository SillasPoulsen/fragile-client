import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";

function HomePage() {
  const [journeys, setJourneys] = useState([]);
  const [userJourneys, setUserJourneys] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);

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
    getAllJourneys();
    getUserJourneys();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {isLoggedIn && (
        <>
          <div className="Homepageloggedin">
            <h1>Welcome to FLAWS </h1>
            <p>This is all Your Journeys</p>
            {userJourneys &&
              userJourneys.map((oneUserJourney) => {
                return (
                  <div className="JourneyCard" key={oneUserJourney._id}>
                    <Link to={"#"}>
                      <h3>{oneUserJourney.name}</h3>
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
                    </Link>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
