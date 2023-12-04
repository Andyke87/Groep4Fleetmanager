/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateGasCards } from '../../../../API/index';

const ButtonUpdateGasCard = ({IdGasCard, CardNumber, ValidationDate, Pin, Fuel, Blocked}) => {

    const mutation = useMutation({
        mutationKey: ["updateGasCard"],
        mutationFn: async (payload) => {
            return await updateGasCards(IdGasCard, payload);
        },
        onSuccess: (data) => {
            console.log("Succesvolle update", data);
        },
        onError: (error) => {
            console.log("Er is een error", error);
            showErrorMessage();
        },
    });
    console.log("id:", IdGasCard);
    console.log("payload:", CardNumber, ValidationDate, Pin, Fuel, Blocked);

    const handleSubmit = async () => {
        // Voeg een bevestigingsvenster toe
        const confirmUpdate = window.confirm('Are you sure you want to update this gas card?');

        if (confirmUpdate) {

            const setPayload = {
                cardNumber: CardNumber,
                validationDate: ValidationDate,
                pin: Pin,
                fuel: Fuel,
                blocked: Blocked,
            };
            console.log("id:", IdGasCard);
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
        alert("Gas card updated successfully");
    };
    const showErrorMessage = () => {
        alert("Gas card not updated");
    };
    const refreshPage = () => {
        window.location.reload();
    };

  return (
    <button
      className='buttonsActions'
      type="button"
      onClick={handleSubmit}
      title='Gas card id required'
    >
      Update gas card
    </button>
  )
}

export default ButtonUpdateGasCard