/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonDeleteDriver from '../Buttons/ButtonsDrivers/ButtonDeleteDriver';
import ButtonUpdateDriver from '../Buttons/ButtonsDrivers/ButtonUpdateDriver';
import ButtonAddDriver from '../Buttons/ButtonsDrivers/ButtonAddDriver';
import { getDrivers } from '../../../API/index';

const FormulierBestuurders = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [idDriver, setIdDriver] = useState('');
  const [name, setName] = useState('');
  const [insert, setInsert] = useState('');
  const [firstName, setFirstName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [dayOfBirth, setDayOfBirth] = useState('');
  const [registryNumber, setRegistryNumber] = useState('');
  const [categoryLicense, setCategoryLicense] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDrivers();
        const sortedDrivers = response.data.sort((a, b) => a.id - b.id);
        setDrivers(sortedDrivers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'idDriver': setIdDriver(value); break;
      case 'name': setName(value); break;
      case 'insert': setInsert(value); break;
      case 'firstName': setFirstName(value); break;
      case 'street': setStreet(value); break;
      case 'number': setNumber(value); break;
      case 'city': setCity(value); break;
      case 'zipCode': setZipCode(value); break;
      case 'dayOfBirth': setDayOfBirth(value); break;
      case 'registryNumber': setRegistryNumber(value); break;
      case 'categoryLicense': setCategoryLicense(value); break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    // Voeg hier eventueel logica toe om met het formulier te werken
    event.preventDefault();
    console.log('Formulier ingediend:', { idDriver, name, insert, firstName, street, number, city, zipCode, dayOfBirth, registryNumber, categoryLicense });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('nl-NL', options);
  };

  const handleRowClick = (selectedRow) => {
    setSelectedRow(selectedRow);
    setIdDriver(selectedRow.idDriver);
    setName(selectedRow.name);
    setInsert(selectedRow.insert);
    setFirstName(selectedRow.firstName);
    setStreet(selectedRow.street);
    setNumber(selectedRow.number);
    setCity(selectedRow.city);
    setZipCode(selectedRow.zipCode);
    setDayOfBirth(selectedRow.dayOfBirth);
    setRegistryNumber(selectedRow.registryNumber);
    setCategoryLicense(selectedRow.categoryLicense);
  };

  return (
    <form onSubmit={handleSubmit}>
      <table >
        <thead>
          <tr >
            <th className='thDriver'>IdDriver</th>
            <th className='thDriver'>Name</th>
            <th className='thDriver'>Insert</th>
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
          <tr key={driver.idDriver}  onClick={() => handleRowClick(driver)}>
            <td>{driver.idDriver}</td>
            <td>{driver.name}</td>
            <td>{driver.insert}</td>
            <td>{driver.firstName}</td>
            <td>{driver.street}</td>
            <td>{driver.number}</td>
            <td>{driver.city}</td>
            <td>{driver.zipCode}</td>
            <td>{formatDate(driver.dayOfBirth)}</td>
            <td>{driver.registryNumber}</td>
            <td>{driver.categoryLicense}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <div className="col">
          <label htmlFor="idDriver">Driver ID</label>
          <input
            className="input"
            type="text"
            name="idDriver"
            value={idDriver}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            name="Name"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="insert">Insert</label>
          <input
            className="input"
            type="text"
            name="insert"
            value={insert}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="firstName">FirstName</label>
          <input
            className="input"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="street">Street</label>
          <input
            className="input"
            type="text"
            name="street"
            value={street}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="number">Number</label>
          <input
            className="input"
            type="text"
            name="number"
            value={number}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="city">City</label>
          <input
            className="input"
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="zipcode">Zipcode</label>
          <input
            className="input"
            type="text"
            name="zipcode"
            value={zipCode}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="dayOfBirth">Day Of Birth</label>
          <input
            className="input"
            type="date"
            name="dayOfBirth"
            value={dayOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="registryNumber">Registry Number</label>
          <input
            className="input"
            type="text"
            name="registryNumber"
            value={registryNumber}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="categoryLicense">Category License</label>
          <input
            className="input"
            type="text"
            name="categoryLicense"
            value={categoryLicense}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='containerButtonsNieuw'>
        <ButtonAddDriver
        
        />
        <ButtonUpdateDriver
        
        />
        <ButtonDeleteDriver Id={idDriver} buttonText="Delete"/>
        </div>
    </form>
  );
};
export default FormulierBestuurders;

