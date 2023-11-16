// eslint-disable-next-line no-unused-vars
import React from 'react'
import { getDrivers } from '../../../API';
import { useEffect, useState } from 'react';

const DropdownBestuurders = () => {
const [drivers, setDrivers] = useState([]);

useEffect(() => {
  // Fetch drivers from the backend API
  getDrivers().then(response => {
    const IdDriver = response.data.map(driver => driver);
    setDrivers(IdDriver);
  }, []);
  });

  return (
    <select className="dropDown">
      {drivers.map(driver => (
        <option key={driver.IdDriver} value={driver.IdDriver}>
          Driver
        </option>
      ))}
    </select>
  )
}

export default DropdownBestuurders