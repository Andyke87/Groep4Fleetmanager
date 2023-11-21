/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getConnections } from '../../../API'; // Vervang met het juiste pad naar je bestand

const TablesRelaties = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConnections();
        setConnections(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-container" style={{ width: '90%', marginLeft:40 }}>
      <table>
        <thead>
          <tr>
            <th>Connection id</th>
            <th>Driver id</th>
            <th>Gascard id</th>
            <th>Vehicle id</th>
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
