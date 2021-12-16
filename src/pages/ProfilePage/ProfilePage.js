import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";

import "./ProfilePage.css";

function ProfilePage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [notes, setNotes] = useState([]);

  const getUserJourneys = async () => {
    try {
      const response = await authService.allUserInfo();
      setSubscriptions(response.data.subscriptions);
      setNotes(response.data.hasDone);
    } catch (error) {}
  };

  useEffect(() => {
    getUserJourneys();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      {isLoggedIn && (
        <div className="wrapper">
          <div className="Homepageloggedin">
            <p>This is all Your Journeys</p>
            {subscriptions &&
              subscriptions.map((sub) => {
                return (
                  <div className="Journey" key={sub._id}>
                    <Link to={"#"}>
                      <h3>{sub.name}</h3>
                    </Link>
                  </div>
                );
              })}
            <p>This is all your notes</p>
            <div className="bottom">
              {notes.length > 0 &&
                notes.map((note, i) => {
                  return (
                    <div className="JourneyCard" key={i}>
                      {/* <Link to={`/journey/${oneJourney._id}`}> */}
                      <p>{note.description}</p>
                      {/* </Link> */}
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

export default ProfilePage;
