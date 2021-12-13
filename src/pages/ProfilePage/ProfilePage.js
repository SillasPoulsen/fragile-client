import { useContext, useState, useEffect } from "react"; 
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
 
 function ProfilePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
   const [subscriptions, setSubscriptions] = useState([])
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
    <>
      <div className="Homepageloggedin">
        <p>This is all Your Journeys</p>
        {subscriptions &&
          subscriptions.map((sub) => {
            return (
              <div className="JourneyCard" key={sub._id}>
                <Link to={"#"}>
                  <h3>{sub.name}</h3>
                </Link>
              </div>
            );
          })}
        <p>This is all your notes</p>
        {notes.length > 0 &&
          notes.map((note,i) => {
            return (
              <div className="JourneyCard" key={i}>
                {/* <Link to={`/journey/${oneJourney._id}`}> */}
                  <h3>{note.description}</h3>
                {/* </Link> */}
              </div>
            );
          })}
      </div>
    </>
  )}
  </div>
  )
}

export default ProfilePage;