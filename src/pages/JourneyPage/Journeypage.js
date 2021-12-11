import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";
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
    } catch (error) {}
  };

  useEffect(() => {
    getJourney();
  }, []);

  console.log("This is the one", journey.episodes);

  return (
    <div>
      {/* <h1>{journey.name}</h1> */}
      {/* {journey.length > 0 && */}
      {/* journey.map((journey) => { */}
      {/* return ( */}
      {/* <div> */}
      {/* {journey.episodes.map((c, i) => ( */}
      {/* <div> */}
      {/* <h3>{c.description}</h3> */}
      {/* </div> */}
      {/* ))} */}
      {/* </div> */}
      {/* ); */}
      {/* })} */}
      {/* <h1>{journey.name}</h1> */}
      {/* {journey.length > 0 && */}
      {/* journey.map((episodes) => { */}
      {/* episodes.episodes.map((eps) => { */}
      {/* return <h1>hello</h1>; */}
      {/* }); */}
      {/* })} */}
    </div>
  );
}

export default JourneyPage;
