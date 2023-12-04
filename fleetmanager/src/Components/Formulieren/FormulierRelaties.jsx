/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonNewRelation from '../Buttons/ButtonsRelations/ButtonAddRelation';
import ButtonUpdateRelation from '../Buttons/ButtonsRelations/ButtonUpdateRelation';
import ButtonDeleteRelation from '../Buttons/ButtonsRelations/ButtonDeleteRelation';
import ButtonClearInput from '../Buttons/ButtonClearInput';
import { getConnections, getDrivers, getGasCards, getVehicles } from '../../../API/index';

const FormulierenRelaties = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [connections, setConnections] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [gasCards, setGasCards] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [Id, setId] = useState('');
  const [IdDriver, setIdDriver] = useState('');
  const [IdGasCard, setIdGasCard] = useState('');
  const [IdVehicle, setIdVehicle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConnections();
        const sortedConnections = response.data.sort((a, b) => a.id - b.id);
        setConnections(sortedConnections);

        const responseDrivers = await getDrivers(IdDriver);
        const sortedDrivers = responseDrivers.data.sort((a, b) => a.id - b.id);
        setDrivers(sortedDrivers);

        const responseGasCards = await getGasCards(IdGasCard);
        const sortedGasCards = responseGasCards.data.sort((a, b) => a.id - b.id);
        setGasCards(sortedGasCards);

        const responseVehicles = await getVehicles(IdVehicle);
        const sortedVehicles = responseVehicles.data.sort((a, b) => a.id - b.id);
        setVehicles(sortedVehicles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'Id': setId(value); break;
      case 'IdDriver': setIdDriver(value); break;
      case 'IdGasCard': setIdGasCard(value); break;
      case 'IdVehicle': setIdVehicle(value); break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    // Voeg hier eventueel logica toe om met het formulier te werken
    event.preventDefault();
    console.log('Formulier ingediend:', { Id, IdDriver, IdGasCard, IdVehicle });
  };

  const handleRowClick = (selectedRow) => {
    setSelectedRow(selectedRow);
    setId(selectedRow.id);
    setIdDriver(selectedRow.idDriver);
    setIdGasCard(selectedRow.idGasCard);
    setIdVehicle(selectedRow.idVehicle);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('nl-NL', options);
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '400px' }}>Relation Id</th>
              <th>Driver Name</th>
              <th>Gascard Number</th>
              <th>Expiration Date</th>
              <th>Licensce Plate</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {connections.map((connection) => (
              <tr key={connection.id} onClick={() => handleRowClick(connection)}>
                <td className='tdRelation'>{connection.id}</td>
                <td className='tdRelation'>
                  {drivers.find((driver) => driver.idDriver === connection.idDriver)?.firstName +
                    ' ' +
                    drivers.find((driver) => driver.idDriver === connection.idDriver)?.insert +
                    ' ' +
                    drivers.find((driver) => driver.idDriver === connection.idDriver)?.name +
                    ` (id: ${drivers.find((driver) => driver.idDriver === connection.idDriver)?.idDriver})` 
                    ||
                    'N/A'}
                </td>

                <td className='tdRelation'>
                  {gasCards.find((gasCard) => gasCard.idGasCard === connection.idGasCard)?.cardNumber +
                    ` (id: ${gasCards.find((gasCard) => gasCard.idGasCard === connection.idGasCard)?.idGasCard})`
                  || 'N/A'}
                </td>

                <td>
                  {formatDate(gasCards.find((gasCard) => gasCard.idGasCard === connection.idGasCard)?.validationDate) || 'N/A'}
                </td>

                <td className='tdRelation'>
                  {vehicles.find((vehicle) => vehicle.idVehicle === connection.idVehicle)?.licensePlate +
                    ` (id: ${vehicles.find((vehicle) => vehicle.idVehicle === connection.idVehicle)?.idVehicle})`
                  || 'N/A'}
                </td>

                <td className='tdRelation'>
                  {vehicles.find((vehicle) => vehicle.idVehicle === connection.idVehicle)?.brand}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-container">
        <div className="col">
          <label htmlFor="Id">Relation Id</label>
          <input
            className="input"
            type="text"
            name="Id"
            value={Id}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="IdDriver">Driver Id</label>
          <input
            className="input"
            placeholder='Only driver id allowed'
            type="text"
            name="IdDriver"
            value={IdDriver}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="IdGasCard">Gas Card Id</label>
          <input
            className="input"
            placeholder='Only gas card id allowed'
            type="text"
            name="IdGasCard"
            value={IdGasCard}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="IdVehicle">Vehicle Id</label>
          <input
            className="input"
            placeholder='Only vehicle id allowed'
            type="text"
            name="IdVehicle"
            value={IdVehicle}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='containerButtonsNew'>
        <ButtonNewRelation
        IdDriver = {IdDriver}
        IdGasCard = {IdGasCard}
        IdVehicle = {IdVehicle}
        />
        <ButtonUpdateRelation
          Id={Id}
          IdDriver={IdDriver}
          IdGasCard={IdGasCard}
          IdVehicle={IdVehicle}
        />
        <ButtonDeleteRelation
          Id={Id}
        />
      </div>
      <div>
        <ButtonClearInput/>
      </div>
    </form>
  );
}

export default FormulierenRelaties;
