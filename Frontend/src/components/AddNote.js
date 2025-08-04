import React,{useContext,useState} from 'react'
import noteContext from './context/notes/NoteContext'

function AddNote() {
    const context=useContext(noteContext)
    const {addNote}=context
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const submitNote=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        document.getElementById("addNoteForm").reset() // to clear the form or input fields after submitting the note
    }
    const clearNote=()=>{
        setNote({title:"",description:"",tag:""})
    }
    // this function will target the name attribute of the input field and set the value of the input field to the state
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div className="form-container my-9">
      <div className="form-title"><h2>New Note</h2></div>
      
      <form id="addNoteForm">
        <div className="mb-3">
          <label htmlFor="noteTitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" placeholder="Enter your note title" onChange={onChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="noteContent" className="form-label">Content</label>
          <textarea className="form-control" id="description" name="description" rows="6" placeholder="Write your notes here..." onChange={onChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="notetag" className="form-label">Category</label>
          <select className="form-select" id="tag" name="tag" onChange={onChange}>
            <option selected>Select a category</option>
            <option >Personal</option>
            <option >Work</option>
            <option >Study</option>
            <option >Health</option>
            <option >Other</option>
          </select>
        </div>

        <div className="d-flex justify-content-end">
          <button type="reset" className="btn btn-outline-secondary me-2" onClick={clearNote}>Clear</button>
          <button disabled={note.title.length<3 || note.description.length<6 || note.tag==="Select a category"} type="submit" className="btn btn-primary" onClick={submitNote}>Save</button>
        </div>
      </form>
    </div>
    
  )
}

export default AddNote
