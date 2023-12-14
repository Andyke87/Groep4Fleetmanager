/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonDeleteDriver from '../Buttons/ButtonsDrivers/ButtonDeleteDriver';
import ButtonUpdateDriver from '../Buttons/ButtonsDrivers/ButtonUpdateDriver';
import ButtonAddDriver from '../Buttons/ButtonsDrivers/ButtonAddDriver';
import ButtonClearInput from '../Buttons/ButtonClearInput';
import { getUsers } from '../../../API/index';
import ButtonAddUser from '../Buttons/ButtonsUsers/ButtonAddUser';
import ButtonUpdateUser from '../Buttons/ButtonsUsers/ButtonUpdateUser';
import ButtonDeleteUser from '../Buttons/ButtonsUsers/ButtonDeleteUser';

const FormulierGebruikers = () => {

  const [idUser, setIdUser] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsers();
                const sortedUsers = response.data.sort((a, b) => a.id - b.id);
                setUsers(sortedUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
        case 'idUser': setIdUser(value); break;
        case 'name': setName(value); break;
        case 'firstName': setFirstName(value); break;
        case 'email': setEmail(value); break;
        case 'password': setPassword(value); break;
        case 'role': setRole(value); break;
        default:
            break;
    }
};

  const handleSubmit = (event) => {
    event.preventDefault();
   console.log('Formulier ingediend:', { idUser, name, firstName, email, password, role });
    };


  const handleRowClick = (selectedRow) => {
    setIdUser(selectedRow.idUser);
    setName(selectedRow.name);
    setFirstName(selectedRow.firstName);
    setEmail(selectedRow.email);
    setPassword(selectedRow.password);
    setRole(selectedRow.role);
  };

  return (
    <form onSubmit={handleSubmit}>
      <table >
        <thead>
          <tr >
            <th>Id</th>
            <th>Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            </tr>
        </thead>
        <tbody>
          {users.map(user => (
          <tr key={user.idUser}  onClick={() => handleRowClick(user)}>
            <td>{user.idUser}</td>
            <td>{user.name}</td>
            <td>{user.firstName}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.role}</td>
          </tr>))}
        </tbody>
      </table>
      <div className="form-container">
        <div className="col">
            <label htmlFor="idUser">Id</label>
            <input
                className="input"
                placeholder='Only numbers'
                type="text"
                name="idUser"
                value={idUser}
                onChange={handleChange}
            />
        </div>

        <div className="col">
          <label htmlFor="name">Name</label>
            <input
                className="input"
                placeholder='Max 50 characters'
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
            />
        </div>

        <div className="col">
          <label htmlFor="firstName">First Name</label>
            <input
                className="input"
                placeholder='Max 50 characters'
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
            />
        </div>

        <div className="col">
          <label htmlFor="email">Email</label>
            <input
                className="input"
                placeholder='Max 50 characters'
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
            />
        </div>

        <div className="col">
          <label htmlFor="password">Password</label>
            <input
                className="input"
                placeholder='Max 50 characters'
                type="text"
                name="password"
                value={password}
                onChange={handleChange}
            />
        </div>

        <div className="col">
          <label htmlFor="role">Role</label>
            <input
                className="input"
                placeholder='Max 50 characters'
                type="text"
                name="role"
                value={role}
                onChange={handleChange}
            />
        </div>
        
      <div className='containerButtonsNieuw'>
        <ButtonAddUser
            IdUser={idUser}
            Name={name}
            FirstName={firstName}
            Email={email}
            Password={password}
            Role={role}
        />

        <ButtonUpdateUser
            IdUser={idUser}
            Name={name}
            FirstName={firstName}
            Email={email}
            Password={password}
            Role={role}
        />

        <ButtonDeleteUser
            IdUser={idUser}
            Name={name}
            FirstName={firstName}
            Email={email}
            Password={password}
            Role={role}
        />

        
        </div>
        </div>
        <div>
          <ButtonClearInput/>
        </div>
        
    </form>
  );
};
export default FormulierGebruikers;

