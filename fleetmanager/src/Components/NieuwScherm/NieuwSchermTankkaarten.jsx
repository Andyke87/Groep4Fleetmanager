import React from 'react'
import './NieuwScherm.css'
import '../Welkom/Welkom.css';
import '../Login/Login.css';
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';
import HomeButton from '../Buttons/HomeButton';
import VoertuigenButton from '../Buttons/VoertuigenButton';
import TankkaartenButton from '../Buttons/TankkaartenButton';
import BestuurdersButton from '../Buttons/BestuurdersButton';
import FormulierTankkaarten from '../Formulieren/FormulierTankkaarten';
import TableTankkaarten from '../Tables/TableTankkaarten';

export const NieuwSchermTankkaarten = () => {
  return (
    <div className='containerNieuwScherm'> 
    <div className='containerButtons'> 
    <BrightnessButton/>
    <HomeButton/>
    <LogoutButton/>
    </div>
    <div className='thirdScreenContainer'>
    <div className='buttonsThirdScreen'>
    <VoertuigenButton />
    <TankkaartenButton  />
    <BestuurdersButton   />
    </div>
    <TableTankkaarten/>
    <FormulierTankkaarten/>
    </div>
    </div>
  )
}
  