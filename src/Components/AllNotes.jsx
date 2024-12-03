import React, { useContext, useState, useRef, useEffect} from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../Context/NoteContext";

const AllNotes = () => {
  const context = useContext(NoteContext);

  //Destructuring
  const { Notes, fetchNotes, editNote } = context;
  const refModal = useRef(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const NoteEdit = (note) => {
     refModal.current.click();
     setInputValue({_id:note._id, title: note.title, description:note.description})
  };

  const [inputValue, setInputValue] = useState({
    _id: '',
    title: '',
    description: '',
    tag: ''
  });
 
 const UpdateEvent = (event) =>{
  event.preventDefault();
  console.log(inputValue);
  editNote(inputValue);
 }

 const handleInput = (event) =>{
     setInputValue({...inputValue, [event.target.name] : event.target.value })
 }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        style={{display: "none"}}
        ref = {refModal}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body"><form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            value = {inputValue.title}
            onChange={handleInput}
          />
          <div id="emailHelp" className="form-text">
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            id="description"
            value = {inputValue.description}
            onChange={handleInput}
          />
        </div>

        <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary"  onClick={UpdateEvent}
              >
                Save changes
              </button>
            </div>
      </form></div>

          </div>
        </div>
      </div>

      <div className="row g-1">
        {Notes.lenght == 0
          ? "No record found"
          : Notes.map((note) => {
              return <NoteItem note={note} NoteEdit={NoteEdit} />;
            })}
      </div>
    </>
  );
};

export default AllNotes;
