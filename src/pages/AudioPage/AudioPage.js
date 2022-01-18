import authService from "../../services/auth.service";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";

import "./AudioPage.css";

function EpisodePage() {
  const requestBody = useParams();
  const navigate = useNavigate();
  const episodeId = requestBody.id;
  const [episode, setEpisode] = useState([]);
  const [note, setNote] = useState();
  const [textAreaValue, setTextAreaValue] = useState("Your input");
  const [radioValue, setradioValue] = useState(true);
  const [hasDone, setHasDone] = useState(false);
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
    // eslint-disable-next-line no-unused-vars
    let isSubscribed = true;
    if (user) {
      getEpisode();
    }
    return () => (isSubscribed = false);
  }, [getEpisode, user]);

  function handleSubmit(e) {
    // Prevent the page reload (default behavior)
    e.preventDefault();

    // Forcing the user to provide input
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
    authService.postNote(requestBody).then((response) => {
      setUser(response.data.userObj);
      setTextAreaValue("");
      setradioValue(true);
      navigate("/episode/" + episodeId + "/notes");
    });
  }

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
