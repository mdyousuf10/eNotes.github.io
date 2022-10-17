
import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext" 
import { useState } from 'react'
import "./addnotes.css"

const AddNote = (props) => {
    const  context = useContext(noteContext)
  //Below code called as destructuring add notes and setNotes in context
  const {addNote} = context;  

  const [note, setNote] = useState({title:"", description:"", tag:""})
  const handleClick =(e)=>{
    e.preventDefault();
     addNote(note.title, note.description, note.tag);
     setNote({title:"", description:"", tag:""})
     props.showAlert("Notes Addede successfully", "success")
  }
  const onChange =(e)=>{
    setNote({...note, [e.target.name]: e.target.value}) 
   
  }
  return (
    <>
    <h2 style={{textAlign: "center"}}>Add new notes</h2 >
    <div className="container mt-5"  >
    <div className="row">
        <form className="col-sm-8 p-2">
            <div className="mb-3">
              <label style={{ color: "white" }} htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" placeholder="Enter your Title" name="title" aria-describedby="emailHelp" value={note.title}  onChange={onChange} minLength={5} required/> 
            </div>
            <div className="mb-3">
              <label style={{ color: "white" }} htmlFor="desc" className="form-label">Description</label>
              <input type="text" className="form-control" id="description" placeholder="Enter your Description" name="description" value={note.description}  onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label style={{ color: "white" }} htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter your Tag-optional" value={note.tag} onChange={onChange} minLength={5} required/>
            </div>
          </form>
          <hr class="d-sm-none"></hr>
          <div class=" col-sm-4 fakeimg bg-white">Fake Image</div>
          <div className="wrap my-5 ">
            <button className='button-1 ' disabled={note.title.length<5 || note.description.length<5} type="submit"  onClick={handleClick}>Add Note</button>
            </div>
          </div>
          
          
          </div>

  </>
  )
}

export default AddNote
