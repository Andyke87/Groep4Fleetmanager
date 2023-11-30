/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateDrivers } from '../../../../API/index';

const ButtonUpdateDriver = ({IdDriver, Name, Insert, FirstName, Street, Number, City, ZipCode, DayOfBirth, RegistryNumber, CategoryLicense}) => {

  const mutation = useMutation({
    mutationKey: ["updateDriver"],
    mutationFn: async (payload) => {
      return await updateDrivers(Id, payload);
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
    const confirmUpdate = window.confirm('Are you sure you want to update this driver?');

    if (confirmUpdate) {
      if (!IdDriver || !Name || !Insert || !FirstName || !Street || !Number || !City || !ZipCode || !DayOfBirth || !RegistryNumber || !CategoryLicense) {
        throw new Error("One or more fields are empty or contain invalid values");
      }
      // de datum moet nog geconverteerd worden naar het juiste format Date
      DayOfBirth = new Date(DayOfBirth);
      DayOfBirth = DayOfBirth.toISOString();
      DayOfBirth = DayOfBirth.slice(0, 10);
      console.log("DayOfBirth:", DayOfBirth);

      const setPayload = {
        idDriver: IdDriver,
        name: Name,
        insert: Insert,
        firstName: FirstName,
        street: Street,
        number: Number,
        city: City,
        zipCode: ZipCode,
        dayOfBirth: DayOfBirth,
        registryNumber: RegistryNumber,
        categoryLicense: CategoryLicense,
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
    alert("Driver updated successfully");
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
      Update driver
    </button>  )
}

export default ButtonUpdateDriver