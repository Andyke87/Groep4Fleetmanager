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