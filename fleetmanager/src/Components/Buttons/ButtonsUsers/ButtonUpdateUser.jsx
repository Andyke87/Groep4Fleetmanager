/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateUsers } from '../../../../API/index';

const ButtonUpdateUser = ({IdUser, Name, FirstName, Email, Password, Role}) => {

  const mutation = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (payload) => {
      return await updateUsers(IdUser, payload);
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
    const confirmUpdate = window.confirm('Are you sure you want to update this user?');

    if (confirmUpdate) {
        const setPayload = {
            idUser: IdUser,
            name: Name,
            firstName: FirstName,
            email: Email,
            password: Password,
            role: Role,
        };
        try {
          const response = await mutation.mutateAsync(setPayload);

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
    alert("User updated successfully");
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
      Update user
    </button>  )
}

export default ButtonUpdateUser