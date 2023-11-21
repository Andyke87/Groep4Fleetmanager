/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonOpslaan from '../Buttons/ButtonOpslaan';
import ButtonAnnuleren from '../Buttons/ButtonAnnuleren';

class FormulierTankkaarten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idGasCard: '',
      cardNumber: '',
      validationDate: '',
      pin: '',
      fuel: '',
      blocked: '',
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
      idGasCard,
      cardNumber,
      validationDate,
      pin,
      fuel,
      blocked,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <div className="col">
            <label htmlFor="idGasCard">Id Gas Card</label>
            <input
              className="input"
              type="text"
              name="idGasCard"
              value={idGasCard}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              className="input"
              type="text"
              name="cardNumber"
              value={cardNumber}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="validationDate">ValidationDate</label>
            <input
              className="input"
              type="date"
              name="validationDate"
              value={validationDate}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="pin">Pin</label>
            <input
              className="input"
              type="password"
              name="pin"
              value={pin}
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
            <label htmlFor="blocked">Blocked</label>
            <input
              className="input"
              type="checkbox"
              name="blocked"
              checked={blocked}
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

export default FormulierTankkaarten;
