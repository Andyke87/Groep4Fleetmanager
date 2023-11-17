/* eslint-disable no-unused-vars */
import React from 'react'
import './NieuwScherm.css'
import '../Welkom/Welkom.css';
import '../Login/Login.css';
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';
import HomeButton from '../Buttons/HomeButton';
import ConnectiesButton from '../Buttons/ConnectiesButton';
import VoertuigenButton from '../Buttons/VoertuigenButton';
import TankkaartenButton from '../Buttons/TankkaartenButton';
import BestuurdersButton from '../Buttons/BestuurdersButton';
import TableBestuurders from '../Tables/TableBestuurders';
import FormulierBestuurders from '../Formulieren/FormulierBestuurders';

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
            <VoertuigenButton/>
            <TankkaartenButton/>
            <BestuurdersButton/>
            <ConnectiesButton/>
           </div>
          <TableBestuurders/>
          <FormulierBestuurders/>
          </div>
        </div>
      )
    }

export default NieuwSchermBestuurders