/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonNieuweRelatie from '../Buttons/ButtonNieuweRelatie';
import ButtonUpdateConnection from '../Buttons/ButtonUpdateConnection';
import ButtonDeleteConnection from '../Buttons/ButtonDeleteConnection';

class FormulierenRelaties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: '',
      IdDriver: '',
      IdGasCard: '',
      IdVehicle: ''
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
      Id,
      IdDriver,
      IdGasCard,
      IdVehicle
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <div className="col" >
            <label htmlFor="Id">Connection id</label>
            <input
              className="input"
              type="text"
              name="Id"
              value={Id}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="IdDriver">Driver id</label>
            <input
              className="input"
              type="text"
              name="IdDriver"
              value={IdDriver}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="IdGasCard">Gas card id</label>
            <input
              className="input"
              type="text"
              name="IdGasCard"
              value={IdGasCard}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="IdVehicle">Vehicle id</label>
            <input
              className="input"
              type="text"
              name="IdVehicle"
              value={IdVehicle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='containerButtonsNew'>
            <ButtonNieuweRelatie/>
            <ButtonUpdateConnection
            Id={Id} 
            IdDriver={IdDriver}
            IdGasCard={IdGasCard}
            IdVehicle={IdVehicle}
            />
            <ButtonDeleteConnection 
            Id={Id}
            />
          </div>
      </form>
    );
  }
}

export default FormulierenRelaties;