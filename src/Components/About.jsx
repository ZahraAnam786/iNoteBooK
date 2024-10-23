
import React , {useContext, useEffect} from 'react'
import NoteContext from '../Context/NoteContext';

const About = () => {
  const a = useContext(NoteContext);

  useEffect(() =>{
    a.update();
    // eslint-disable-next-line
  },[]);

  return (
    <div>
      I am {a.state.name}
    </div>
  )
}

export default About



