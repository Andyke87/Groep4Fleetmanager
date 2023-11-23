/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import { getGasCards } from '../../../API'

const TableTankkaarten = () => {
  const [gasCards, setGasCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGasCards();
        setGasCards(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
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
      <tr key={gasCard.idGasCards}>
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
  )
}

export default TableTankkaarten