import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import authService from "../../services/auth.service";
function NotesPage() {

    const episodeIdObj = useParams();
    const episodeId = episodeIdObj.episodeId;

    const [notes, setNotes] = useState([]);
    
    const getNotes = async () => {
        try {
          const response = await authService.allNotes(episodeId);
          setNotes(response.data.notes)
        
        } catch (error) {}
      };

     

      useEffect(() => {
        getNotes();
      }, []);

    return ( 
        <div>
       {notes.map((note) => {
           if(note.public === true)
           return(
               <div key={note._id}>

               <p>{note.textInput}</p>
               </div>
           )
       })}
        </div>

     );
}

export default NotesPage;