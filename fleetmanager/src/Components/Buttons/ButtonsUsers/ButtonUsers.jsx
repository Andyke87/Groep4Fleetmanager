/* eslint-disable no-unused-vars */
import React from 'react'

const handleUsers = () => {
    window.location.href = '/NieuwSchermGebruikers';   
}
const ButtonUsers = () => {
  return (
    <button  className='buttons'  onClick={handleUsers}>Users</button>
  )
}

export default ButtonUsers