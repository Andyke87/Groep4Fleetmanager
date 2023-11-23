/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const ButtonOpslaan = ({onClick, disabled, buttonText}) => {

  
  return (
     <button 
     className='buttonsActions' type="button"
     onClick={onClick}
     disabled={disabled}
     title='All dropdowns required'
      >{buttonText}</button>
  )
}

export default ButtonOpslaan
