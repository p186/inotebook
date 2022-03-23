import React, { useContext } from 'react'
import notesContext from '../context/notes/notesContext';

const Noteitem = (props) => {
    const context = useContext(notesContext);
    const { deleteNotes } = context;
    const { notes,updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{notes.title}</h5>
                    <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNotes(notes._id);
                            props.showAlert("Deleted Successfully","success"); }}></i> 
                    <i className="far fa-edit mx-2" onClick={()=>{updateNote(notes)}}></i>
                    </div>
                    <p className="card-text">{notes.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
