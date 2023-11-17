/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getGasCards } from '../../../API';
import TextField from './TextField';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Maanden in JavaScript zijn 0-geïndexeerd
  const year = date.getFullYear();

  // Voeg nullen toe aan de dag of maand indien nodig
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

const DropdownTankkaarten = () => 
{
  const [tankCards, setTankCards] = useState([]);
  const [selectedIdGasCard, setSelectedIdGasCard] = useState('');
  const [selectedCardNumber, setSelectedCardNumber] = useState('');
  const [selectedValidationDate, setSelectedValidationDate] = useState('');

  useEffect(() => {
    // Fetch tankCards from the backend API
    getGasCards().then(response => {
      setTankCards(response.data);
    });
  }, []);

  const handleTankCardChange = (event) => {

    // haal het id op van de tankCard die geselecteerd is
    const selectedIdGasCard = event.target.value;
    setSelectedIdGasCard(selectedIdGasCard);

    // haal de cardNumber op van de tankCard met het id dat geselecteerd is
    const cardNumber = tankCards.find((tankCard) => tankCard.idGasCard === parseInt(selectedIdGasCard, 10))?.cardNumber;
    setSelectedCardNumber(cardNumber);

    // haal de validationDate op van de tankCard met het id dat geselecteerd is
    const validationDate = tankCards.find((tankCard) => tankCard.idGasCard === parseInt(selectedIdGasCard, 10))?.validationDate;
    const formattedValidationDate = formatDate(validationDate);
    setSelectedValidationDate(formattedValidationDate);

  };

  return (
    <div>
      <select className="dropDown" onChange={handleTankCardChange}>
        <option value="default">Select a gas card id</option>
          {tankCards.map((tankCard) => (
            <option key={tankCard.idGasCard} value={tankCard.idGasCard}>
              {tankCard.idGasCard}
            </option>
          ))}
      </select>
        <p>Card number</p>
        <TextField name="cardNumber" value={selectedCardNumber} onChange={()=>{}}/>
        <p>Date of expire</p>
        <TextField name="validationDate" value={selectedValidationDate} onChange={() => {}} />
    </div>
  );
};
export default DropdownTankkaarten;


