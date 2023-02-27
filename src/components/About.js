import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a=useContext(noteContext);
  return (
    <div>
      This is about {a.roll_no} and his roll no is {a.name}
      </div>
  )
}

export default About