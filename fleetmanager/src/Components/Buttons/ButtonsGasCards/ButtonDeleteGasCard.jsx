/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteGasCards } from '../../../../API'

export const ButtonDeleteGasCard = ({Id}) => {

const mutation = useMutation({
    mutationKey: ["deleteGasCard"],
    mutationFn: deleteGasCards,
    onSuccess: (data) => {
      console.log("Succesvolle delete", data);
      showSuccessMessage();
      refreshPage();
    },
    onError: (error) => {
      console.log("Er is een error", error);
    },
  });

  const handleDelete = async () => {

    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (confirmDelete) {
      try {
        await mutation.mutateAsync(Id);
      } catch (error) {
        console.error('Error during mutation:', error);
      }
    }
  };

  const showSuccessMessage = () => {
    alert("Gas card deleted successfully");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
        <button
            className='buttonsActions'
            type="button"
            onClick={handleDelete}
            title='Only Gas card id required'
            >
            Delete
        </button>
  )
}

export default ButtonDeleteGasCard
