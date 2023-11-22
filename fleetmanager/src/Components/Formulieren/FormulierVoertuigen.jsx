/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonOpslaan from '../Buttons/ButtonOpslaan';
import ButtonAnnuleren from '../Buttons/ButtonAnnuleren';

class FormulierenVoertuigen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idVehicle: '',
      brand: '',
      model: '',
      chassisNumber: '',
      licensePlate: '',
      fuel: '',
      vehicleType: '',
      color: '',
      numberOfDoors: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    // Voeg hier eventueel logica toe om met het formulier te werken
    event.preventDefault();
    console.log('Formulier ingediend:', this.state);
  };

  render() {
    const {
      idVehicle,
      brand,
      model,
      chassisNumber,
      licensePlate,
      fuel,
      vehicleType,
      color,
      numberOfDoors,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <div className="col">
            <label htmlFor="idVehicle">Voertuig ID</label>
            <input
              className="input"
              type="text"
              name="idVehicle"
              value={idVehicle}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="brand">Brand</label>
            <input
              className="input"
              type="text"
              name="brand"
              value={brand}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="model">Model</label>
            <input
              className="input"
              type="text"
              name="model"
              value={model}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="chassisNumber">Chassis Number</label>
            <input
              className="input"
              type="text"
              name="chassisNumber"
              value={chassisNumber}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="licensePlate">License Plate</label>
            <input
              className="input"
              type="text"
              name="licensePlate"
              value={licensePlate}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="fuel">Fuel</label>
            <select
              className="input"
              name="fuel"
              value={fuel}
              onChange={this.handleChange}
            >
              <option value="">Select fuel</option>
              <option value="Benzine">Benzine</option>
              <option value="Diesel">Diesel</option>
              <option value="LPG">LPG</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="vehicleType">Vehicle Type</label>
            <input
              className="input"
              type="text"
              name="vehicleType"
              value={vehicleType}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="color">Color</label>
            <input
              className="input"
              type="text"
              name="color"
              value={color}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="numberOfDoors">Number Of Doors</label>
            <input
              className="input"
              type="text"
              name="numberOfDoors"
              value={numberOfDoors}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='containerButtonsNieuw'>
            <ButtonOpslaan/>
            <ButtonAnnuleren/>
          </div>
      </form>
    );
  }
}

export default FormulierenVoertuigen;
