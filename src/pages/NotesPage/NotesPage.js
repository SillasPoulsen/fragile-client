import { useState, useEffect, useContext } from "react";
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
    const response = await authService.likeNote({ id });

    //change the state to run again a useEffect
    setLike(!like);
  };

  const getNotes = async () => {
    try {
      const response = await await authService.allNotes(episodeId);
      const allNotes = response.data.notes;
      setNotes(allNotes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    getNotes();
  }, [like]);

  return (
    <div>
      <h1>Other peoples thoughts</h1>
      {notes &&
        notes.map((note) => {
          return (
            <div className="card" key={note._id}>
              <p className="episodeTitle">{note.textInput}</p>
              <p> liked: {note.upVotes.length} </p>

              {note.upVotes.includes(user._id) ? (
                <Heart
                  size={16}
                  color="red"
                  fill="red"
                  onClick={() => handleLike(note._id)}
                />
              ) : (
                <Heart
                  size={16}
                  color="red"
                  onClick={() => handleLike(note._id)}
                />
              )}
            </div>
          );
        })}
    </div>
  );
}

export default NotesPage;
