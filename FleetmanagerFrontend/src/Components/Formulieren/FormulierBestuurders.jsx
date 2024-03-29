/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ButtonDeleteDriver from '../Buttons/ButtonsDrivers/ButtonDeleteDriver';
import ButtonUpdateDriver from '../Buttons/ButtonsDrivers/ButtonUpdateDriver';
import ButtonAddDriver from '../Buttons/ButtonsDrivers/ButtonAddDriver';
import ButtonClearInput from '../Buttons/ButtonClearInput';
import { getDrivers } from '../../../API/index';

const FormulierBestuurders = ({searchTerm}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [idDriver, setIdDriver] = useState('');
  const [name, setName] = useState('');
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
    event.preventDefault();
    console.log('Formulier ingediend:', { idDriver, name, firstName, street, number, city, zipCode, dayOfBirth, registryNumber, categoryLicense });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('nl-NL', options);
  };

  const handleRowClick = (selectedRow) => {
    setSelectedRow(selectedRow);
    setIdDriver(selectedRow.idDriver);
    setName(selectedRow.name);
    setFirstName(selectedRow.firstName);
    setStreet(selectedRow.street);
    setNumber(selectedRow.number);
    setCity(selectedRow.city);
    setZipCode(selectedRow.zipCode);
    setDayOfBirth(selectedRow.dayOfBirth);
    setRegistryNumber(selectedRow.registryNumber);
    setCategoryLicense(selectedRow.categoryLicense);
  };

  const filteredDrivers = drivers.filter((driver) => {
    if (searchTerm === '') {
      return driver;
    } else if (driver.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return driver;
    }
    return null;
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="table-container">
        <table >
          <thead>
            <tr >
              <th className='id'>Driver Id</th>
              <th>First Name</th>
              <th>Name</th>
              <th>Street</th>
              <th>Number</th>
              <th>City</th>
              <th>Zip Code</th>
              <th>Day Of Birth</th>
              <th>Registry Number</th>
              <th>License</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map(driver => (
              <tr
                key={driver.idDriver}
                onClick={() => handleRowClick(driver)}
                className={selectedRow && selectedRow.idDriver === driver.idDriver ? 'selected-row' : ''}
              >
                <td className='id'>{driver.idDriver}</td>
                <td>{driver.firstName}</td>
                <td>{driver.name}</td>
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
      </div>
      <div className="form-container">
        <div className="col">
          <label htmlFor="idDriver">Driver Id</label>
          <input
            className="input"
            type="text"
            name="idDriver"
            value={idDriver}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="firstName">First Name</label>
          <input
            className="input"
            placeholder='Max 50 characters'
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="name">Name</label>
          <input
            className="input"
            placeholder='Max 50 characters'
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="street">Street</label>
          <input
            className="input"
            placeholder='Max 50 characters'
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
            placeholder='Max 10 characters'
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
            placeholder='Max 50 characters'
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="zipcode">Zip Code</label>
          <input
            className="input"
            placeholder='Only numbers'
            type="text"
            name="zipCode"
            value={zipCode}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="dayOfBirth">Day Of Birth</label>
          {selectedRow ? (
            <input
              className="input"
              type="text"
              name="dayOfBirth"
              value={formatDate(dayOfBirth)}
              onChange={handleChange}
            />
          ) : (
            <input
              className="input"
              type="date"
              name="dayOfBirth"
              value={dayOfBirth}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="col">
          <label htmlFor="registryNumber">Registry Number</label>
          <input
            className="input"
            placeholder='Max 12 characters'
            type="text"
            name="registryNumber"
            value={registryNumber}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="categoryLicense">License</label>
          <select
            className="input"
            type="text"
            name="categoryLicense"
            value={categoryLicense}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="AM">AM</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="BE">BE</option>
            <option value="C">C</option>
            <option value="CE">CE</option>
            <option value="D">D</option>
            <option value="DE">DE</option>
          </select>
        </div>
      </div>
      <div className='containerButtonsNieuw'>
        <ButtonAddDriver
          Name={name}
          FirstName={firstName}
          Street={street}
          Number={number}
          City={city}
          ZipCode={zipCode}
          DayOfBirth={dayOfBirth}
          RegistryNumber={registryNumber}
          CategoryLicense={categoryLicense}
        />
        <ButtonUpdateDriver
          IdDriver={idDriver}
          Name={name}
          FirstName={firstName}
          Street={street}
          Number={number}
          City={city}
          ZipCode={zipCode}
          DayOfBirth={dayOfBirth}
          RegistryNumber={registryNumber}
          CategoryLicense={categoryLicense}
        />
        <ButtonDeleteDriver Id={idDriver} buttonText="Delete"/>
        </div>
        <div>
          <ButtonClearInput/>
        </div>
    </form>
  );
};
export default FormulierBestuurders;

