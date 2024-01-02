/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonDeleteVehicle from '../Buttons/ButtonsVehicles/ButtonDeleteVehicle';
import ButtonUpdateVehicle from '../Buttons/ButtonsVehicles/ButtonUpdateVehicle';
import ButtonClearInput from '../Buttons/ButtonClearInput';
import ButtonAddVehicle from '../Buttons/ButtonsVehicles/ButtonAddVehicle';
import { getVehicles } from '../../../API/index';


const FormulierenVoertuigen = ({searchTerm}) => {
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

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (searchTerm === '') {
      return vehicle;
    } else if (vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())) {
      return vehicle;
    }
    return null;
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="table-container">
        <table >
          <thead>
            <tr>
              <th className='tdVehiclec'>Vehicle Id</th>
              <th className='tdVehicle'>Brand</th>
              <th className='tdVehicle'>Model</th>
              <th className='tdVehicle'>Chassis Number</th>
              <th className='tdVehicle'>License Plate</th>
              <th className='tdVehicle'>Fuel</th>
              <th className='tdVehicle'>Vehicle Type</th>
              <th className='tdVehicle'>Color</th>
              <th className='tdVehicle'>Doors</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map(vehicle => (
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
      </div>
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
            placeholder='Max 50 characters'
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
            placeholder='Max 50 characters'
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
            placeholder='Max 50 characters'
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
            placeholder='Max 10 characters'
            type="text"
            name="licensePlate"
            value={LicensePlate}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="fuel">Fuel</label>
          <select
            className="input"
            placeholder='Max 25 characters'
            type="text"
            name="fuel"
            value={Fuel}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="Benzine">Benzine</option>                
            <option value="CNG">CNG</option>
            <option value="Diesel">Diesel</option>
            <option value="Elektrisch">Elektrisch</option>
            <option value="LPG">LPG</option>
            <option value="Anders">Anders</option>
          </select>
        </div>

        <div className="col">
          <label htmlFor="vehicleType">Vehicle Type</label>
          <select
            className="input"
            placeholder='Max 25 characters'
            type="text"
            name="vehicleType"
            value={VehicleType}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="Bicycle">Bicycle</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
            <option value="Anders">Anders</option> 
          </select>
        </div>

        <div className="col">
          <label htmlFor="color">Color</label>
          <input
            className="input"
            placeholder='Max 25 characters'
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
            placeholder='Only numbers'
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
      <div>
        <ButtonClearInput/>
      </div>
    </form>
  );
}

export default FormulierenVoertuigen;
