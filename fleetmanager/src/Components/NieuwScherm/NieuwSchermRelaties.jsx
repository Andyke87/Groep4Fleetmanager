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
import ButtonRelation from '../Buttons/ButtonsNavigation/ButtonRelations';
import FormulierenRelaties from '../Formulieren/FormulierRelaties';


const NieuwSchermRelaties = () => {
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <ButtonRelation/>
           </div>
          <FormulierenRelaties searchTerm={searchTerm}/>
          </div>
        </div>
  )
}

export default NieuwSchermRelaties