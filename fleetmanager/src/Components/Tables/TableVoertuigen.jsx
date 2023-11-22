/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import { getVehicles } from '../../../API'

const TableVoertuigen = () => {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVehicles();
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>IdVehicle</th>
          <th>Brand</th>
          <th>Model</th>
          <th>ChassisNumber</th>
          <th>LicensePlate</th>
          <th>Fuel</th>
          <th>VehicleType</th>
          <th>Color</th>
          <th>Doors</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map(vehicle => (
        <tr key={vehicle.idVehicle}>
          <td>{vehicle.idVehicle}</td>
          <td>{vehicle.brand}</td>
          <td>{vehicle.model}</td>
          <td>{vehicle.chassisNumber}</td>
          <td>{vehicle.licensePlate}</td>
          <td>{vehicle.fuel}</td>
          <td>{vehicle.vehicleType}</td>
          <td>{vehicle.color}</td>
          <td>{vehicle.numberOfDoors}</td>
        </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableVoertuigen