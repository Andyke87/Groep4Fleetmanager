/* eslint-disable no-unused-vars */
import React from 'react'

const handleRelaties = () => {
    window.location.href = '/Relaties';
}

const ButtonRelaties = () => {
  return (
   <button  className='nieuweRelatieButton' onClick={handleRelaties} >New Relation</button>
  )
}

export default ButtonRelaties