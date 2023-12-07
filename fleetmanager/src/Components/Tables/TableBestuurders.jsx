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
    <table >
      <thead>
        <tr >
          <th className='thDriver'>IdDriver</th>
          <th className='thDriver'>Name</th>
          <th className='thDriver'>Inserts</th>
          <th className='thDriver'>Firstname</th>
          <th className='thDriver'>Street</th>
          <th className='thDriver'>Number</th>
          <th className='thDriver'>City</th>
          <th className='thDriver'>ZipCode</th>
          <th className='thDriver'>DayOfBirth</th>
          <th className='thDriver'>RegistryNumber</th>
          <th className='thDriver'>CategoryLicense</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map(driver => (
        <tr key={driver.idDriver}>
          <td>{driver.idDriver}</td>
          <td>{driver.name}</td>
          <td>{driver.inserts}</td>
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