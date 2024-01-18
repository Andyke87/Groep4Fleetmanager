/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
//import './NieuwScherm.css';
import '../Welkom/Welkom.css';
import '../Login/Login.css';
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';
import HomeButton from '../Buttons/HomeButton';
import VoertuigenButton from '../Buttons/ButtonsNavigation/VoertuigenButton';
import TankkaartenButton from '../Buttons/ButtonsNavigation/TankkaartenButton';
import BestuurdersButton from '../Buttons/ButtonsNavigation/BestuurdersButton';
import ButtonGebruikers from '../Buttons/ButtonsNavigation/ButtonUsers';
import ButtonRelation from '../Buttons/ButtonsNavigation/ButtonRelations';
import FormulierenRelaties from '../Formulieren/FormulierRelaties';

const NieuwSchermRelaties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rol, setRol] = useState("");

  useEffect(() => {
    // Haal de gebruikersrol op uit localStorage
    const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));

    if (authenticatedUser) {
      setRol(authenticatedUser.role);
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleInputChange = (event) => {
    const { target: { value } } = event;
    setSearchTerm(value);
  };

  return (
    <div className='containerNieuwScherm'> 
      <div className='containerButtons'> 
        <input 
          type="text" 
          className='searchfield'
          placeholder='Search on first name'
          value={searchTerm}
          onChange={handleInputChange}
        />
        <BrightnessButton/>
        <HomeButton/>
        <LogoutButton/>
      </div>
      <div className='thirdScreenContainer'>
        <div className='buttonsThirdScreen'>
          <BestuurdersButton />
          <TankkaartenButton/>
          <VoertuigenButton/>
          {/*<ButtonRelation/>*/}
          {rol === 'Admin' && <ButtonGebruikers/>}
        </div>
        <FormulierenRelaties searchTerm={searchTerm}/>
      </div>
    </div>
  );
}

export default NieuwSchermRelaties;
