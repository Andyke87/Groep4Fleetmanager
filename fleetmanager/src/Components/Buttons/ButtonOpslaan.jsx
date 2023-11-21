/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const ButtonOpslaan = ({onClick, disabled}) => {

  
  return (
     <button 
     className='buttonsNieuw' type="button"
     onClick={onClick}
     disabled={disabled}
     >Voeg toe</button>
  )
}

export default ButtonOpslaan
