import React,{useContext} from "react";
import noteContext from "./context/notes/NoteContext";
import './NoteItem.css'

function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note , update} = props;
  if (!note) {
    return <h1>no notes to display</h1>;
  }
  return (
    <div className="note-card my-7" key={note._id}>
      <div className="note-title" id="noteTitle">
        {note.title}
      </div>
      <div className="note-category" id="noteCategory">
        {note.tag}
      </div>
      <div className="note-content" id="noteContent">
        {note.description}
      </div>
      <div className="action-buttons my-2">
        <button
          type="button"
          className="btn btn-outline-secondary me-2  "
          onClick={()=>{update(note)}}
        >
          Edit
        </button>
        <button type="button" className="btn btn-danger " onClick={()=>{deleteNote(note._id)}}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteItem;
