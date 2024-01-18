/* eslint-disable no-unused-vars */
import React from 'react'


const BestuurdersButton = () => {

  const handleBestuurders = () => {
    const voornaam = window.location.pathname.split('/').pop();
    
    window.location.href = `/NieuwSchermBestuurders/${voornaam}`;
}
  return (
    <button  className='buttons'  onClick={handleBestuurders} >Drivers</button>
  )
}

export default BestuurdersButton