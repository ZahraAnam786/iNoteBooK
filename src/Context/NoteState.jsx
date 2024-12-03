
import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const baseURL = "http://localhost:5000/api/notes/";
  const notes = [];
  const s1 ={
    "name" : "anam",
    "calss" : "3"
  };

  const[state, setState] = useState(s1);
  const[Notes, setNotes] = useState(notes);

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      type: type,
      msg: message,
    });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };


  const update = () => {
    setTimeout(() =>{
     setState({"name" : "zahra",
    "calss" : "8"});
    }, 1000);
  }

  const fetchNotes = async () => {
    try {
      const response = await fetch(baseURL + 'getAllNotes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMGI0MTRjODdmMTRmNGViZDU2YzQ4In0sImlhdCI6MTcyMjg2MDMzM30.8pX-l0pqhC-4wRuBeLziu4Jhm_hWbSY_2PLGXX_uCbs'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }



  const addNote = async (note) => {
    try {
      const response = await fetch(baseURL + 'addNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMGI0MTRjODdmMTRmNGViZDU2YzQ4In0sImlhdCI6MTcyMjg2MDMzM30.8pX-l0pqhC-4wRuBeLziu4Jhm_hWbSY_2PLGXX_uCbs'
        },
        body: JSON.stringify(note)
      });

      if (response.status === 400) {
        const result = await response.json();
        if (result.error) {
          showAlert(result.error.map(err => err.msg),  "danger"); // Extract error messages
        }
      } else if (response.ok) {
        const resultset = await response.json();
        showAlert('Note saved successfully.', 'success')
        setNotes(Notes.concat(resultset));
      }
    } catch (err) {
      console.error("An error occurred:", err);
      showAlert("Something went wrong!", "danger");
    }
    }
  

  const deleteNote = async (id) => {
    try {
      const response = await fetch(baseURL + `deleteNote/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMGI0MTRjODdmMTRmNGViZDU2YzQ4In0sImlhdCI6MTcyMjg2MDMzM30.8pX-l0pqhC-4wRuBeLziu4Jhm_hWbSY_2PLGXX_uCbs'
        },
      });

      if (!response.ok) {
        const result = await response.json();
        if (result) {
          showAlert(result,  "danger"); // Extract error messages
        }
      } else if (response.ok) {
        const resultset = await response.json();
        const newNotes = Notes.filter((f) => {return f._id != id});
        setNotes(newNotes);
        showAlert('Note deleted successfully.', 'success');
      }
    } catch (err) {
      console.error("An error occurred:", err);
      showAlert("Something went wrong!", "danger");
    }

  }

  const editNote = async (note) => {
    try {
      const response = await fetch(baseURL + `updateNote/${note._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMGI0MTRjODdmMTRmNGViZDU2YzQ4In0sImlhdCI6MTcyMjg2MDMzM30.8pX-l0pqhC-4wRuBeLziu4Jhm_hWbSY_2PLGXX_uCbs'
        },
        body: JSON.stringify(note)
      });

      if (response.status === 400) {
        const result = await response.json();
        if (result) {
          showAlert(result,  "danger"); // Extract error messages
        }
      } else if (response.ok) {
        const resultset = await response.json();
        showAlert('Note Updated successfully.', 'success');
        Notes.forEach((val) => {
          if (val._id === note._id) {
              val.title = note.title;
              val.description = note.description;
          }
      });
      setNotes([...Notes]);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      showAlert("Something went wrong!", "danger");
    }
  }

  return (
     <NoteContext.Provider value={{state, fetchNotes, update, Notes, addNote, deleteNote, editNote, alert}}>
        {props.children}
     </NoteContext.Provider>
  )
}

export default NoteState;
