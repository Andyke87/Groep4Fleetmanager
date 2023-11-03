import React from 'react'


const handleVoertuigen = () => {
    window.location.href = '/NieuwSchermVoertuigen';
}

 const VoertuigenButton = () => {
  return (
    <button className='buttons' onClick={handleVoertuigen}>Voertuigen</button>
  )
}
export default VoertuigenButton