/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import '../Formulieren/Formulieren.css';
import ButtonClearInput from '../Buttons/ButtonClearInput';
import { getUsers } from '../../../API/index';
import ButtonAddUser from '../Buttons/ButtonsUsers/ButtonAddUser';
import ButtonUpdateUser from '../Buttons/ButtonsUsers/ButtonUpdateUser';
import ButtonDeleteUser from '../Buttons/ButtonsUsers/ButtonDeleteUser';

const FormulierGebruikers = ({searchTerm}) => {

  const [id, setIdUser] = useState('');
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
        case 'id': setIdUser(value); break;
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
   console.log('Formulier ingediend:', { id, name, firstName, email, password, role });
    };


  const handleRowClick = (selectedRow) => {
    setIdUser(selectedRow.id);
    setName(selectedRow.name);
    setFirstName(selectedRow.firstName);
    setEmail(selectedRow.email);
    setPassword(selectedRow.password);
    setRole(selectedRow.role);
  };

  const filteredUsers = users.filter((user) => {
    if (searchTerm === '') {
      return user;
    }
    if (user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return user;
    }
    return null;
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="table-container">
        <table >
          <thead>
            <tr >
              <th>User Id</th>
              <th>First Name</th>
              <th>Name</th>              
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
            <tr key={user.id}  onClick={() => handleRowClick(user)}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
      <div className="form-container">
        <div className="col">
            <label htmlFor="id">User Id</label>
            <input
                className="input"
                placeholder='Only numbers'
                type="text"
                name="id"
                value={id}
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
          <select
            className="input"
            name="role"
            value={role}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
      </div>     
      <div className='containerButtonsNieuw'>
        <ButtonAddUser
            Name={name}
            FirstName={firstName}
            Email={email}
            Password={password}
            Role={role}
        />
        <ButtonUpdateUser
            Id={id}
            Name={name}
            FirstName={firstName}
            Email={email}
            Password={password}
            Role={role}
        />
        <ButtonDeleteUser
            Id={id}
        />
        </div>
        <div>
          <ButtonClearInput/>
        </div>
        
    </form>
  );
};
export default FormulierGebruikers;

