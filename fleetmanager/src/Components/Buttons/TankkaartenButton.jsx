/* eslint-disable no-unused-vars */
import React from 'react'

const handleTankkaarten = () => {
    window.location.href = '/NieuwSchermTankkaarten';
}

const TankkaartenButton = () => {
  return (
   <button  className='buttons' onClick={handleTankkaarten} >Tankkaarten</button>
  )
}

export default TankkaartenButton