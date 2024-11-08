import React from 'react';
import AddNote from './AddNote';

const Home = () => {
  return (
    <div className='container'>
      <h2 className='my-2'>Add Note</h2>
     <AddNote/>
     <h2 className='my-5'>Your Note</h2>
    </div>
  )
}

export default Home

