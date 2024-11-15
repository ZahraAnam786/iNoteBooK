import React, { useContext } from "react";
import NoteContext from '../Context/NoteContext';

const AllNotes = () => {
  const context = useContext(NoteContext);

  //Destructuring
  const {Notes, setNotes} = context;

  return (
    <>
    <div className="row g-1">
      {Notes.map((note) =>{
        return(
            <div className="card my-3 me-5 col-3" style={{width: '18rem'}} key={note._id}>
            <div className="card-body"> 
              <h5 className="card-title">{note.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
              <p className="card-text">
                {note.description}
              </p>
              <a href="#" className="card-link" style={{color: 'black'}}>
              <i className="fa-solid fa-pen-to-square"></i>
              </a>
              <a href="#" className="card-link" style={{color: 'black'}}>
              <i className="fa-solid fa-trash"></i>
              </a>
            </div>
          </div>
        );
      })}
</div>
 </> 
  );
};

export default AllNotes;
