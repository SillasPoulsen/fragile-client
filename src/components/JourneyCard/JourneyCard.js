import { Link } from "react-router-dom";
import player from "../../images/Group 1 (5).png";

function JourneyCard({ oneJourney, Planet }) {
  return (
    <div className="JourneyCard" key={oneJourney._id}>
      <Link to={`/journey/${oneJourney._id}`}>
        <h3>{oneJourney.name}</h3>
        <div className="player">
          <img src={player} alt="play-symbol" />
        </div>
      </Link>
      <img className="planet" src={Planet} alt="" />
    </div>
  );
}

export default JourneyCard;
