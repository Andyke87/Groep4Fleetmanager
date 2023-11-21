/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const ButtonAnnuleren = ({ onClick }) => {
  return (
    <button className='buttonsNieuw' type="button" onClick={onClick}>
      Annuleer
    </button>
  );
};

export default ButtonAnnuleren;

