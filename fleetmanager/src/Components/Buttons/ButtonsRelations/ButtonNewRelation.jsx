/* eslint-disable no-unused-vars */
import React from 'react'

const handleRelation = () => {
    window.location.href = '/Relation';
}

const ButtonNewRelation = () => {
  return (
   <button  className='buttonsActions' onClick={handleRelation} >New Relation</button>
  )
}

export default ButtonNewRelation