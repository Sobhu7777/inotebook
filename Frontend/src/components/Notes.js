import React, { useRef, useContext, useEffect , useState } from "react";
import NoteItem from "./NoteItem";
import noteContext from "./context/notes/NoteContext";

function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes ,editNote } = context;
  const ref = useRef(null);
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""}) //note states
  // when the Edit button on the note is clicked
  const updateNote = (note) => {
    ref.current.click();
    setNote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag})
  };
  // To handle the update function of the note
  const handleUpdate=(e)=>{
    e.preventDefault()
    editNote(note.id,note.etitle,note.edescription,note.etag)
}
  // this function will target the name attribute of the input field and set the value of the input field to the state
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none" // d-none b-strap className to not display the button
        data-bs-toggle="modal"
        data-bs-target="#EditNoteModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="EditNoteModal"
        tabIndex="-1"
        aria-labelledby="EditNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editor
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* form to update Note */}
              <form>
                <div className="mb-3">
                  <label htmlFor="noteTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.etitle}
                    id="etitle"
                    name="etitle"
                    placeholder="Enter your note title"
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="noteContent" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    value={note.edescription}
                    id="edescription"
                    name="edescription"
                    rows="3"
                    placeholder="Write your notes here..."
                    onChange={onChange}
                  ></textarea>
                </div>

                <div className="mb-3 ">
                  <label htmlFor="noteCategory" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    value={note.etag}
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  >
                    <option selected>Select a category</option>
                    <option>Personal</option>
                    <option>Work</option>
                    <option>Study</option>
                    <option>Health</option>
                    <option>Other</option>
                  </select>
                </div>
              </form>
              {/* End of the Form */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<3 || note.edescription.length<6} onClick={handleUpdate} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="notes-section">
      <h2>All Notes</h2>

      <div className="note-container">
        {notes.length === 0 ? (
          <p>No notes available</p>
        ) : (
          notes.map((note) => {
            return <NoteItem note={note} update={updateNote} />;
          })
        )}
        </div>
        </div>
    </div>
  );
}

export default Notes;
