/* eslint-disable no-unused-vars */
import React from 'react';
import './Welkom.css';
import '../Login/Login.css';
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';

const Welkom = () => {

const handleBestuurders = () => {
  window.location.href = `/NieuwSchermBestuurders/${voornaam}`;
};

const handleVoertuigen = () => {
  window.location.href = `/NieuwSchermVoertuigen/${voornaam}`;
};

const handleTankkaarten = () => {
  window.location.href = `/NieuwSchermTankkaarten/${voornaam}`;
};

const handleRelaties = () => {
  window.location.href = `/NieuwSchermRelaties/${voornaam}`;
};

const handleUsers = () => {
  window.location.href = `/NieuwSchermUsers/${voornaam}`;
};

  const voornaam = window.location.pathname.split('/').pop();

  return (
    <div className='containerBackground'>
      <div className='containerButtons'>
        <BrightnessButton />
        <LogoutButton />
      </div>
      <div className='containerWelkom'>
        <h1 className='nameAdress'>Welkom {voornaam}</h1>
        <button className='button' onClick={handleBestuurders}>
          Drivers
        </button>
        <button className='button' onClick={handleTankkaarten}>
          Gas Cards
        </button>
        <button className='button' onClick={handleVoertuigen}>
          Vehicles
        </button>
        <button className='button' onClick={handleRelaties}>
          Relations
        </button>
        <button className='button' onClick={handleUsers}>
          Users
        </button>
      </div>
    </div>
  );
};

export default Welkom;
