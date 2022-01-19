import { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "react-feather";
import "./NotesPage.css";
import { AuthContext } from "../../context/auth.context";

import authService from "../../services/auth.service";
function NotesPage() {
  const episodeIdObj = useParams();
  const episodeId = episodeIdObj.episodeId;
  const { user } = useContext(AuthContext);

  const [like, setLike] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleLike = async (id) => {
    //LIKE THE NOTE
    await authService.likeNote({ id });

    //change the state to run again on useEffect
    setLike(!like);
  };

  const getNotes = useCallback(async () => {
    try {
      const response = await authService.allNotes(episodeId);
      const allNotes = response.data.notes;
      setNotes(allNotes);
    } catch (error) {}
  }, [episodeId]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  useEffect(() => {
    getNotes();
  }, [getNotes, like]);

  return (
    <div>
      <div className="wrapper">
        <h1>Other peoples thoughts</h1>
        {notes &&
          notes.map((note) => {
            return (
              <div className="card" key={note._id}>
                <p className="cardText">{note.textInput}</p>
                <p className="likes"> liked: {note.upVotes.length} </p>

                {note.upVotes.includes(user._id) ? (
                  <Heart
                    className="heart"
                    size={16}
                    color="red"
                    fill="red"
                    onClick={() => handleLike(note._id)}
                  />
                ) : (
                  <Heart
                    className="heart"
                    size={16}
                    color="red"
                    onClick={() => handleLike(note._id)}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default NotesPage;
