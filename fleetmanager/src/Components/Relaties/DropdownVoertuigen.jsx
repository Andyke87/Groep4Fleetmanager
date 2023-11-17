/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, {useEffect , useState } from 'react'
import { getVehicles } from '../../../API';
import TextField from './TextField'

export const DropdownVoertuigen = () => 
{
  const [vehicles, setVehicles] = useState([]);
  const [selectedIdVehicle, setSelectedIdVehicle] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedLicensePlate, setSelectedLicensePlate] = useState('');

  useEffect(() => {
    // Fetch tankCards from the backend API
    getVehicles().then(response => {
      setVehicles(response.data);
    });
  }, []);

  const handleVehicleChange = (event) => {

    // haal het id op van de tankCard die geselecteerd is
    const selectedIdVehicle = event.target.value;
    setSelectedIdVehicle(selectedIdVehicle);

    // haal de brand op van de tankCard met het id dat geselecteerd is
    const brand = vehicles.find((vehicle) => vehicle.idVehicle === parseInt(selectedIdVehicle, 10))?.brand;
    setSelectedBrand(brand);

    // haal de licensePlate op van de tankCard met het id dat geselecteerd is
    const licensePlate = vehicles.find((vehicle) => vehicle.idVehicle === parseInt(selectedIdVehicle, 10))?.licensePlate;
    setSelectedLicensePlate(licensePlate);
  };

  return (
    <div>
      <select className="dropDown" onChange={handleVehicleChange}>
        <option value="default">Select a vehicle id</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.idVehicle} value={vehicle.idVehicle}>
              {vehicle.idVehicle}
            </option>
        ))}
      </select>
              <p>Brand</p>
              <TextField name="brand" value={selectedBrand} onChange={()=>{}}/>
              <p>License plate</p>
              <TextField name="licensePlate" value={selectedLicensePlate} onChange={()=>{}}/>
    </div>
  );
};
export default DropdownVoertuigen