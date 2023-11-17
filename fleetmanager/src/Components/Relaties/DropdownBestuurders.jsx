/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, {useEffect , useState } from 'react'
import { getDrivers } from '../../../API';
import TextField from './TextField'

const DropdownBestuurders = () => 
{
  const [drivers, setDrivers] = useState([]);
  const [selectedIdDriver, setSelectedIdDriver] = useState('');
  const [selectedFirstName, setSelectedFirstName] = useState('');
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    // Fetch tankCards from the backend API
    getDrivers().then(response => {
      setDrivers(response.data);
    });
  }, []);  
    
  const handleDriverChange = (event) => {

    // haal het id op van de driver die geselecteerd is
    const selectedIdDriver = event.target.value;
    setSelectedIdDriver(selectedIdDriver);
    
    // haal de firstName op van de driver met het id dat geselecteerd is
    const firstName = drivers.find((driver) => driver.idDriver === parseInt(selectedIdDriver, 10))?.firstName;
    setSelectedFirstName(firstName);

    // haal de name op van de driver met het id dat geselecteerd is
    const name = drivers.find((driver) => driver.idDriver === parseInt(selectedIdDriver, 10))?.name;
    setSelectedName(name);
  };
    
  return (
    <div>
    <select className="dropDown" onChange={handleDriverChange}>
      <option value="default">Select a driver id</option>
      {drivers.map((driver) => (
        <option key={driver.idDriver} value={driver.idDriver}>
          {driver.idDriver}
        </option>
      ))}
    </select>
      <p>First name</p>
      <TextField name="firstName" value={selectedFirstName} onChange={() => {}} />
      <p>Name</p>
      <TextField name="name" value={selectedName} onChange={() => {}} />
    </div>
  );
};

export default DropdownBestuurders