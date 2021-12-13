import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import authService from "../../services/auth.service";

function JourneyPage() {
  const [journey, setJourney] = useState([]);
  //const [episodes, setEpisodes] = useState([]);
  //const { isLoggedIn, user } = useContext(AuthContext);
  const requestBody = useParams();
  const journeyId = requestBody.id;

  const getJourney = async () => {
    try {
      const response = await authService.journeyObj(journeyId);
      setJourney(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJourney();
  }, []);

  return (
    <div>
      <div>{journey && <h1>{journey.name}</h1>}</div>
      <div>
        {journey.episodes &&
          journey.episodes.map((episodes) => {
            return (
              <div key={episodes._id}>
              <Link to={`/episode/${episodes._id}`}>
                <p>{episodes.description}</p>
              </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default JourneyPage;
