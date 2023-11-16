// Importeer React.
import React from 'react';

// Importeer de swagger config.
import swaggerConfig from './swagger.json';

// Definieer de component.
const MyComponent = async () => {
  // Gebruik de functie parseSwaggerConfig() om de swagger config te parsen.
  const swaggerObject = parseSwaggerConfig(swaggerConfig);

  // Maak een query op de users tabel.
  const usersTable = swaggerObject.paths['/users'];

  // Haal de resultaten van de query op.
  const usersData = await fetch(usersTable.get).json();

  // Toon de resultaten van de query.
  return (
    <div>
      <h1>Gebruikers</h1>
      {usersData.data.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

// Exporteer de component.
export default MyComponent;