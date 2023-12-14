/* eslint-disable no-unused-vars */
import React from 'react'



const TankkaartenButton = () => {
  const voornaam = window.location.pathname.split('/').pop();
  
  const handleTankkaarten = () => {
    window.location.href = `/NieuwSchermTankkaarten/${voornaam}`;
}
  return (
   <button  className='buttons' onClick={handleTankkaarten} >Gas Cards</button>
  )
}

export default TankkaartenButton