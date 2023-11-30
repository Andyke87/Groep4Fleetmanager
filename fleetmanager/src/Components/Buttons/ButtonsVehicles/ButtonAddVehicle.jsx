/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { postVehicles } from '../../../../API/index';

const ButtonAddVehicle = ({IdVehicle, Brand, Model, ChassisNumber, LicensePlate, Fuel, VehicleType, Color, NumberOfDoors}) => {

    const mutation = useMutation({
        mutationKey: ["createTodo"],
        mutationFn: postVehicles,
        onSuccess: (data) => {
            console.log("Succesvolle post", data);
        },
        onError: (error) => {
            console.log("Er is een error", error);
            showErrorMessage();
        },
    });
    const showSuccessMessage = () => {
        alert("The vehicle has been successfully added and is in the database!");
    };
    const showErrorMessage = () => {
        alert("One or more fields are empty or contains a value that is already used in the database");
    };   
    const refreshPage = () => {
        window.location.reload();
    };
    const handleSubmit = async () => {
        // Voeg een bevestigingsvenster toe
        const confirmSave = window.confirm('Are you sure you want to create this vehicle?');

        if (confirmSave) {
            if (!Brand || !Model || !ChassisNumber || !LicensePlate || !Fuel || !VehicleType || !Color || !NumberOfDoors) {
                throw new Error("One or more fields are empty or contain invalid values");
            }

            const payload = {
                brand: Brand,
                model: Model,
                chassisNumber: ChassisNumber,
                licensePlate: LicensePlate,
                fuel: Fuel,
                vehicleType: VehicleType,
                color: Color,
                numberOfDoors: NumberOfDoors,
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
        onClick={handleSubmit}
        type="button"
        title='Vehicle id forbidden'
    >
        Add vehicle
    </button>
  )
}

export default ButtonAddVehicle