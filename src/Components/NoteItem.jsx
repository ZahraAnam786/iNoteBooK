import React, { useContext } from "react";
import NoteContext from "../Context/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);

  //Destructuring
  const { deleteNote } = context;

  return (
    <div
      className="card my-3 me-5 col-3"
      style={{ width: "18rem" }}
      key={props.note._id}
    >
      <div className="card-body">
        <h5 className="card-title">{props.note.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.note.tag}</h6>
        <p className="card-text">{props.note.description}</p>
        <a href="#" className="card-link" style={{ color: "black" }}>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => props.NoteEdit(props.note)}
          ></i>
        </a>
        <a
          href="#"
          className="card-link"
          onClick={() => deleteNote(props.note._id)}
          style={{ color: "black" }}
        >
          <i className="fa-solid fa-trash"></i>
        </a>
      </div>
    </div>
  );
};

export default NoteItem;
