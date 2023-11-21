/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BrightnessButton from '../Buttons/BrightnessButton';
import LogoutButton from '../Buttons/LogoutButton';
import HomeButton from '../Buttons/HomeButton';
import TankkaartenButton from '../Buttons/TankkaartenButton';
import BestuurdersButton from '../Buttons/BestuurdersButton';
import VoertuigenButton from '../Buttons/VoertuigenButton';
import DropdownBestuurders from './DropdownBestuurders';
import DropdownVoertuigen from './DropdownVoertuigen';
import DropdownTankkaarten from './DropdownTankkaarten';
import ButtonOpslaan from '../Buttons/ButtonOpslaan';
import ButtonAnnuleren from '../Buttons/ButtonAnnuleren';
import { useMutation } from "@tanstack/react-query";
import { postConnections } from '../../../API';
import './Relaties.css';


// Refresh de pagina
const refreshPage = () => {
  window.location.reload();
};
const showSuccessMessage = () => {
  alert("De relaties zijn succesvol toegevoegd en de connectie zit in de databank!");
};

const Relaties = () => {

  // Mutatie voor het posten van de relaties
  const mutation = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: postConnections,
    onSuccess: (data) => {
      console.log("Succesvolle post", data);
    },
    onError: (error) => {
      console.log("Er is een error", error);
    },
  });

  // State voor de dropdowns
  const [selectedIdDriver, setSelectedIdDriver] = useState(0);
  const [selectedIdGasCard, setSelectedIdGasCard] = useState(0);
  const [selectedIdVehicle, setSelectedIdVehicle] = useState(0);

  // Functie om de relaties te posten
  const handleSubmit = () => {

    console.log("selectedIdDriver", selectedIdDriver);
    console.log("selectedIdGasCard", selectedIdGasCard);
    console.log("selectedIdVehicle", selectedIdVehicle);

    // Controleer of alle velden zijn ingevuld
    if (!selectedIdDriver || !selectedIdGasCard || !selectedIdVehicle) {
      throw new Error("Een of meer velden zijn leeg of bevatten ongeldige waarden");
    }
    // Maak het payload
    const payload = {
      idDriver: selectedIdDriver,
      idGasCard: selectedIdGasCard,
      idVehicle: selectedIdVehicle,
    };

    // Voer de mutatie uit
    mutation.mutate(payload);
    // geeft een pop-up als de relaties succesvol zijn toegevoegd 
    // en de result is opgeslagen in de database

      showSuccessMessage();
      refreshPage();
    
  };
      // bij annuleren naar veld /NieuwSchermRelaties
    const annulerenSubmit = () => {
      window.location.href = '/NieuwSchermRelaties';
    };

  return (
    <div className='containerBackground'>
      <div className='containerRelaties'>
        <div className='containerButtons'>
          <BrightnessButton />
          <HomeButton />
          <LogoutButton />
        </div>
        <div className='containerRelatieScreen'>
          <div className='gridContainer'>
            <div className='gridItem'>
              <BestuurdersButton />
              <DropdownBestuurders
              selectedId={selectedIdDriver}
              setSelectedIdDriver={setSelectedIdDriver}/>
            </div>
            <div className='gridItem'>
              <TankkaartenButton />
              <DropdownTankkaarten
              selectedIdGasCard={selectedIdGasCard}
              setSelectedIdGasCard={setSelectedIdGasCard}/>
            </div>
            <div className='gridItem'>
              <VoertuigenButton />
              <DropdownVoertuigen
                selectedId={selectedIdVehicle}
                setSelectedIdVehicle={setSelectedIdVehicle}/>
            </div>
          </div>
          <div className='buttonsOnderaan'>
            <ButtonOpslaan
              onClick={handleSubmit}>
              Opslaan
            </ButtonOpslaan>
            <ButtonAnnuleren 
              onClick={annulerenSubmit}>
              Annuleren
            </ButtonAnnuleren>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relaties;
