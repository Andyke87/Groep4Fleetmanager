/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { postConnections } from '../../../../API/index';

const ButtonAddRelation = ({IdDriver, IdGasCard, IdVehicle}) => {

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

  const showSuccessMessage = () => {
    alert("The relationships have been successfully added into the database!");
  };

  const showErrorMessage = () => {
    alert("One or more fields are empty or contains a value that is already used in the database");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async () => {
    // Voeg een bevestigingsvenster toe
    const confirmSave = window.confirm('Are you sure you want to create this relationships?');

    if (confirmSave) {
      if (!IdDriver || !IdGasCard || !IdVehicle) {
        throw new Error("One or more fields are empty or contain invalid values");
      }

      const payload = {
        idDriver: IdDriver,
        idGasCard: IdGasCard,
        idVehicle: IdVehicle,
      };
      console.log("payload:", payload);

      try {
        const response = await mutation.mutateAsync(payload);

        if (response.status === 200) {
        showSuccessMessage();
        refreshPage();
      }
    } catch (error) {
      console.error('Error while posting data:', error);
    }
  }
};

  return (
      <button
        className='buttonsActions'
        type="button"
        onClick={handleSubmit}
        title='Relation id forbidden'
      >Add relation</button>
  )
}

export default ButtonAddRelation