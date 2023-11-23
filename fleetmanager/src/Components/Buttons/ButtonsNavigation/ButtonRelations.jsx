/* eslint-disable no-unused-vars */
import React from 'react'

const handleRelaties = () => {
    window.location.href = '/NieuwSchermRelaties';
}

const ButtonRelaties = () => {
  return (
   <button  className='buttons' onClick={handleRelaties} >Relations</button>
  )
}

export default ButtonRelaties