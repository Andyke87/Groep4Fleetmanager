/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Login.css';
import SubmitContainer from './SubmitContainer';
import Email from './Email';
import Wachtwoord from './Wachtwoord';
import BrightnessButton from '../Buttons/BrightnessButton';
import { loginUser, getUsers } from '../../../API/index';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
  const [action, setAction] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: loginUser,
    onSuccess: async (data) => {
      console.log('Succesvolle post', data);

      try {
        // Haal alle gebruikersgegevens op
        const allUsers = await getUsers();
        
        // Filter de ingelogde gebruiker op basis van e-mail
        const loggedInUser = allUsers.data.find(user => user.email === email);
         
        setAction('Logging in');
        localStorage.setItem('authenticatedUser', JSON.stringify(loggedInUser));
        window.location.href = `/Welkom/${loggedInUser.firstName}`;
        
      } catch (error) {
        console.error('Error while getting user details:', error);
      }
    },
    onError: (error) => {
      console.log('Er is een error', error);
      showErrorMessage();
    },
  });

  const showErrorMessage = () => {
    alert('Invalid email or password');
  };

  const handleLogin = async () => {
    const setPayload = {
      email: email,
      password: password,
    };

    console.log('set payload:', setPayload);

    try {
      await mutation.mutateAsync(setPayload);
    } catch (error) {
      console.error('Error while posting data:', error);
    }
  };

  return (
    <div className="main">
      <div className='containerBackground'>
        <div className='containerButtons'>
          <BrightnessButton />
        </div>
        <div className='containerLogin'>
          <div className='border'>
            <Email
              email={email}
              setEmail={setEmail}
            />
            <Wachtwoord
              wachtwoord={password}
              setWachtwoord={setPassword}
            />
            <SubmitContainer action={action} handleLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
