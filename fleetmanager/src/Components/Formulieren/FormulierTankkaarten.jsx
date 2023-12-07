/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonUpdateGasCard from '../Buttons/ButtonsGasCards/ButtonUpdateGasCard';
import ButtonDeleteGasCard from '../Buttons/ButtonsGasCards/ButtonDeleteGasCard';
import ButtonAddGasCard from '../Buttons/ButtonsGasCards/ButtonAddGasCard';
import ButtonClearInput from '../Buttons/ButtonClearInput';
import { getGasCards } from '../../../API/index';

const FormulierTankkaarten = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [gasCards, setGasCards] = useState([]);
  const [idGasCard, setIdGasCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [validationDate, setValidationDate] = useState('');
  const [pin, setPin] = useState('');
  const [fuel, setFuel] = useState('');
  const [blocked, setBlocked] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGasCards();
        const sortedGasCards = response.data.sort((a, b) => a.id - b.id);
        setGasCards(sortedGasCards);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'idGasCard': setIdGasCard(value); break;
      case 'cardNumber': setCardNumber(value); break;
      case 'validationDate': setValidationDate(value); break;
      case 'pin': setPin(value); break;
      case 'fuel': setFuel(value); break;
      case 'blocked': setBlocked(value); break;
      default:
        break;
    }  
  };

  const handleSubmit = (event) => {
    setBlocked(document.getElementById('blocked').value);

    event.preventDefault();
    console.log('Formulier ingediend:', { idGasCard, cardNumber, validationDate, pin, fuel, blocked });
  };

  const handleRowClick = (selectedRow) => {
    setSelectedRow(selectedRow);
    setIdGasCard(selectedRow.idGasCard);
    setCardNumber(selectedRow.cardNumber);
    setValidationDate(selectedRow.validationDate);
    setPin(selectedRow.pin);
    setFuel(selectedRow.fuel);
    setBlocked(selectedRow.blocked);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('nl-NL', options);
  };
  
  console.log("dit is de waarde: ",gasCards)
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th className='tdGasCard'>Gas Card Id</th>
            <th className='tdGasCard'>Card Number</th>
            <th className='tdGasCard'>Expiration Date</th>
            <th className='tdGasCard'>Pin</th>
            <th className='tdGasCard'>Fuel</th>
            <th className='tdGasCard'>Blocked</th>
          </tr>
        </thead>
        <tbody>
          {gasCards.map((gasCard) => (
            <tr key={gasCard.idGasCard} onClick={() => handleRowClick(gasCard)}>
              <td>{gasCard.idGasCard}</td>
              <td>{gasCard.cardNumber}</td>
              <td>{formatDate(gasCard.validationDate)}</td>
              <td>{gasCard.pin}</td>
              <td>{gasCard.fuel}</td>
              <td>{gasCard.blocked}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <div className="col">
          <label htmlFor="idGasCard">Gas Card Id</label>
          <input
            className="input"
            type="text"
            name="idGasCard"
            value={idGasCard}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            className="input"
            placeholder='Max 12 characters'
            type="text"
            name="cardNumber"
            value={cardNumber}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="validationDate">Expiration Date</label>
          <input
            className="input"
            type="date"
            name="validationDate"
            value={validationDate}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="pin">Pin</label>
          <input
            className="input"
            placeholder='Max 6 characters'
            type="text"
            name="pin"
            value={pin}
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
            value={fuel}
            onChange={handleChange}
          >
          <option value="Benzine">Benzine</option>                
          <option value="CNG">CNG</option>
          <option value="Diesel">Diesel</option>
          <option value="Elektrisch">Elektrisch</option>
          <option value="LPG">LPG</option>
          <option value="Anders">Anders</option>

          </select>

        </div>

        <div className="col">
          <label htmlFor="blocked">Blocked</label>
          <select
            className="input"
            type="text"
            name="blocked"
            value={blocked}
            onChange={handleChange}
          >
          <option value="True">True</option>
          <option value="False">False</option>
          </select>
        </div>
      </div>
      <div className='containerButtonsNieuw'>
          <ButtonAddGasCard
            CardNumber={cardNumber}
            ValidationDate={validationDate}
            Pin={pin}
            Fuel={fuel}
            Blocked={blocked}
          />
          <ButtonUpdateGasCard
            IdGasCard={idGasCard}
            CardNumber={cardNumber}
            ValidationDate={validationDate}
            Pin={pin}
            Fuel={fuel}
            Blocked={blocked}
          />
          <ButtonDeleteGasCard Id={idGasCard} buttonText="Delete"/>
      </div>
      <div>
        <ButtonClearInput/>
      </div>      
    </form>
  );
}

export default FormulierTankkaarten;
