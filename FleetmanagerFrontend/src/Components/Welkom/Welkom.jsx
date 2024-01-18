/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Welkom.css';
import '../Login/Login.css';
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';

const Welkom = () => {
  const [gebruiker, setGebruiker] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));

    if (authenticatedUser) {
      setGebruiker(`${authenticatedUser.firstName} ${authenticatedUser.name}`);
      setRol(authenticatedUser.role);
    } else {
      window.location.href = '/';
    }
  }, []);

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
  window.location.href = `/NieuwSchermGebruikers/${voornaam}`;
};

  const voornaam = window.location.pathname.split('/').pop();

return (
    <div className='containerBackground'>
      <div className='containerButtonsWelkom'>
        <BrightnessButton />
        <LogoutButton />
      </div>
      <div className='containerWelkom'>
        <h1 className='nameAdress'>Welkom {gebruiker}</h1>
        <p></p>
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
        {rol === 'Admin' && (
          <button className='button' onClick={handleUsers}>
            Users
          </button>
        )}
      </div>
    </div>
  );
};

export default Welkom;
