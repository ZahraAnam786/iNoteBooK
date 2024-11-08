import React from 'react';
import AddNote from './AddNote';
import AllNotes from './AllNotes';

const Home = () => {
  return (
    <div className='container'>
      <h2 className='my-2'>Add Note</h2>
     <AddNote/>
     <h2 className='my-5'>Your Note</h2>
     <AllNotes/>
    </div>
  )
}

export default Home

