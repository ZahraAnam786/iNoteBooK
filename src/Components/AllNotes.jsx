import React, { useContext } from "react";
import NoteContext from '../Context/NoteContext';

const AllNotes = () => {
  const context = useContext(NoteContext);

  //Destructuring
  const {Notes, setNotes} = context;

  return (
    <>
      {Notes.map((note) =>{
        return(
            <div className="card my-5" style={{width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
              <p className="card-text">
                {note.description}
              </p>
              <a href="#" className="card-link">
                Edit
              </a>
              <a href="#" className="card-link">
                Delete
              </a>
            </div>
          </div>
        );
      })}

 </> 
  );
};

export default AllNotes;
