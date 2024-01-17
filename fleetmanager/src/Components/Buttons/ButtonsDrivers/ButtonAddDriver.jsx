/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { postDrivers } from '../../../../API/index';

const ButtonAddDriver = ({Name, FirstName, Street, Number, City, ZipCode, DayOfBirth, RegistryNumber, CategoryLicense}) => {

  const mutation = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: postDrivers,
    onSuccess: (data) => {
      console.log("Succesvolle post", data);
    },
    onError: (error) => {
      console.log("Er is een error", error);
      showErrorMessage();
    },
  });
  const showSuccessMessage = () => {
    alert("The driver has been successfully added into the database!");
  };
  const showErrorMessage = () => {
    alert("One or more fields are empty or contains a value that is already used in the database");
  };
  const refreshPage = () => {
    window.location.reload();
  };
  const handleSubmit = async () => {
    // Voeg een bevestigingsvenster toe
    const confirmSave = window.confirm('Are you sure you want to create this driver?');

    if (confirmSave) {
      if (!Name || !FirstName || !Street || !Number || !City || !ZipCode || !DayOfBirth || !RegistryNumber || !CategoryLicense) {
        throw new Error("One or more fields are empty or contain invalid values");
      }
        // de datum moet nog geconverteerd worden naar het juiste format Date
        DayOfBirth = new Date(DayOfBirth);
        DayOfBirth = DayOfBirth.toISOString();
        DayOfBirth = DayOfBirth.slice(0, 10);

      const payload = {
        name: Name,
        firstName: FirstName,
        street: Street,
        number: Number,
        city: City,
        zipCode: ZipCode,
        dayOfBirth: DayOfBirth,
        registryNumber: RegistryNumber,
        categoryLicense: CategoryLicense,
      };


      try {
        const response = await mutation.mutateAsync(payload);
      console.log("payload:", payload);
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
        title='Driver id forbidden'
      >Add driver</button>
  )
}

export default ButtonAddDriver