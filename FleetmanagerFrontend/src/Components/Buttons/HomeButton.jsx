/* eslint-disable no-unused-vars */
import React from 'react'


const handleHome = () => {
    window.location.href = '/Welkom/:firstName';
}
const HomeButton = () => {
  
  const voornaam = window.location.pathname.split('/').pop();

  const handleHome = () => {
    window.location.href = `/Welkom/${voornaam}`;
}
  return (
    <div> <button className='homeButton' onClick={handleHome} ></button></div>
  )
}

export default HomeButton