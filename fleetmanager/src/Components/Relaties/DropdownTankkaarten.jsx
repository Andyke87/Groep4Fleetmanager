/* eslint-disable no-unused-vars */
import React from 'react';
import { getGasCards } from '../../../API';
import { useEffect, useState } from 'react';

const DropdownTankkaarten = () => {
const [tankCards, setTankCards] = useState([]);

  useEffect(() => {
    // Fetch tank cards from the backend API
    getGasCards().then(response => {
      const IdGasCards = response.data.map(tankCards => tankCards.IdGasCard);
      setTankCards(IdGasCards);
    });
  }, []);

  return (
    <select className="dropDown">
      {tankCards.map(IdGasCard => (
        <option key={IdGasCard} value={IdGasCard}>
          GasCard {IdGasCard}
        </option>
      ))}
    </select>
  );
};

export default DropdownTankkaarten;
