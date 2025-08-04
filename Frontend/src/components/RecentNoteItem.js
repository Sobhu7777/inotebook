import React,{useContext} from "react";
import noteContext from "./context/notes/NoteContext";

function RecentNoteItem(props) {
    const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note , update} = props;
  if (!note) {
    return <h1>no notes to display</h1>;
  }
  return (
    <div className="recent-note-card my-7" key={note._id}>
      <div className="recent-note-title" id="recent-noteTitle">
        {note.title}
      </div>
      <div className="recent-note-category" id="recent-noteCategory">
        {note.tag}
      </div>
      <div className="recent-note-content" id="recent-noteContent">
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
  )
}

export default RecentNoteItem
