import authService from "../../services/auth.service";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function EpisodePage() {
  const requestBody = useParams();
  const episodeId = requestBody.id;
  const [episode, setEpisode] = useState([]);
  const [note, setNote] = useState();
  const [textAreaValue, setTextAreaValue] = useState("Your input");
  const [radioValue, setradioValue] = useState(true);
  const [hasDone, setHasDone] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const handleChangeRadio = () => {
    setradioValue(!radioValue);
  };

  const clearArea = (event) => {
    setTextAreaValue("");
  };

  const getEpisode = async () => {
    try {
      const response = await authService.oneEpisode(episodeId);
      setNote(response.data.firstUserNote);
      setEpisode(response.data.currentEpisode);
      setHasDone(user.hasDone.includes(episodeId));
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      getEpisode();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    try {
      // Prevent the page reload (default behavior
      e.preventDefault();

      // Get the data from the state/inputs
      const requestBody = {
        textInput: textAreaValue,
        public: radioValue,
        episode: episodeId,
      };

      //send it to the DB
      await authService.postNote(requestBody);

      navigate("/episode/" + episodeId + "/notes");

      setTextAreaValue("");
      setradioValue(true);
    } catch (error) {}
  };

  return (
    <div>
      <h1>{episode.description}</h1>

      {!hasDone && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter value :</label>
            <textarea
              value={textAreaValue}
              onChange={handleChange}
              onClick={clearArea}
            />
          </div>
          <div>
            <input
              type="checkbox"
              value={radioValue}
              onChange={handleChangeRadio}
              checked={radioValue}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
      {hasDone && (
        <>
          <h1>{note.textInput}</h1>
          <p>Hello</p>
        </>
      )}
    </div>
  );
}

export default EpisodePage;
