/* eslint-disable no-unused-vars */
import React from 'react'
import './NieuwScherm.css'
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';
import HomeButton from '../Buttons/HomeButton';
import VoertuigenButton from '../Buttons/ButtonsNavigation/VoertuigenButton';
import TankkaartenButton from '../Buttons/ButtonsNavigation/TankkaartenButton';
import BestuurdersButton from '../Buttons/ButtonsNavigation/BestuurdersButton';
import FormulierBestuurders from '../Formulieren/FormulierBestuurders';
import ButtonRelaties from '../Buttons/ButtonsNavigation/ButtonRelations';

const NieuwSchermBestuurders = () => {
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
           </div>
          <FormulierBestuurders/>
          </div>
        </div>
      )
    }
export default NieuwSchermBestuurders