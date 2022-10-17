//rafce shortcut to make function 
import React, { useContext, useEffect , useRef, useState} from 'react'
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext';
import { useHistory } from 'react-router-dom';



const Notes = (props) => {
  const  context = useContext(noteContext);
  //Below code called as destructuring add notes and setNotes in context
  let history = useHistory(); 
  const {notes, getNotes, editNote} = context;  

  useEffect(() => {
      if(localStorage.getItem('token')){
         getNotes()
      }else{
        history.push('/login')
      }
  
    // eslint-disable-next-line
  }, [])
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""})
  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag});
      
  }
  
  const handleClick =(e)=>{
    console.log('Editing a note', note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("updated successfully", "success")
    
  }
  const onChange =(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
    <div className='your-note'>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>
                  
              <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document" >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
                      <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                    <form className="my-3">
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">Name</label>
                            <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                        
                          </div>
                          <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Age</label>
                            <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Membership</label>
                            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required/>
                          </div>
                      
                        </form>
                    </div>
                    <div className="modal-footer col">
                      <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                    </div>
                  </div>
                </div>
              </div>
         <div className="row my-3 mx-3 sm-4 col" >
               <h3>Your Note</h3>   
               <div className="container ">
               {notes.length===0 &&'No notes to display'}
               </div>
              {notes.map((note)=>{    
                  return <Noteitem Key={note._id} updateNote={updateNote}  note={note} />
        }
        )}
     
        </div>
        </div>
        </>
  )
}

export default Notes