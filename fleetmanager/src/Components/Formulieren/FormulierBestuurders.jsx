import React, { Component } from 'react';
import '../Formulieren/Formulieren.css';

class FormulierBestuurders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idBestuurder: '',
      naam: '',
      voornaam: '',
      straat: '',
      huisnummer: '',
      stad: '',
      postcode: '',
      geboortedatum: '',
      rijksregisternummer: '',
      
      controle: '',
      categorieRijbewijs: '',
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
      idBestuurder,
      naam,
      voornaam,
      straat,
      huisnummer,
      stad,
      postcode,
      geboortedatum,
      rijksregisternummer,
      controle,
      categorieRijbewijs,
      voertuigId,
      tankkaartId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <div className="col">
            <label htmlFor="idBestuurder">Bestuurder ID</label>
            <input
              className="input"
              type="text"
              name="idBestuurder"
              value={idBestuurder}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="naam">Naam</label>
            <input
              className="input"
              type="text"
              name="naam"
              value={naam}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="voornaam">Voornaam</label>
            <input
              className="input"
              type="text"
              name="voornaam"
              value={voornaam}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="straat">Straat</label>
            <input
              className="input"
              type="text"
              name="straat"
              value={straat}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="huisnummer">Huisnummer</label>
            <input
              className="input"
              type="text"
              name="huisnummer"
              value={huisnummer}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="stad">Stad</label>
            <input
              className="input"
              type="text"
              name="stad"
              value={stad}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="postcode">Postcode</label>
            <input
              className="input"
              type="text"
              name="postcode"
              value={postcode}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="geboortedatum">Geboortedatum</label>
            <input
              className="input"
              type="date"
              name="geboortedatum"
              value={geboortedatum}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="rijksregisternummer">Rijksregisternummer</label>
            <input
              className="input"
              type="text"
              name="rijksregisternummer"
              value={rijksregisternummer}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="controle">Controle</label>
            <input
              className="input"
              type="text"
              name="controle"
              value={controle}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="categorieRijbewijs">Categorie rijbewijs</label>
            <input
              className="input"
              type="text"
              name="categorieRijbewijs"
              value={categorieRijbewijs}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="voertuigId">Voertuig ID</label>
            <input
              className="input"
              type="text"
              name="voertuigId"
              value={voertuigId}
              onChange={this.handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="tankkaartId">Tankkaart ID</label>
            <input
              className="input"
              type="text"
              name="tankkaartId"
              value={tankkaartId}
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

export default FormulierBestuurders;

