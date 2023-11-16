// eslint-disable-next-line no-unused-vars
import React from 'react'
import { getVehicles } from '../../../API';
import { useEffect, useState } from 'react';

export const DropdownVoertuigen = () => {
const [vehicles, setVehicles] = useState([]);

useEffect(() => {
  // Fetch vehicles from the backend API
  getVehicles().then(response => {
    const IdVehicle = response.data.map(vehicle => vehicle);
    setVehicles(IdVehicle);
  }, []);
  });

  return (
    <select className="dropDown">
      {vehicles.map(vehicle => (
        <option key={vehicle.IdVehicle} value={vehicle.IdVehicle}>
          Vehicle 
        </option>
      ))}
    </select>
  );
};
export default DropdownVoertuigen