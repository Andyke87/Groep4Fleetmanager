/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateConnections } from '../../../../API/index';

const ButtonUpdateConnection = ({ Id, IdDriver, IdGasCard, IdVehicle }) => {

  const mutation = useMutation({
    mutationKey: ["updateConnection"],
    mutationFn: async (payload) => {
      return await updateConnections(Id, payload);
    },
    onSuccess: (data) => {
      console.log("Succesvolle update", data);
    },
    onError: (error) => {
      console.log("Er is een error", error);
      showErrorMessage();
    },
  });

  const handleSubmit = async () => {
    // Voeg een bevestigingsvenster toe
    const confirmUpdate = window.confirm('Are you sure you want to update this relation?');

    if (confirmUpdate) {
      if (!IdDriver || !IdGasCard || !IdVehicle) {
        throw new Error("One or more fields are empty or contain invalid values");
      }

      const setPayload = {
        idDriver: IdDriver,
        idGasCard: IdGasCard,
        idVehicle: IdVehicle,
      };
      console.log("id:", Id);
      console.log("payload:", setPayload);

      try {
        const response = await mutation.mutateAsync(setPayload);

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
  const showSuccessMessage = () => {
    alert("Connection updated successfully");
  };
  const showErrorMessage = () => {
    alert("One or more fields are empty or contain values that are already used in the database");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <button
      className='buttonsActions'
      type="button"
      onClick={handleSubmit}
      title='All fields required'
    >
      Update relation
    </button>
  );
};

export default ButtonUpdateConnection;
