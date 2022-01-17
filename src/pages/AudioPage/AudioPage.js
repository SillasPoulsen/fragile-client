import authService from "../../services/auth.service";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";

import "./AudioPage.css";

function EpisodePage() {
  const requestBody = useParams();
  const episodeId = requestBody.id;
  const [episode, setEpisode] = useState([]);
  const [note, setNote] = useState();
  const [textAreaValue, setTextAreaValue] = useState("Your input");
  const [radioValue, setradioValue] = useState(true);
  const [hasDone, setHasDone] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const handleChangeRadio = () => {
    setradioValue(!radioValue);
  };

  const clearArea = (event) => {
    setTextAreaValue("");
  };

  const getEpisode = useCallback(async () => {
    try {
      const response = await authService.oneEpisode(episodeId);
      const userHasDone = await authService.userHasDone(episodeId);
      setNote(response.data.firstUserNote);
      setEpisode(response.data.currentEpisode);
      setHasDone(userHasDone.data.includes(episodeId));
    } catch (error) {}
  }, [episodeId]);

  useEffect(() => {
    if (user) {
      getEpisode();
    }
  }, [getEpisode, user]);

  const handleSubmit = async (e) => {
    try {
      // Prevent the page reload (default behavior
      e.preventDefault();

      if (textAreaValue === "Your input") {
        return;
      }

      // Get the data from the state/inputs
      const requestBody = {
        textInput: textAreaValue,
        public: radioValue,
        episode: episodeId,
      };

      //send it to the DB
      const response = await authService.postNote(requestBody);

      setUser(response.data.userObj);
      navigate("/episode/" + episodeId + "/notes");

      setTextAreaValue("");
      setradioValue(true);
    } catch (error) {}
  };

  return (
    <div className="Audiocontent">
      <AudioPlayer />
      <h1 className="title">{episode.title}</h1>
      <p>{episode.description}</p>

      {!hasDone && (
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              value={textAreaValue}
              onChange={handleChange}
              onClick={clearArea}
            />
          </div>
          <div>
            <label>Share with the community</label>
            <input
              type="checkbox"
              value={radioValue}
              onChange={handleChangeRadio}
              checked={radioValue}
            />
          </div>
          <div>
            <button className="submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
      {hasDone && (
        <>
          <h5>This is your note:</h5>
          <p className="noteText">{note.textInput}</p>
        </>
      )}
    </div>
  );
}

export default EpisodePage;
