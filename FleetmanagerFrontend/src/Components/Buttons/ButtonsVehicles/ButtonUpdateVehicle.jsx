/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useMutation } from "@tanstack/react-query";
import Axios from 'axios';
import {updateVehicles} from '../../../../API/index';

const ButtonUpdateVehicle = ({IdVehicle, Brand, Model, ChassisNumber, LicensePlate, Fuel, VehicleType, Color, NumberOfDoors}) => {

    const mutation = useMutation({
        mutationKey: ["updateVehicle"],
        mutationFn: async (payload) => {
            return await updateVehicles(IdVehicle, payload);
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
        const confirmUpdate = window.confirm('Are you sure you want to update this vehicle?');

        if (confirmUpdate) {
            if (!Brand || !Model || !ChassisNumber || !LicensePlate || !Fuel || !VehicleType || !Color) {
                throw new Error("One or more fields are empty or contain invalid values");
            }

            const setPayload = {
                brand: Brand,
                model: Model,
                chassisNumber: ChassisNumber,
                licensePlate: LicensePlate,
                fuel: Fuel,
                vehicleType: VehicleType,
                color: Color,
                numberOfDoors: NumberOfDoors,
            };

            console.log("id:", IdVehicle);
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
        alert("Vehicle updated successfully");
    }
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
        title='Vehicle id Required'
        >
        Update vehicle
        </button>
    );
}

export default ButtonUpdateVehicle