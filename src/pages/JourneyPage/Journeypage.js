import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./JourneyPage.css";
import hasDone from "../../images/Group 2.png";
import hasNotDone from "../../images/Ellipse 32.png";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import { Circle, CheckCircle } from "react-feather";

function JourneyPage() {
  const [journey, setJourney] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const requestBody = useParams();
  const journeyId = requestBody.id;
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const subscribe = async () => {
    try {
      const response = await authService.subscribe({ id: journeyId });

      const oneJourney = response.data;
      const isUserSubscribed = oneJourney.belongsTo.includes(user._id);
      setIsSubscribed(isUserSubscribed);
      setJourney(oneJourney);
      //navigate("/");
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
    console.log(user);
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
                  {user.hasDone.includes(episodes._id) ? (
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
