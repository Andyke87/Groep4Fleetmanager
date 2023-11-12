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
      tankkaartId: '',
      geslacht: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form>
        <div className="form-container">
          <div className="col">
            <br /><label>Id_Bestuurder</label><br />
            <input className="input" type="text" name="idBestuurder" value={this.state.idBestuurder} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /> <label>Naam</label><br />
            <input className="input" type="text" name="naam" value={this.state.naam} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /> <label>Voornaam</label> <br />
            <input className="input" type="text" name="voornaam" value={this.state.voornaam} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /><label>Straat</label><br />
            <input className="input" type="text" name="straat" value={this.state.straat} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /> <label>Huisnummer</label><br />
            <input className="input" type="text" name="huisnummer" value={this.state.huisnummer} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /> <label>Stad</label><br />
            <input className="input" type="text" name="stad" value={this.state.stad} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /> <label>Postcode</label><br />
            <input className="input" type="text" name="postcode" value={this.state.postcode} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /> <label>Geboortedatum</label><br />
            <input className="input" type="text" name="geboortedatum" value={this.state.geboortedatum} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /> <label>Rijksregisternummer</label><br />
            <input className="input" type="text" name="rijksregisternummer" value={this.state.rijksregisternummer} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /><label>Controle</label><br />
            <input className="input" type="text" name="controle" value={this.state.controle} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /> <label>Categorie_rijbewijs</label><br />
            <input className="input" type="text" name="categorieRijbewijs" value={this.state.categorieRijbewijs} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /> <label>Voertuig_id</label><br />
            <input className="input" type="text" name="voertuigId" value={this.state.voertuigId} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /><label>Tankkaart_id</label><br />
            <input className="input" type="text" name="tankkaartId" value={this.state.tankkaartId} onChange={this.handleChange} />
          </div>

          <div className="col">
            <br /> <label>Geslacht</label><br />
            <input className="input" type="text" name="geslacht" value={this.state.geslacht} onChange={this.handleChange} />
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
