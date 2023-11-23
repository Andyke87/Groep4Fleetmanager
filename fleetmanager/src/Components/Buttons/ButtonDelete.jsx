/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const ButtonDelete = ({ onClick, buttonText }) => {
  return (
    <button 
      className='buttonsActions' 
      type="button" 
      title='Back to relations page'
      onClick={onClick}>
        {buttonText}
    </button>
  );
};

export default ButtonDelete;

