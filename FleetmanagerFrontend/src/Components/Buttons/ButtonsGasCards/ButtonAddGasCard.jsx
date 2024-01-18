/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useMutation } from "@tanstack/react-query";
import { postGasCards } from '../../../../API/index';

const ButtonAddGasCard = ({CardNumber, ValidationDate, Pin, Fuel, BlockedCard}) => {

    const mutation = useMutation({
        mutationKey: ["createTodo"],
        mutationFn: postGasCards,
        onSuccess: (data) => {
            console.log("Succesvolle post", data);
        },
        onError: (error) => {
            console.log("Er is een error", error);
            showErrorMessage();
        },
    });
    console.log("Addpayload:", CardNumber, ValidationDate, Pin, Fuel, BlockedCard);
    const showSuccessMessage = () => {
        alert("Gas card added successfully");
    };
    const showErrorMessage = () => {
        alert("One or more fields are empty or contains a value that is already used in the database");
    };
    const refreshPage = () => {
        window.location.reload();
    };
    const handleSubmit = async () => {
        // Voeg een bevestigingsvenster toe
        const confirmSave = window.confirm('Are you sure you want to create this gas card?');

        if (confirmSave) {
            const setPayload = {
                cardNumber: CardNumber,
                validationDate: ValidationDate,
                pin: Pin,
                fuel: Fuel,
                blockedCard: BlockedCard,
            };
            console.log("set payload:", setPayload);
            try {
                const response = await mutation.mutateAsync(setPayload);

                if (response.status === 200) {
                    showSuccessMessage();
                    refreshPage();
                }
            } catch (error) {
                console.error('Error while posting data:', error);
            }
        }
    }
  return (
      <button
        className='buttonsActions'
        type="button"
        onClick={handleSubmit}
        title='Gas card id forbidden'
      >Add gas card</button>  )
}

export default ButtonAddGasCard