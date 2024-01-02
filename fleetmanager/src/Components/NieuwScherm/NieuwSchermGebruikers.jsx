/* eslint-disable no-unused-vars */
import React, { useState} from 'react'
import './NieuwScherm.css'
import '../Welkom/Welkom.css';
import '../Login/Login.css';
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';
import HomeButton from '../Buttons/HomeButton';
import VoertuigenButton from '../Buttons/ButtonsNavigation/VoertuigenButton';
import TankkaartenButton from '../Buttons/ButtonsNavigation/TankkaartenButton';
import BestuurdersButton from '../Buttons/ButtonsNavigation/BestuurdersButton';
import ButtonRelaties from '../Buttons/ButtonsNavigation/ButtonRelations';
import FormulierGebruikers from '../Formulieren/FormulierGebruikers';
import ButtonGebruikers from '../Buttons/ButtonsNavigation/ButtonUsers';

const NieuwSchermGebruikers = () => {
  const [searchTerm, setSearchTerm] = useState("");


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
            <BestuurdersButton/>
            <TankkaartenButton/>
            <VoertuigenButton/>
            <ButtonRelaties/>
            <ButtonGebruikers/>
           </div>
          <FormulierGebruikers searchTerm={searchTerm}/>
          </div>
        </div>
      )
    }

export default NieuwSchermGebruikers