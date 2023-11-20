/* eslint-disable no-unused-vars */
// Login.js
import React, { useState } from 'react';
import './Login.css';
// import SwitchButton from '../Buttons/SwitchButton';
import Gebruikersnaam from './Gebruikersnaam';
import Wachtwoord from './Wachtwoord';
import SubmitContainer from './SubmitContainer';
import BrightnessButton from '../Buttons/BrightnessButton';

const Login = () => {
  const [action, setAction] = useState('Login');
  const [gebruikersnaam, setGebruikersnaam] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');

  const handleLogin = () => {
    if (gebruikersnaam && wachtwoord) {
      setAction('Logging in');
      window.location.href = '/Welkom';
    } else {
      alert('Vul in de gebruikersnaam en wachtwoord velden in.');
    }
  };

  return (
    <div className="main">
      {/* <SwitchButton /> */}
      <div className='containerBackground'>
        <div className='containerButtons'> 
          <BrightnessButton/>
        </div>
        <div className='containerLogin'>
          <div className='border'>
            <Gebruikersnaam
              gebruikersnaam={gebruikersnaam}
              setGebruikersnaam={setGebruikersnaam}
            />
            <Wachtwoord
              wachtwoord={wachtwoord}
              setWachtwoord={setWachtwoord}
            />
            <SubmitContainer action={action} handleLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
