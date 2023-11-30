/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonUpdateGasCard from '../Buttons/ButtonsGasCards/ButtonUpdateGasCard';
import ButtonDeleteGasCard from '../Buttons/ButtonsGasCards/ButtonDeleteGasCard';
import ButtonAddGasCard from '../Buttons/ButtonsGasCards/ButtonAddGasCard';
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
    // Voeg hier eventueel logica toe om met het formulier te werken
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

    // Functie om een datum in jouw gewenste formaat om te zetten
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('nl-NL', options);
  };
    // Functie om de geblokkeerde status om te zetten naar true/false
  const formatBlocked = (blocked) => {
    return blocked === 1 ? 'True' : 'False';
  };
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th className='tdGasCard'>IdGasCards</th>
            <th className='tdGasCard'>CardNumber</th>
            <th className='tdGasCard'>Validation Date</th>
            <th className='tdGasCard'>Pin</th>
            <th className='tdGasCard'>Fuel</th>
            <th className='tdGasCard'>Blocked</th>
          </tr>
        </thead>
        <tbody>
          {gasCards.map(gasCard => (
          <tr key={gasCard.idGasCards} onClick={() => handleRowClick(gasCard)}>
            <td>{gasCard.idGasCard}</td>
            <td>{gasCard.cardNumber}</td>
            <td>{formatDate(gasCard.validationDate)}</td>
            <td>{gasCard.pin}</td>
            <td>{gasCard.fuel}</td>
            <td>{formatBlocked(gasCard.blocked)}</td>
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
            type="text"
            name="cardNumber"
            value={cardNumber}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="validationDate">ValidationDate</label>
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
            type="text"
            name="pin"
            value={pin}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="fuel">Fuel</label>
          <input
            className="input"
            type="text"
            name="fuel"
            value={fuel}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="blocked">Blocked</label>
          <input
            className="input"
            type="checkbox"
            name="blocked"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='containerButtonsNieuw'>
          <ButtonAddGasCard
          
          />
          <ButtonUpdateGasCard
          
          />
          <ButtonDeleteGasCard Id={idGasCard} buttonText="Delete"/>
        </div>
    </form>
  );
}

export default FormulierTankkaarten;
