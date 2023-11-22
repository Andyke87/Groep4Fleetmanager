/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonAdd from '../Buttons/ButtonAdd';
import ButtonDeleteDriver from '../Buttons/ButtonsDrivers/ButtonDeleteDriver';
import ButtonUpdate from '../Buttons/ButtonUpdate';

class FormulierBestuurders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idBestuurder: '',
      Name: '',
      Insert: '',
      firstName: '',
      street: '',
      number: '',
      city: '',
      zipcode: '',
      dayOfBirth: '',
      registryNumber: '',
      controle: '',
      categoryLicense: '',
      voertuigId: '',
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
      idDriver,
      name,
      insert,
      firstName,
      street,
      number,
      city,
      zipcode,
      dayOfBirth,
      registryNumber,
      categoryLicense,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <div className="col">
            <label htmlFor="idDriver">Driver ID</label>
            <input
              className="input"
              type="text"
              name="idDriver"
              value={idDriver}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="name">Name</label>
            <input
              className="input"
              type="text"
              name="Name"
              value={name}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="insert">Insert</label>
            <input
              className="input"
              type="text"
              name="insert"
              value={insert}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="firstName">FirstName</label>
            <input
              className="input"
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="street">Street</label>
            <input
              className="input"
              type="text"
              name="street"
              value={street}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="number">Number</label>
            <input
              className="input"
              type="text"
              name="number"
              value={number}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="city">City</label>
            <input
              className="input"
              type="text"
              name="city"
              value={city}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="zipcode">Zipcode</label>
            <input
              className="input"
              type="text"
              name="zipcode"
              value={zipcode}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="dayOfBirth">Day Of Birth</label>
            <input
              className="input"
              type="date"
              name="dayOfBirth"
              value={dayOfBirth}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="registryNumber">Registry Number</label>
            <input
              className="input"
              type="text"
              name="registryNumber"
              value={registryNumber}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="categoryLicense">Category License</label>
            <input
              className="input"
              type="text"
              name="categoryLicense"
              value={categoryLicense}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='containerButtonsNieuw'>
          <ButtonAdd buttonText="Add"/>
          <ButtonUpdate buttonText="Update"/>
          <ButtonDeleteDriver Id={idDriver} buttonText="Delete"/>
          </div>
      </form>
    );
  }
}

export default FormulierBestuurders;

