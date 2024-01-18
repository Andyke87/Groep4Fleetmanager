/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteDrivers } from '../../../../API'

const ButtonDeleteDriver = ({Id}) => {

  const mutation = useMutation({
    mutationKey: ["deleteDriver"],
    mutationFn: deleteDrivers,
    onSuccess: (data) => {
      console.log("Succesvolle delete", data);
      showSuccessMessage();
      refreshPage();
    },
    onError: (error) => {
      console.log("Er is een error", error);
      showFailMessage();
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
    alert("Driver deleted successfully");
  };

  const showFailMessage = () => {
    alert("Driver not deleted");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
        <button
      className='buttonsActions'
      type="button"
      onClick={handleDelete}
      title='Only Driver id required'
    >
      Delete
    </button>
  )
}

export default ButtonDeleteDriver