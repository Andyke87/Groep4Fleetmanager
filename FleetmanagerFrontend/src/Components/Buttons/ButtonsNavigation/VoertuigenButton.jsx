/* eslint-disable no-unused-vars */
import React from 'react'




 const VoertuigenButton = () => {

  const voornaam = window.location.pathname.split('/').pop();

  const handleVoertuigen = () => {
    window.location.href = `/NieuwSchermVoertuigen/${voornaam}`;
}
  return (
    <button className='buttons' onClick={handleVoertuigen}>Vehicles</button>
  )
}
export default VoertuigenButton