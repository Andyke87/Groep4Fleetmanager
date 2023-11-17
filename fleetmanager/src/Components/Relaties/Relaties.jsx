// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import BrightnessButton from '../Buttons/BrightnessButton'
import LogoutButton from '../Buttons/LogoutButton'
import HomeButton from '../Buttons/HomeButton'
import TankkaartenButton from '../Buttons/TankkaartenButton'
import BestuurdersButton from '../Buttons/BestuurdersButton'
import VoertuigenButton from '../Buttons/VoertuigenButton'
import DropdownBestuurders from './DropdownBestuurders'
import DropdownVoertuigen from './DropdownVoertuigen'
import DropdownTankkaarten from './DropdownTankkaarten'
import ButtonOpslaan from '../Buttons/ButtonOpslaan'
import ButtonAnnuleren from '../Buttons/ButtonAnnuleren'
import './Relaties.css'

const Relaties = () => {
  const [ setSelectedTankkaartId] = useState('');
  const [ setSelectedBestuurderId] = useState('');
  const [setSelectedVoertuigId] = useState('');

  return (
    <div className='containerBackground'>
      <div className='containerRelaties'> 
        <div className='containerButtons'> 
          <BrightnessButton/>
          <HomeButton/>
          <LogoutButton/>
        </div>
        <div className='containerRelatieScreen'>
          <div className='gridContainer'>
            <div className='gridItem'>
              <TankkaartenButton/>
              <DropdownTankkaarten onChange={(id) => setSelectedTankkaartId(id)} />
            </div>
            <div className='gridItem'>
              <BestuurdersButton/>
              <DropdownBestuurders onChange={(id) => setSelectedBestuurderId(id)} />
            </div>
            <div className='gridItem'>
              <VoertuigenButton/>
              <DropdownVoertuigen onChange={(id) => setSelectedVoertuigId(id)} />
            </div>
          </div>
          <div className='buttonsOnderaan'>
            <ButtonOpslaan/>
            <ButtonAnnuleren/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relaties;
