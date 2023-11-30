/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonDeleteVehicle from '../Buttons/ButtonsVehicles/ButtonDeleteVehicle';
import ButtonUpdateVehicle from '../Buttons/ButtonsVehicles/ButtonUpdateVehicle';
import ButtonAddVehicle from '../Buttons/ButtonsVehicles/ButtonAddVehicle';
import { getVehicles } from '../../../API/index';


const FormulierenVoertuigen = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [IdVehicle, setIdVehicle] = useState('');
  const [Brand, setBrand] = useState('');
  const [Model, setModel] = useState('');
  const [ChassisNumber, setChassisNumber] = useState('');
  const [LicensePlate, setLicensePlate] = useState('');
  const [Fuel, setFuel] = useState('');
  const [VehicleType, setVehicleType] = useState('');
  const [Color, setColor] = useState('');
  const [NumberOfDoors, setNumberOfDoors] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVehicles();
        const sortedVehicles = response.data.sort((a, b) => a.id - b.id);
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
      case 'idVehicle': setIdVehicle(value); break;
      case 'brand': setBrand(value); break;
      case 'model': setModel(value); break;
      case 'chassisNumber': setChassisNumber(value); break;
      case 'licensePlate': setLicensePlate(value); break;
      case 'fuel': setFuel(value); break;
      case 'vehicleType': setVehicleType(value); break;
      case 'color': setColor(value); break;
      case 'numberOfDoors': setNumberOfDoors(value); break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    // Voeg hier eventueel logica toe om met het formulier te werken
    event.preventDefault();
    console.log('Formulier ingediend:', { IdVehicle, Brand, Model, ChassisNumber, LicensePlate, Fuel, VehicleType, Color, NumberOfDoors });
  };

  const handleRowClick = (selectedRow) => {
    setSelectedRow(selectedRow);
    setIdVehicle(selectedRow.idVehicle);
    setBrand(selectedRow.brand);
    setModel(selectedRow.model);
    setChassisNumber(selectedRow.chassisNumber);
    setLicensePlate(selectedRow.licensePlate);
    setFuel(selectedRow.fuel);
    setVehicleType(selectedRow.vehicleType);
    setColor(selectedRow.color);
    setNumberOfDoors(selectedRow.numberOfDoors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th className='tdVehiclec'>IdVehicle</th>
            <th className='tdVehicle'>Brand</th>
            <th className='tdVehicle'>Model</th>
            <th className='tdVehicle'>ChassisNumber</th>
            <th className='tdVehicle'>LicensePlate</th>
            <th className='tdVehicle'>Fuel</th>
            <th className='tdVehicle'>VehicleType</th>
            <th className='tdVehicle'>Color</th>
            <th className='tdVehicle'>Doors</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr className='trData' key={vehicle.idVehicle} onClick={() => handleRowClick(vehicle)}>
              <td>{vehicle.idVehicle}</td>
              <td>{vehicle.brand}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.chassisNumber}</td>
              <td>{vehicle.licensePlate}</td>
              <td>{vehicle.fuel}</td>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.numberOfDoors}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <div className="col">
          <label htmlFor="idVehicle">Vehicle ID</label>
          <input
            className="input"
            type="text"
            name="idVehicle"
            value={IdVehicle}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="brand">Brand</label>
          <input
            className="input"
            type="text"
            name="brand"
            value={Brand}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="model">Model</label>
          <input
            className="input"
            type="text"
            name="model"
            value={Model}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="chassisNumber">Chassis Number</label>
          <input
            className="input"
            type="text"
            name="chassisNumber"
            value={ChassisNumber}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="licensePlate">License Plate</label>
          <input
            className="input"
            type="text"
            name="licensePlate"
            value={LicensePlate}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="fuel">Fuel</label>
          <input
            className="input"
            type="text"
            name="fuel"
            value={Fuel}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="vehicleType">Vehicle Type</label>
          <input
            className="input"
            type="text"
            name="vehicleType"
            value={VehicleType}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="color">Color</label>
          <input
            className="input"
            type="text"
            name="color"
            value={Color}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="numberOfDoors">Number Of Doors</label>
          <input
            className="input"
            type="text"
            name="numberOfDoors"
            value={NumberOfDoors}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='containerButtonsNieuw'>
        <ButtonAddVehicle
          Brand={Brand}
          Model={Model}
          ChassisNumber={ChassisNumber}
          LicensePlate={LicensePlate}
          Fuel={Fuel}
          VehicleType={VehicleType}
          Color={Color}
          NumberOfDoors={NumberOfDoors}
        />
        <ButtonUpdateVehicle
          IdVehicle={IdVehicle}
          Brand={Brand}
          Model={Model}
          ChassisNumber={ChassisNumber}
          LicensePlate={LicensePlate}
          Fuel={Fuel}
          VehicleType={VehicleType}
          Color={Color}
          NumberOfDoors={NumberOfDoors}
        />
        <ButtonDeleteVehicle Id={IdVehicle} buttonText="Delete" />
      </div>
    </form>
  );
}

export default FormulierenVoertuigen;
