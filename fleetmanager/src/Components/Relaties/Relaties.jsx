// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
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
import ButtonOpslaan from '../Buttons/ButtonOpslaan'
import ButtonAnnuleren from '../Buttons/ButtonAnnuleren'
import axios from 'axios'


const Relaties = () => {
  const [gasCards, setGasCards] = React.useState([]);
  const [drivers, setDrivers] = React.useState([]);
  const [vehicles, setVehicles] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5043/Connection/AllConnections');
        setGasCards(response.data.gasCards);
        setDrivers(response.data.drivers);
        setVehicles(response.data.vehicles);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
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
          <DropdownTankkaarten gasCards={gasCards}/>
          <p>Kaartnummer</p>
          <TextField/>
          <p>GeldigheidsDatum</p>
          <TextField/>
        </div>
        <div className='gridItem'>
          <BestuurdersButton/>
          <DropdownBestuurders drivers={drivers}/>
          <p>Voornaam</p>
          <TextField/>
          <p>Achternaam</p>
          <TextField/>
        </div>
        <div className='gridItem'>
          <VoertuigenButton/>
          
          <DropdownVoertuigen vehicles={vehicles}/>
          <p>Merk</p>
          <TextField />
          <p>Nummerplaat</p>
          <TextField />
        </div>

      </div>
      <div className='buttonsOnderaan'>
      <ButtonOpslaan/>
      <ButtonAnnuleren/>
      </div>
    </div>
  </div>
</div>
    )
  }

  export default Relaties