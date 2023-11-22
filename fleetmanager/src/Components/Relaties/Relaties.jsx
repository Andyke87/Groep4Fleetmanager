/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BrightnessButton from '../Buttons/BrightnessButton';
import LogoutButton from '../Buttons/LogoutButton';
import HomeButton from '../Buttons/HomeButton';
import TankkaartenButton from '../Buttons/ButtonsNavigation/TankkaartenButton';
import BestuurdersButton from '../Buttons/ButtonsNavigation/BestuurdersButton';
import VoertuigenButton from '../Buttons/ButtonsNavigation/VoertuigenButton';
import DropdownBestuurders from './DropdownBestuurders';
import DropdownVoertuigen from './DropdownVoertuigen';
import DropdownTankkaarten from './DropdownTankkaarten';
import ButtonAdd from '../Buttons/ButtonAdd';
import ButtonDelete from '../Buttons/ButtonDelete';
import { useMutation } from "@tanstack/react-query";
import { postConnections } from '../../../API';
import './Relaties.css';

const Relaties = () => {
  const mutation = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: postConnections,
    onSuccess: (data) => {
      console.log("Succesvolle post", data);
    },
    onError: (error) => {
      console.log("Er is een error", error);
      showErrorMessage();
    },
  });

  const [selectedIdDriver, setSelectedIdDriver] = useState(0);
  const [selectedIdGasCard, setSelectedIdGasCard] = useState(0);
  const [selectedIdVehicle, setSelectedIdVehicle] = useState(0);

  const showSuccessMessage = () => {
    alert("The relationships have been successfully added and the connection is in the database!");
  };

  const showErrorMessage = () => {
    alert("One or more fields are empty or contains a value that is already used in the database");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async () => {
    // Voeg een bevestigingsvenster toe
    const confirmSave = window.confirm('Weet je zeker dat je wilt opslaan?');

    if (confirmSave) {
      if (!selectedIdDriver || !selectedIdGasCard || !selectedIdVehicle) {
        throw new Error("One or more fields are empty or contain invalid values");
      }

      const payload = {
        idDriver: selectedIdDriver,
        idGasCard: selectedIdGasCard,
        idVehicle: selectedIdVehicle,
      };

      try {
        const response = await mutation.mutateAsync(payload);

        // Als ik statuscode 200 krijg, dan laat ik een alert zien en refresh ik de pagina
        if (response.status === 200) {
          showSuccessMessage();
          refreshPage();
        }

      } catch (error) {
        console.error("Error during mutation:", error);
      }
    }
  };

  const cancelSubmit = () => {
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
            <ButtonAdd onClick={handleSubmit} buttonText="Add"/>
            <ButtonDelete onClick={cancelSubmit} buttonText="Go back"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relaties;
