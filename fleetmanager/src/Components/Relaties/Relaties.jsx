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

const Relaties = () => {
  const mutation = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: postConnections,
    onSuccess: (data) => {
      console.log("Succesvolle post", data);
      showSuccessMessage();
      refreshPage();
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
    } 
    catch (error) {
      console.error("Error during mutation:", error);
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
            <ButtonOpslaan
              onClick={handleSubmit}>
              Opslaan
            </ButtonOpslaan>
            <ButtonAnnuleren 
              onClick={cancelSubmit}>
              Annuleren
            </ButtonAnnuleren>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relaties;
