import authService from "../../services/auth.service";
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function EpisodePage() {
  const requestBody = useParams();
  const episodeId = requestBody.id;
  const [episode, setEpisode] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("Your input");
  const [radioValue, setradioValue] = useState(true);

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
      setEpisode(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getEpisode();
  }, []);

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
      setTextAreaValue("");
      setradioValue(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{episode.description}</h1>
      <div>
        <audio src={episode.audioUrl} controls autoPlay />
      </div>
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
    </div>
  );
}

export default EpisodePage;
