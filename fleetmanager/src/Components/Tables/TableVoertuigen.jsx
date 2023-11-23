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
          <th className='c'>IdVehicle</th>
          <th className='tdVehicle'>Brand</th>
          <th className='tdVehicle'>Model</th>
          <th className='tdVehicle'>ChassisNumber</th>
          <th className='tdVehicle'>LicensePlate</th>
          <th className='tdVehicle'>Fuel</th>
          <th className='tdVehicle'>VehicleType</th>
          <th className='tdVehicle'>Color</th>
          <th className='tdVehicle'>Doors</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map(vehicle => (
        <tr className='trData' key={vehicle.idVehicle}>
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