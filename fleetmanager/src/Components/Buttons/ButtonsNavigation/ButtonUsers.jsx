/* eslint-disable no-unused-vars */
import React from 'react'
 

const ButtonUsers = () => {
    const voornaam = window.location.pathname.split('/').pop();

    const handleUsers = () => {
        window.location.href = `/NieuwSchermGebruikers/${voornaam}`;  
    }
    
  return (
    <button  className='buttons'  onClick={handleUsers}>Users</button>
  )
}

export default ButtonUsers