/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const ButtonUpdate = ({ onClick, buttonText }) => {
  return (
    <button 
      className='buttonsActions' 
      type="button" 
      onClick={onClick}>
        {buttonText}
    </button>
  );
};

export default ButtonUpdate