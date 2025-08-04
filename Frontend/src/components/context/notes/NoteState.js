import { useContext, useState } from "react";
import noteContext from "./NoteContext";
import alertContext from "../alert/AlertContext";

const NoteState = (props) => {
  const context=useContext(alertContext)
  const {showalert}=context // to show alert on CUD opertaions 
  const host = process.env.REACT_APP_API_URL;
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);
  // Get all notes
  const getNotes = async () => {
    // API Integration
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)
  }
  // add a note
  const addNote = async(title, description, tag) => {
    // API Integration
        const response = await fetch(`${host}/api/notes/addNotes`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "auth-token":localStorage.getItem('token'),
          },
          body: JSON.stringify({title,description,tag}),
        });
    // Logic to add in client side
    const note = await response.json();
    setNotes(notes.concat(note));
    showalert("New Note added","success","success",3000)
  };
  // delete a note
  const deleteNote = async (id) => {
    // TODO: API Integration
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }
    });
    const json = await response.json();
    console.log(json);
    // Logic to delete in client side
    console.log("deleting note with id", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    showalert("Note Deleted Successfully","danger","deleted",2000)
  };
  // edit a note
  const editNote = async (id, title, description, tag) => {
    // API Integration
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // Logic to edit in client side
    let updatedNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < updatedNotes.length; index++) {
      const element = updatedNotes[index];
      if (element._id === id) {
        updatedNotes[index].title = title;
        updatedNotes[index].description = description;
        updatedNotes[index].tag = tag;
        break;
      }
    }
    setNotes(updatedNotes)
    showalert("Note Updated Successfully","success","success",3000)
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
