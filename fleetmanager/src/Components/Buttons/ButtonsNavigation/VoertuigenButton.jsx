/* eslint-disable no-unused-vars */
import React from 'react'


const handleVoertuigen = () => {
    window.location.href = '/NieuwSchermVoertuigen';
}

 const VoertuigenButton = () => {
  return (
    <button className='buttons' onClick={handleVoertuigen}>Vehicles</button>
  )
}
export default VoertuigenButton