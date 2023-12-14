/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import './NieuwScherm.css'
import '../Welkom/Welkom.css';
import '../Login/Login.css';
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';
import HomeButton from '../Buttons/HomeButton';
import VoertuigenButton from '../Buttons/ButtonsNavigation/VoertuigenButton';
import TankkaartenButton from '../Buttons/ButtonsNavigation/TankkaartenButton';
import BestuurdersButton from '../Buttons/ButtonsNavigation/BestuurdersButton';
import ButtonGebruikers from '../Buttons/ButtonsNavigation/ButtonUsers';
import FormulierTankkaarten from '../Formulieren/FormulierTankkaarten';
import ButtonRelaties from '../Buttons/ButtonsNavigation/ButtonRelations';

export const NieuwSchermTankkaarten = () => {
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
          placeholder='Search on card number'
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
        <FormulierTankkaarten searchTerm={searchTerm}/>
      </div>
    </div>
  )
}
  