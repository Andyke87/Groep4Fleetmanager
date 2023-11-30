/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonNewRelation from '../Buttons/ButtonsRelations/ButtonAddRelation';
import ButtonUpdateRelation from '../Buttons/ButtonsRelations/ButtonUpdateRelation';
import ButtonDeleteRelation from '../Buttons/ButtonsRelations/ButtonDeleteRelation';
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
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '400px' }}>Relation id</th>
              <th>Driver id</th>
              <th>Driver name</th>
              <th>Gascard id</th>
              <th>Gascard number</th>
              <th>Vehicle Id</th>
              <th>Licensce plate</th>
            </tr>
          </thead>
          <tbody>
            {connections.map((connection) => (
              <tr key={connection.id} onClick={() => handleRowClick(connection)}>
                <td className='tdRelation'>{connection.id}</td>
                <td className='tdRelation'>{connection.idDriver}</td>
                <td className='tdRelation'>
                  {drivers.find((driver) => driver.idDriver === connection.idDriver)?.firstName +
                    ' ' +
                    drivers.find((driver) => driver.idDriver === connection.idDriver)?.insert +
                    ' ' +
                    drivers.find((driver) => driver.idDriver === connection.idDriver)?.name ||
                    'N/A'}
                </td>
                <td className='tdRelation'>{connection.idGasCard}</td>
                <td className='tdRelation'>
                  {gasCards.find((gasCard) => gasCard.idGasCard === connection.idGasCard)?.cardNumber|| 'N/A'}
                </td>
                <td className='tdRelation'>{connection.idVehicle}</td>
                <td className='tdRelation'>
                  {vehicles.find((vehicle) => vehicle.idVehicle === connection.idVehicle)?.licensePlate || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-container">
        <div className="col">
          <label htmlFor="Id">Relation id</label>
          <input
            className="input"
            type="text"
            name="Id"
            value={Id}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="IdDriver">Driver id</label>
          <input
            className="input"
            type="text"
            name="IdDriver"
            value={IdDriver}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="IdGasCard">Gas card id</label>
          <input
            className="input"
            type="text"
            name="IdGasCard"
            value={IdGasCard}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="IdVehicle">Vehicle id</label>
          <input
            className="input"
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
    </form>
  );
}

export default FormulierenRelaties;
