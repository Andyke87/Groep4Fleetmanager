// Importeer de nodige modules.
import axios from 'axios';
 
// Definieer de functies.
export const getConnections = async () => {
  return await axios.get('http://localhost:5043/Connection/AllConnections');
};
export const getConnectionsById = async () => {
  return await axios.get('http://localhost:5043/Connection/ConnectionByCode/{code}');
};
export const deleteConnections = async () => {
  return await axios.get('http://localhost:5043/Connection/Connection/{code}');
};
/* de todo parameter is een object met de properties: 
IdBestuurder, IdTankkaart en IdVoertuig*/
export const postConnections = async (todo) => {
  return await axios.get('http://localhost:5043/Connection/Connection', todo);
};


export const getDrivers = async () => {
  return await axios.get('http://localhost:5043/Driver/AllDrivers');
};
export const getDriversById = async () => {
  return await axios.get('http://localhost:5043/Driver/DriverById/{code}');
};
export const deleteDrivers = async () => {
  return await axios.get('http://localhost:5043/Driver/Driver/{code}');
};
/* de todo parameter is een object met de properties: 
Name, Insert, FirstName, Street, Number, City, Zipcode, DayOfBirth, 
RegistryNumber, CategoryLicense, Login, Password*/
export const postDrivers = async (todo) => {
  return await axios.get('http://localhost:5043/Driver/Driver', todo);
};


export const getGasCards = async () => {
  return await axios.get('http://localhost:5043/GasCard/AllGasCards');
};
export const getGasCardsById = async () => {
  return await axios.get('http://localhost:5043/GasCard/GasCardByCode/{code}');
};
export const deleteGasCards = async () => {
  return await axios.get('http://localhost:5043/GasCard/GasCard/{code}');
};
/* de todo parameter is een object met de properties: 
CardNumber, ValidationDate, Pin, Fuel, Blocked*/
export const postGasCards = async (todo) => {
  return await axios.get('http://localhost:5043/GasCard/GasCard', todo);
};


export const getVehicles = async () => {
  return await axios.get('http://localhost:5043/Vehicle/AllVehicles');
};
export const getVehiclesById = async () => {
  return await axios.get('http://localhost:5043/Vehicle/VehicleByCode/{code}');
};
export const deleteVehicles = async () => {
  return await axios.get('http://localhost:5043/Vehicle/Vehicle/{code}');
};
/* de todo parameter is een object met de properties: 
Nummerplaat, Merk, Type, IdVoertuig*/
export const postVehicles = async (todo) => {
  return await axios.get('http://localhost:5043/Vehicle/Vehicle', todo);
};