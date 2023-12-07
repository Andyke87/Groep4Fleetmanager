/* eslint-disable no-unused-vars */
import React from 'react'
import './Welkom.css'
import '../Login/Login.css'
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';

const handleBestuurders = () => {
  window.location.href = '/NieuwSchermBestuurders';
}
const handleVoertuigen = () => {
  window.location.href = '/NieuwSchermVoertuigen';
}
const handleTankkaarten = () => {
  window.location.href = '/NieuwSchermTankkaarten';
}
const handleRelaties = () => {
  window.location.href = '/NieuwSchermRelaties';
}

const Welkom = () => {
  return (
    <div className='containerBackground'>
      <div className='containerButtons'> 
      <BrightnessButton/>
      <LogoutButton/>
       </div>
      <div className='containerWelkom'> 
          <h1 className='nameAdress'>Welkom Anke</h1>
          <button className='button' onClick={handleBestuurders}>Drivers</button>
          <button className='button' onClick={handleTankkaarten}>Gas Cards</button>
          <button className='button' onClick={handleVoertuigen}>Vehicles</button>          
          <button className='button' onClick={handleRelaties}>Relations</button>
      </div>
    </div>
  )
}

export default Welkom