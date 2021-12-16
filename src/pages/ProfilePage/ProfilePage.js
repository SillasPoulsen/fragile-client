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
          <p>This is all your notes</p>
          <div className="bottom">
            {notes.length > 0 &&
              notes.map((note, i) => {
                return (
                  <div className="noteCard" key={i}>
                    {/* <Link to={`/journey/${oneJourney._id}`}> */}
                    <p>{note.description}</p>
                    {/* </Link> */}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
