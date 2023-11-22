/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import { getDrivers } from '../../../API';

const TableBestuurders = () => {
  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDrivers();
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // Functie om een datum in jouw gewenste formaat om te zetten
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('nl-NL', options);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>IdDriver</th>
          <th>Name</th>
          <th>Insert</th>
          <th>Firstname</th>
          <th>Street</th>
          <th>Number</th>
          <th>City</th>
          <th>ZipCode</th>
          <th>DayOfBirth</th>
          <th>RegistryNumber</th>
          <th>CategoryLicense</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map(driver => (
        <tr key={driver.idDriver}>
          <td>{driver.idDriver}</td>
          <td>{driver.name}</td>
          <td>{driver.insert}</td>
          <td>{driver.firstName}</td>
          <td>{driver.street}</td>
          <td>{driver.number}</td>
          <td>{driver.city}</td>
          <td>{driver.zipcode}</td>
          <td>{formatDate(driver.dayOfBirth)}</td>
          <td>{driver.registryNumber}</td>
          <td>{driver.categoryLicense}</td>
        </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBestuurders;