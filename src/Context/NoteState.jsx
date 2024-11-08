
import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

  const notes = [
    {
      "_id": "66b1a9c83b70de3959c1270d",
      "user": "66b0b414c87f14f4ebd56c48",
      "title": "Helloo",
      "description": "sfdffhfdhFAG ASYFDfgh",
      "tag": "personal",
      "date": "2024-08-06T04:42:48.833Z",
      "__v": 0
    },
    {
      "_id": "66b1a9c93b70de3959c1270f",
      "user": "66b0b414c87f14f4ebd56c48",
      "title": "Helloo",
      "description": "sfdffhfdhFAG ASYFDfgh",
      "tag": "personal",
      "date": "2024-08-06T04:42:49.059Z",
      "__v": 0
    },
    {
      "_id": "66b1a9c93b70de3959c12711",
      "user": "66b0b414c87f14f4ebd56c48",
      "title": "Helloo",
      "description": "sfdffhfdhFAG ASYFDfgh",
      "tag": "personal",
      "date": "2024-08-06T04:42:49.267Z",
      "__v": 0
    },
    {
      "_id": "66b1a9c93b70de3959c12713",
      "user": "66b0b414c87f14f4ebd56c48",
      "title": "Helloo",
      "description": "sfdffhfdhFAG ASYFDfgh",
      "tag": "personal",
      "date": "2024-08-06T04:42:49.477Z",
      "__v": 0
    },
    {
      "_id": "66b1a9c93b70de3959c12715",
      "user": "66b0b414c87f14f4ebd56c48",
      "title": "Helloo",
      "description": "sfdffhfdhFAG ASYFDfgh",
      "tag": "personal",
      "date": "2024-08-06T04:42:49.683Z",
      "__v": 0
    }
  ];
  const s1 ={
    "name" : "anam",
    "calss" : "3"
  };

  const[state, setState] = useState(s1);
  const[Notes, setNotes] = useState(notes);

  const update = () => {
    setTimeout(() =>{
     setState({"name" : "zahra",
    "calss" : "8"});
    }, 1000);
  }

  return (
     <NoteContext.Provider value={{state, update, Notes, setNotes}}>
        {props.children}
     </NoteContext.Provider>
  )
}

export default NoteState;
