/* eslint-disable no-unused-vars */
// Login.js
import React, { useEffect, useState } from 'react';
import './Login.css';
import Email from './Email';
import Wachtwoord from './Wachtwoord';
import SubmitContainer from './SubmitContainer';
import BrightnessButton from '../Buttons/BrightnessButton';
import { getUsers} from '../../../API/index'

const Login = () => {
  const [action, setAction] = useState('Login');
  const [email, setEmail] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');

  // haal al de users op uit de database om te kijken of de gebruikersnaam en wachtwoord overeenkomen
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

const handleLogin = async () => {
  if (email && wachtwoord) {
    try {
      const response = await getUsers();
      const users = response.data;

      // Controleer of de ingevoerde e-mail en wachtwoord overeenkomen met een gebruiker in de database
      const authenticatedUser = users.find(
        user =>
          user.email === email && user.password === wachtwoord
      );

      if (authenticatedUser) {
        setAction('Logging in');
        // Stuur de ingelogde gebruiker door naar de Welkom-pagina
        window.location.href = `/Welkom/${authenticatedUser.firstName}`;
      } else {
        alert('Ongeldige e-mail of wachtwoord.');
      }
    } catch (error) {
      console.error('Fout bij het ophalen van gebruikers:', error);
      alert('Er is een fout opgetreden bij het inloggen.');
    }
  } else {
    alert('Vul de e-mail- en wachtwoordvelden in.');
  }
};

  return (
    <div className="main">
      <div className='containerBackground'>
        <div className='containerButtons'> 
          <BrightnessButton/>
        </div>
        <div className='containerLogin'>
          <div className='border'>
            <Email
              email={email}
              setEmail={setEmail}
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
