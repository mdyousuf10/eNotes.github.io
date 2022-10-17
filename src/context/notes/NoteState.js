//context API
import NoteContext from "./noteContext";
import { useState,} from "react";

//used fetch with headers api to do api call --search on googlr "Fetch with headers for more "

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    //creating functions for edit notes

//Get all notelocaStorage.getItem('token')

const getNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
}



    //Add a note
    const addNote = async(title, description, tag)=>{
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
            
                headers: {
                'Content-Type': 'application/json',
                "auth-token" : localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            
                body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
            });
    
            const note = await response.json(); 
            setNotes(notes.concat(note))
   
    }

    //delete a note
    const deleteNote= async (id)=>{
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          
            headers: {
              'Content-Type': 'application/json',
              "auth-token" : localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }

          });
          const json= response.json();
          console.log(json)
            

        console.log("Deleting a note with id" + id);
        const newNotes   = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }


    //edit a note
    const editNote= async( id, title, description, tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          
            headers: {
              'Content-Type': 'application/json',
              "auth-token" : localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          
            body: JSON.stringify({title, description, tag }) // body data type must match "Content-Type" header
          });
          const json = await response.json(); 
          console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description=description;
                newNotes[index].tag=tag; 
                break;
            }
           
        }
        setNotes(newNotes);
    }


    return(
        <NoteContext.Provider value ={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
    }

export default NoteState