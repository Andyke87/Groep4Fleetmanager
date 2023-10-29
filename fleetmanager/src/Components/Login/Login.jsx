import React, { useState } from 'react';
import './Login.css';


const Login = () => {
  const [action, setAction] = useState('Login');
  const [gebruikersnaam, setGebruikersnaam] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');

  const handleLogin = () => {
    if (gebruikersnaam && wachtwoord) {
      setAction('Logging in...');
    } else {
      alert('Vul in de gebruikersnaam en wachtwoord velden in.');
    }
  };

  return (

  

    <div className='containerLogin'>
      <div className='border'>
      <div className='headerText'>
        <div className='text'>Gebruikersnaam</div>
      </div>
          <input
            className="inputGebruikersnaam"
            type="text"
            placeholder='Patrick'
            value={gebruikersnaam}
            onChange={(e) => setGebruikersnaam(e.target.value)}
          />
        <div className='headerText'>
          <div className='text'>Wachtwoord</div>
        </div>
          <input
            className='inputWachtwoord'
            type="password"
            placeholder='Allphi123'
            value={wachtwoord}
            onChange={(e) => setWachtwoord(e.target.value)}
          />
      <div className="submit-container">
        <button className="submit" onClick={handleLogin} >
          {action}
        </button>
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
