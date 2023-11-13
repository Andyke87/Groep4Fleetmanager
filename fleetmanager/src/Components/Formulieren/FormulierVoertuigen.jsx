import React, { Component } from 'react';
import '../Formulieren/Formulieren.css';

class FormulierenVoertuigen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id_Voertuig: '',
      Merk: '',
      Model: '',
      Chassisnummer: '',
      Nummerplaat: '',
      Brandstoftype: '',
      Type_voertuig: '',
      Kleur: '',
      Aantal_deuren: '',
      Bestuurder_Id: '',
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
      Id_Voertuig,
      Merk,
      Model,
      Chassisnummer,
      Nummerplaat,
      Brandstoftype,
      Type_voertuig,
      Kleur,
      Aantal_deuren,
      Bestuurder_Id,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <div className="col">
            <label htmlFor="Id_Voertuig">Voertuig ID</label>
            <input
              className="input"
              type="text"
              name="Id_Voertuig"
              value={Id_Voertuig}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="Merk">Merk</label>
            <input
              className="input"
              type="text"
              name="Merk"
              value={Merk}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="Model">Model</label>
            <input
              className="input"
              type="text"
              name="Model"
              value={Model}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="Chassisnummer">Chassisnummer</label>
            <input
              className="input"
              type="text"
              name="Chassisnummer"
              value={Chassisnummer}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="Nummerplaat">Nummerplaat</label>
            <input
              className="input"
              type="text"
              name="Nummerplaat"
              value={Nummerplaat}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="Brandstoftype">Brandstoftype</label>
            <select
              className="input"
              name="Brandstoftype"
              value={Brandstoftype}
              onChange={this.handleChange}
            >
              <option value="">Selecteer brandstoftype</option>
              <option value="Benzine">Benzine</option>
              <option value="Diesel">Diesel</option>
              <option value="LPG">LPG</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="Type_voertuig">Type voertuig</label>
            <input
              className="input"
              type="text"
              name="Type_voertuig"
              value={Type_voertuig}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="Kleur">Kleur</label>
            <input
              className="input"
              type="text"
              name="Kleur"
              value={Kleur}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="Aantal_deuren">Aantal deuren</label>
            <input
              className="input"
              type="text"
              name="Aantal_deuren"
              value={Aantal_deuren}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="Bestuurder_Id">Bestuurder ID</label>
            <input
              className="input"
              type="text"
              name="Bestuurder_Id"
              value={Bestuurder_Id}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='containerButtonsNieuw'>
            <button className='buttonsNieuw' type="submit">Voeg toe</button>
            <button className='buttonsNieuw' type="button">Annuleer</button>
          </div>
      </form>
    );
  }
}

export default FormulierenVoertuigen;
