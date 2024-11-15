import React, { useState, useContext } from "react";
import NoteContext from '../Context/NoteContext';

const AddNote = () => {

  const context = useContext(NoteContext);
  const {addNote} = context;

  const [inputValue, setInputValue] = useState({
    title: '',
    description: '',
    tag: ''
  });
 
 const SubmitEvent = (event) =>{
  event.preventDefault();
  addNote(inputValue);
 }

 const handleInput = (event) =>{
     setInputValue({...inputValue, [event.target.name] : event.target.value })
 }

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
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
            onChange={handleInput}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={SubmitEvent}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
