/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonUpdateGasCard from '../Buttons/ButtonsGasCards/ButtonUpdateGasCard';
import ButtonDeleteGasCard from '../Buttons/ButtonsGasCards/ButtonDeleteGasCard';
import ButtonAddGasCard from '../Buttons/ButtonsGasCards/ButtonAddGasCard';
import ButtonClearInput from '../Buttons/ButtonClearInput';
import { getGasCards } from '../../../API/index';

const FormulierTankkaarten = ({searchTerm}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [gasCards, setGasCards] = useState([]);
  const [idGasCard, setIdGasCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [validationDate, setValidationDate] = useState('');
  const [pin, setPin] = useState('');
  const [fuel, setFuel] = useState('');
  const [blockedCard, setBlockedCard] = useState('');
  const [editingDate, setEditingDate] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGasCards();
        //console.log('API Response:', response.data);
        const sortedGasCards = response.data.sort((a, b) => a.id - b.id);
        setGasCards(sortedGasCards);
        //console.log('Sorted gas cards:', sortedGasCards);
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
      case 'blockedCard': setBlockedCard(value); break;
      default:
        break;
    }  
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleRowClick = (selectedRow) => {
      console.log("Selected Row:", selectedRow);
    setSelectedRow(selectedRow);
    setIdGasCard(selectedRow.idGasCard);
    setCardNumber(selectedRow.cardNumber);
    setValidationDate(selectedRow.validationDate);
    setPin(selectedRow.pin);
    setFuel(selectedRow.fuel);
    setBlockedCard(selectedRow.blockedCard);
  };

  const handleDateClick = () => {
    setEditingDate(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('nl-NL', options);
  };

  const filterGasCards = gasCards.filter((gasCard) => {
    if (searchTerm === '') {
      return gasCard;
    } else if (gasCard.cardNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
      return gasCard;
    }
    return null;
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className='id'>Gas Card Id</th>
              <th>Card Number</th>
              <th>Expiration Date</th>
              <th>Pin</th>
              <th>Fuel</th>
              <th>Blocked</th>
            </tr>
          </thead>
          <tbody>
            {filterGasCards.map((gasCard) => (
              <tr key={gasCard.idGasCard} onClick={() => handleRowClick(gasCard)}
                className={selectedRow && selectedRow.idGasCard === gasCard.idGasCard ? 'selected-row' : ''}>
                <td>{gasCard.idGasCard}</td>
                <td>{gasCard.cardNumber}</td>
                <td>{formatDate(gasCard.validationDate)}</td>
                <td>{gasCard.pin}</td>
                <td>{gasCard.fuel}</td>
                <td>{gasCard.blockedCard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
          {selectedRow ? (
            <input
              className="input"
              type={editingDate ? "date" : "text"}
              name="validationDate"
              value={formatDate(validationDate)}
              onChange={handleChange}
            />
          ) : (
            <input
              className="input"
              type="date"
              name="validationDate"
              value={validationDate}
              onChange={handleChange}
            />
          )}
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
          <option value="">Select...</option>
          <option value="Benzine">Benzine</option>                
          <option value="CNG">CNG</option>
          <option value="Diesel">Diesel</option>
          <option value="Elektrisch">Elektrisch</option>
          <option value="LPG">LPG</option>
          <option value="Anders">Other</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="blockedCard">Blocked</label>
          <select
            className="input"
            type="text"
            name="blockedCard"
            value={blockedCard}
            onChange={handleChange}
          >
          <option value="">Select...</option>
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
            BlockedCard={blockedCard}
          />
          <ButtonUpdateGasCard
            IdGasCard={idGasCard}
            CardNumber={cardNumber}
            ValidationDate={validationDate}
            Pin={pin}
            Fuel={fuel}
            BlockedCard={blockedCard}
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
