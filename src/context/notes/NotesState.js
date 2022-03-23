import NotesContext from "./notesContext";
import { useState } from "react";

const NotesState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = []
  const [notes, setNotes] = useState(notesinitial)

  
  //GetAll a Notes
  const getNotes = async () => {
  
    //API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });
   const json = await response.json();
    
    console.log(json)
    setNotes(json)
  }


  //Add a Notes
  const addNotes = async (title, description, tag) => {
    //ToDO API call  
    //API Call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      
    
    
    const note = await response.json();
    setNotes(notes.concat(note))
  }


  //Delete a Notes
  const deleteNotes =async (id) => {
    
     //API Call
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting the note by click button" + id);
    const newNotes = notes.filter((note) => { return note._id!== id })
    setNotes(newNotes)
  }


  //Edit a Notes
  const editNotes = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = response.json();
    console.log(json);
  
let newNotes = JSON.parse(JSON.stringify(notes))
  //Logic to edit in client
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
   setNotes(newNotes);
  }
  return (
    <NotesContext.Provider value={{ notes, addNotes, deleteNotes, editNotes, getNotes}}>
      {props.children}
    </NotesContext.Provider>
  )

}

export default NotesState;