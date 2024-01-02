/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteUsers } from '../../../../API'

const ButtonDeleteUser = ({Id}) => {

  const mutation = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUsers,
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
        console.log(Id);
      } catch (error) {
        console.error('Error during mutation:', error);
      }
    }
  };

  const showSuccessMessage = () => {
    alert("User deleted successfully");
  };

  const showFailMessage = () => {
    alert("User not deleted");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
        <button
      className='buttonsActions'
      type="button"
      onClick={handleDelete}
      title='Only User id required'
    >
      Delete User
    </button>
  )
}

export default ButtonDeleteUser