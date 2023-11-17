/* eslint-disable no-unused-vars */
import React from 'react'


const handleHome = () => {
    window.location.href = '/Welkom';
}
const HomeButton = () => {
  return (
    <div> <button className='homeButton' onClick={handleHome} ></button></div>
  )
}

export default HomeButton