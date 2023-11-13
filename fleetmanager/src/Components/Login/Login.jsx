import React, { useState } from 'react';
import './Login.css';
import BrightnessButton from '../Buttons/BrightnessButton';
import SwitchButton from '../Buttons/SwitchButton';
import Gebruikersnaam from './Gebruikersnaam';
import Wachtwoord from './Wachtwoord';
import SubmitContainer from './SubmitContainer';


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
      <SwitchButton/>
      <div className='containerBackground'>
      <div className='containerLogin'>
        <div className='border'>
        <Gebruikersnaam/>
        <Wachtwoord/>
        <SubmitContainer/>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;









// const handleLogin = async () => {
//   if (!gebruikersnaam || !wachtwoord) {
//     alert('Please fill in both Gebruikersnaam and Wachtwoord fields.');
//     return;
//   }

//   setAction('Logging in...'); // Update the button text

//   try {
//     // Simulate an asynchronous login process (replace with actual login logic)
//     await loginAsync(gebruikersnaam, wachtwoord);

//     // If the login is successful, you can redirect or perform other actions here
//     // For now, we'll reset the form
//     setGebruikersnaam('');
//     setWachtwoord('');
//     setAction('Login'); // Reset the button text
//   } catch (error) {
//     // Handle login error (e.g., show an error message)
//     console.error('Login failed:', error);
//     setAction('Login'); // Reset the button text
//   }
// };

// // Simulate an asynchronous login process (replace with your actual login logic)
// const loginAsync = (gebruikersnaam, wachtwoord) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate a successful login (replace with actual authentication logic)
//       const success = gebruikersnaam === 'example' && wachtwoord === 'password';
//       if (success) {
//         resolve();
//       } else {
//         reject('Invalid credentials');
//       }
//     }, 1000); // Simulate a 1-second login process
//   });
// };
