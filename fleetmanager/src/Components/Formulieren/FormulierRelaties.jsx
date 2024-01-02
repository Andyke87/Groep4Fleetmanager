/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonNewRelation from '../Buttons/ButtonsRelations/ButtonAddRelation';
import ButtonUpdateRelation from '../Buttons/ButtonsRelations/ButtonUpdateRelation';
import ButtonDeleteRelation from '../Buttons/ButtonsRelations/ButtonDeleteRelation';
import ButtonClearInput from '../Buttons/ButtonClearInput';
import { getConnections, getDrivers, getGasCards, getVehicles } from '../../../API/index';
import Select from 'react-select';

const FormulierenRelaties = ({ searchTerm }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [connections, setConnections] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [gasCards, setGasCards] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [Id, setId] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedGasCard, setSelectedGasCard] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConnections();
        const sortedConnections = response.data.sort((a, b) => a.id - b.id);
        setConnections(sortedConnections);

        const responseDrivers = await getDrivers();
        const sortedDrivers = responseDrivers.data.sort((a, b) => a.id - b.id);
        setDrivers(sortedDrivers);

        const responseGasCards = await getGasCards();
        const sortedGasCards = responseGasCards.data.sort((a, b) => a.id - b.id);
        setGasCards(sortedGasCards);

        const responseVehicles = await getVehicles();
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
      default: break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulier ingediend:', { Id, selectedDriver, selectedGasCard, selectedVehicle });
  };

  const handleRowClick = (selectedRow) => {
  setSelectedRow(selectedRow);
  setId(selectedRow.id);

  const driver = drivers.find((driver) => driver.idDriver === selectedRow.idDriver);
  setSelectedDriver({ value: selectedRow.idDriver, label: driver ? `(${driver.idDriver}) - ${driver.firstName} ${driver.inserts} ${driver.name}` : 'N/A' });

  const gasCard = gasCards.find((gasCard) => gasCard.idGasCard === selectedRow.idGasCard);
  setSelectedGasCard({ value: selectedRow.idGasCard, label: gasCard ? `(${gasCard.idGasCard}) - ${gasCard.cardNumber}` : 'N/A' });

  const vehicle = vehicles.find((vehicle) => vehicle.idVehicle === selectedRow.idVehicle);
  setSelectedVehicle({ value: selectedRow.idVehicle, label: vehicle ? `(${vehicle.idVehicle}) - ${vehicle.licensePlate}` : 'N/A' });
};


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('nl-NL', options);
  };

  const filteredConnections = connections.filter((connection) => {
    if (searchTerm === '') {
      return connection;
    } else if (
      drivers.find((driver) => driver.idDriver === connection.idDriver)?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gasCards.find((gasCard) => gasCard.idGasCard === connection.idGasCard)?.cardNumber.includes(searchTerm) ||
      vehicles.find((vehicle) => vehicle.idVehicle === connection.idVehicle)?.licensePlate.includes(searchTerm)
    ) {
      return connection;
    }
    return null;
  });

  const driverOptions = drivers.map((driver) => ({
    value: driver.idDriver,
    label: `(${driver.idDriver}) - ${driver.firstName} ${driver.inserts} ${driver.name}`,
  }));

  const gasCardOptions = gasCards.map((gasCard) => ({
    value: gasCard.idGasCard,
    label: `(${gasCard.idGasCard}) - ${gasCard.cardNumber}`,
  }));

  const vehicleOptions = vehicles.map((vehicle) => ({
    value: vehicle.idVehicle,
    label: `(${vehicle.idVehicle}) - ${vehicle.licensePlate}`,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Relation Id</th>
              <th>Driver Name</th>
              <th>Gascard Number</th>
              <th>Expiration Date</th>
              <th>Licensce Plate</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {filteredConnections.map((connection) => (
              <tr key={connection.id} onClick={() => handleRowClick(connection)}>
                <td className='tdRelation'>{connection.id}</td>
                <td className='tdRelation'>
                  {drivers.find((driver) => driver.idDriver === connection.idDriver)?.firstName +
                    ' ' +
                    drivers.find((driver) => driver.idDriver === connection.idDriver)?.inserts +
                    ' ' +
                    drivers.find((driver) => driver.idDriver === connection.idDriver)?.name +
                    ` (id: ${drivers.find((driver) => driver.idDriver === connection.idDriver)?.idDriver})` ||
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
          <Select
            className="fieldConnections"
            name="IdDriver"
            value={selectedDriver}
            options={driverOptions}
            onChange={(selectedOption) => setSelectedDriver(selectedOption)}
          />
        </div>

        <div className="col">
          <label htmlFor="IdGasCard">Gas Card Id</label>
          <Select
            className="fieldConnections"
            name="IdGasCard"
            value={selectedGasCard}
            options={gasCardOptions}
            onChange={(selectedOption) => setSelectedGasCard(selectedOption)}
          />
        </div>

        <div className="col">
          <label htmlFor="IdVehicle">Vehicle Id</label>
          <Select
            className="fieldConnections"
            name="IdVehicle"
            value={selectedVehicle}
            options={vehicleOptions}
            onChange={(selectedOption) => setSelectedVehicle(selectedOption)}
          />
        </div>
      </div>

      <div className='containerButtonsNew'>
        <ButtonNewRelation
          IdDriver={selectedDriver ? selectedDriver.value : ''}
          IdGasCard={selectedGasCard ? selectedGasCard.value : ''}
          IdVehicle={selectedVehicle ? selectedVehicle.value : ''}
        />
        <ButtonUpdateRelation
          Id={Id}
          IdDriver={selectedDriver ? selectedDriver.value : ''}
          IdGasCard={selectedGasCard ? selectedGasCard.value : ''}
          IdVehicle={selectedVehicle ? selectedVehicle.value : ''}
        />
        <ButtonDeleteRelation
          Id={Id}
        />
      </div>
      <div>
        <ButtonClearInput />
      </div>
    </form>
  );
};

export default FormulierenRelaties;
