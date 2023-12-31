// Importeer de nodige modules.
import axios from 'axios';
 
// Definieer de functies.
export const getConnections = async () => {
  return await axios.get("https://localhost:5043/Connection/AllConnections");
};
export const getConnectionsById = async (id) => {
  return await axios.get(`https://localhost:5043/Connection/ConnectionById/${id}`);
};
export const deleteConnections = async (id) => {
  return await axios.delete(`https://localhost:5043/Connection/Connection/${id}`);
};
export const updateConnections = async (id, put) => {
  return await axios.patch(`https://localhost:5043/Connection/Connection/${id}`, put);
};
/* de todo parameter is een object met de properties: 
IdBestuurder, IdTankkaart en IdVoertuig*/
export const postConnections = async (post) => {
  return await axios.post("https://localhost:5043/Connection/Connection", post);
};


export const getDrivers = async () => {
  return await axios.get("https://localhost:5043/Driver/AllDrivers");
};
export const getDriversById = async (id) => {
  return await axios.get(`https://localhost:5043/Driver/DriverById/${id}`);
};
export const deleteDrivers = async (id) => {
  return await axios.delete(`https://localhost:5043/Driver/Driver/${id}`);
};
export const updateDrivers = async (id, put) => {
  return await axios.patch(`https://localhost:5043/Driver/Driver/${id}`, put);
};
/* de todo parameter is een object met de properties: 
Name, Insert, FirstName, Street, Number, City, Zipcode, DayOfBirth, 
RegistryNumber, CategoryLicense, Login, Password*/
export const postDrivers = async (post) => {
  return await axios.post("https://localhost:5043/Driver/Driver", post);
};


export const getGasCards = async () => {
  return await axios.get("https://localhost:5043/GasCard/AllGasCards");
};
export const getGasCardsById = async (id) => {
  return await axios.get(`https://localhost:5043/GasCard/GasCardById/${id}`);
};
export const deleteGasCards = async (id) => {
  return await axios.delete(`https://localhost:5043/GasCard/GasCard/${id}`);
};
export const updateGasCards = async (id, put) => {
  return await axios.patch(`https://localhost:5043/GasCard/GasCard/${id}`, put);
};
/* de todo parameter is een object met de properties: 
CardNumber, ValidationDate, Pin, Fuel, Blocked*/
export const postGasCards = async (post) => {
  return await axios.post("https://localhost:5043/GasCard/GasCard", post);
};


export const getVehicles = async () => {
  return await axios.get("https://localhost:5043/Vehicle/AllVehicles");
};
export const getVehiclesById = async (id) => {
  return await axios.get(`https://localhost:5043/Vehicle/VehicleById/${id}`);
};
export const deleteVehicles = async (id) => {
  return await axios.delete(`https://localhost:5043/Vehicle/Vehicle/${id}`);
};
export const updateVehicles = async (id, put) => {
  return await axios.patch(`https://localhost:5043/Vehicle/Vehicle/${id}`, put);
};
/* de todo parameter is een object met de properties: 
Nummerplaat, Merk, Type, IdVoertuig*/
export const postVehicles = async (post) => {
  return await axios.post("https://localhost:5043/Vehicle/Vehicle", post);
};

/* de todo parameter is een object met de properties:
Email, Password */  
export const loginUser = async (post) => {
  return await axios.post("https://localhost:5043/Authentication/Login", post);
}
export const getUsers = async () => {
  return await axios.get("https://localhost:5043/Authentication/AllUsers");
}
export const getUsersById = async (id) => {
  return await axios.get(`https://localhost:5043/Authentication/UserById/${id}`);
}
export const deleteUsers = async (id) => {
  return await axios.delete(`https://localhost:5043/Authentication/User/${id}`);
}
export const updateUsers = async (id, put) => {
  return await axios.patch(`https://localhost:5043/Authentication/User/${id}`, put);
}
/* de todo parameter is een object met de properties:
Name, FirstName, Email, Password, Role*/
export const postUsers = async (post) => {
  return await axios.post("https://localhost:5043/Authentication/User", post);
}
