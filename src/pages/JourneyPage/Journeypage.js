import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import "./JourneyPage.css";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import { Circle, CheckCircle } from "react-feather";

function JourneyPage() {
  const [journey, setJourney] = useState([]);
  const [hasDone, setHasDone] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const requestBody = useParams();
  const journeyId = requestBody.id;
  const { user } = useContext(AuthContext);

  const subscribe = async () => {
    try {
      const response = await authService.subscribe({ id: journeyId });

      const oneJourney = response.data;
      const isUserSubscribed = oneJourney.belongsTo.includes(user._id);
      setIsSubscribed(isUserSubscribed);
      setJourney(oneJourney);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getJourney = async () => {
      try {
        if (!user) {
          return;
        }
        const userNotes = await authService.userHasDone();
        setHasDone(userNotes.data);
        const response = await authService.journeyObj(journeyId);
        const oneJourney = response.data;
        const isUserSubscribed = oneJourney.belongsTo.includes(user._id);
        setIsSubscribed(isUserSubscribed);
        setJourney(oneJourney);
      } catch (error) {
        console.log(error);
      }
    };
    getJourney();
  }, [user]);

  return (
    <div className="content">
      {journey && (
        <div className="header">
          <h1>{journey.name}</h1>
          <p>{journey.description}</p>
          {isSubscribed ? (
            <button className="Sub" onClick={subscribe}>
              unsubscribe
            </button>
          ) : (
            <button className="Subd" onClick={subscribe}>
              subscribe
            </button>
          )}
        </div>
      )}
      <div>
        <h2 className="category">Episodes:</h2>
        {journey.episodes &&
          journey.episodes.map((episodes) => {
            return (
              <div className="card" key={episodes._id}>
                <Link to={`/episode/${episodes._id}`}>
                  <p className="episodeTitle">{episodes.title}</p>
                  {hasDone.includes(episodes._id) ? (
                    <CheckCircle size={16} color="green" />
                  ) : (
                    <Circle size={16} />
                  )}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default JourneyPage;
