import React from 'react'
import BrightnessButton from '../Buttons/BrightnessButton'
import LogoutButton from '../Buttons/LogoutButton'
import HomeButton from '../Buttons/HomeButton'
import './Relaties.css'
import TankkaartenButton from '../Buttons/TankkaartenButton'
import BestuurdersButton from '../Buttons/BestuurdersButton'
import VoertuigenButton from '../Buttons/VoertuigenButton'
import TextField from './TextField'
import DropdownBestuurders from './DropdownBestuurders'
import DropdownVoertuigen from './DropdownVoertuigen'
import DropdownTankkaarten from './DropdownTankkaarten'

  const Relaties = () => {
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
          <DropdownTankkaarten/>
          <TextField/>
          <TextField/>
        </div>
        <div className='gridItem'>
          <BestuurdersButton/>
          <DropdownBestuurders/>
          <TextField/>
          <TextField/>
        </div>
        <div className='gridItem'>
          <VoertuigenButton/>
          <DropdownVoertuigen/>
          <TextField />
          <TextField />
        </div>
      </div>
    </div>
  </div>
</div>
    )
  }
  
  export default Relaties