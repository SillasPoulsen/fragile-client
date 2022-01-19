import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

import "./ProfilePage.css";

function ProfilePage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  const getUserJourneys = async () => {
    try {
      const response = await authService.allUserNotes();
      setNotes(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUserJourneys();
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <div className="wrapper">
          <h1>Profile Page</h1>
          <p>This is all your notes</p>
          <div className="bottom">
            {notes.length > 0 &&
              notes.map((note, i) => {
                return (
                  <div className="card" key={i}>
                    {/* <Link to={`/journey/${oneJourney._id}`}> */}
                    <p className="profile-card-text">{note.textInput}</p>
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
