/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { postUsers } from '../../../../API/index';


const ButtonAddUser = ({Id, Name, FirstName, Email, Password, Role }) => {

  const mutation = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: postUsers,
    onSuccess: (data) => {
      console.log("Succesvolle post", data);
    },
    onError: (error) => {
      console.log("Er is een error", error);
      showErrorMessage();
    },
  });
  const showSuccessMessage = () => {
    alert("The user has been successfully added into the database!");
  };
  const showErrorMessage = () => {
    alert("One or more fields are empty or contains a value that is already used in the database");
  };
  const refreshPage = () => {
    window.location.reload();
  };
  const handleSubmit = async () => {
    // Voeg een bevestigingsvenster toe
    const confirmSave = window.confirm('Are you sure you want to create this user?');

    if (confirmSave) {
      if (!Id || !Name || !FirstName || !Email || !Password || !Role) {
        throw new Error("One or more fields are empty or contain invalid values");
      }
      
      const payload = {
        idUser: Id,
        name: Name,
        firstName: FirstName,
        email: Email,
        password: Password,
        role: Role,
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
        title='User id forbidden'
      >Add user</button>
  )
}

export default ButtonAddUser