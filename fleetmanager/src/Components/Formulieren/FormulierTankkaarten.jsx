/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonOpslaan from '../Buttons/ButtonOpslaan';
import ButtonAnnuleren from '../Buttons/ButtonAnnuleren';

class FormulierTankkaarten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTankkaart: '',
      kaartnummer: '',
      geldigheidsdatum: '',
      pincode: '',
      brandstoffen: '',
      bestuurder_id: '',
      geblokkeerd: '',
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
      idTankkaart,
      kaartnummer,
      geldigheidsdatum,
      pincode,
      brandstoffen,
      bestuurder_id,
      geblokkeerd,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <div className="col">
            <label htmlFor="idTankkaart">Tankkaart ID</label>
            <input
              className="input"
              type="text"
              name="idTankkaart"
              value={idTankkaart}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="kaartnummer">Kaartnummer</label>
            <input
              className="input"
              type="text"
              name="kaartnummer"
              value={kaartnummer}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="geldigheidsdatum">Geldigheidsdatum</label>
            <input
              className="input"
              type="date"
              name="geldigheidsdatum"
              value={geldigheidsdatum}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="pincode">Pincode</label>
            <input
              className="input"
              type="password"
              name="pincode"
              value={pincode}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="brandstoffen">Brandstoffen</label>
            <select
              className="input"
              name="brandstoffen"
              value={brandstoffen}
              onChange={this.handleChange}
            >
              <option value="">Selecteer brandstof</option>
              <option value="Benzine">Benzine</option>
              <option value="Diesel">Diesel</option>
              <option value="LPG">LPG</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="bestuurder_id">Bestuurder</label>
            <select
              className="input"
              name="bestuurder_id"
              value={bestuurder_id}
              onChange={this.handleChange}
            >
              <option value="">Selecteer bestuurder</option>
            
              </select>
          </div>

          <div className="col">
            <label htmlFor="geblokkeerd">Geblokkeerd</label>
            <input
              className="input"
              type="checkbox"
              name="geblokkeerd"
              checked={geblokkeerd}
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
