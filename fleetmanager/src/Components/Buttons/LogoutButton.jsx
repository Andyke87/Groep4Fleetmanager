/* eslint-disable no-unused-vars */
import React from 'react';

const handleLogout = () => {
  // Verwijder de gegevens van de ingelogde gebruiker uit localStorage
  localStorage.removeItem('authenticatedUser');
  
  // Redirect naar de hoofdpagina
  window.location.href = '/';
}

const LogoutButton = () => {
  return (
    <div>
      <button className='logOutButton' onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default LogoutButton;
