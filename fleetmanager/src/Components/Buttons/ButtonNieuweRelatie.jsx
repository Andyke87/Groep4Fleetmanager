/* eslint-disable no-unused-vars */
import React from 'react'

const handleRelaties = () => {
    window.location.href = '/Relaties';
}

const ButtonRelaties = () => {
  return (
   <button  className='buttonConnections' onClick={handleRelaties} >New Relation</button>
  )
}

export default ButtonRelaties