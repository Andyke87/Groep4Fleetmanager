/* eslint-disable no-unused-vars */
import React from 'react'

const handleRelaties = () => {
    window.location.href = '/NieuwSchermRelaties';
}

const ButtonRelaties = () => {

  const voornaam = window.location.pathname.split('/').pop();

  const handleRelaties = () => {
    window.location.href = `/NieuwSchermRelaties/${voornaam}`;
}
  return (
   <button  className='buttons' onClick={handleRelaties} >Relations</button>
  )
}

export default ButtonRelaties