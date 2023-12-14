/* eslint-disable no-unused-vars */
import React from 'react'
import './NieuwScherm.css'
import '../Welkom/Welkom.css';
import '../Login/Login.css';
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';
import HomeButton from '../Buttons/HomeButton';
import VoertuigenButton from '../Buttons/ButtonsNavigation/VoertuigenButton';
import TankkaartenButton from '../Buttons/ButtonsNavigation/TankkaartenButton';
import BestuurdersButton from '../Buttons/ButtonsNavigation/BestuurdersButton';
import FormulierBestuurders from '../Formulieren/FormulierBestuurders';
import ButtonRelaties from '../Buttons/ButtonsNavigation/ButtonRelations';
import FormulierGebruikers from '../Formulieren/FormulierGebruikers';
import ButtonUsers from '../Buttons/ButtonsUsers/ButtonUsers';

const NieuwSchermGebruiekrs = () => {
    return (
        <div className='containerNieuwScherm'> 
         <div className='containerButtons'> 
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
            <ButtonUsers/>
           </div>
          <FormulierGebruikers/>
          </div>
        </div>
      )
    }

export default NieuwSchermGebruiekrs