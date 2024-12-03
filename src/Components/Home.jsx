import React, {useContext} from 'react';
import AddNote from './AddNote';
import AllNotes from './AllNotes';
import Alert  from './Alert';
import NoteContext from '../Context/NoteContext';

const Home = () => {
  const context = useContext(NoteContext);

  //Destructuring
  const {alert} = context;

  return (<div style={{marginTop:'1px'}}>
    <Alert alert={alert}/>
    <div className='container'>
      <h2 className='my-2'>Add Note</h2>
     <AddNote/>
     <h2 className='mt-5'>Your Note</h2>
     <AllNotes/>
    </div></div>
  )
}

export default Home

