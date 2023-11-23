/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getConnections } from '../../../API'; // Vervang met het juiste pad naar je bestand

const TablesRelaties = () => {
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConnections();
        const sortedConnections = response.data.sort((a, b) => a.id - b.id);
        setConnections(sortedConnections);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th style={{width : '400px'}}>Connection id</th>
            <th >Driver id</th>
            <th >Gascard id</th>
            <th >Vehicle Id</th>
          </tr>
        </thead>
        <tbody>
          {connections.map(connection => (
            <tr key={connection.id}>
              <td>{connection.id}</td>
              <td>{connection.idDriver}</td>
              <td>{connection.idGasCard}</td>
              <td>{connection.idVehicle}</td>
            </tr>
            
          ))}
          
        </tbody>
      </table>
    </div>
  );
};

export default TablesRelaties;
