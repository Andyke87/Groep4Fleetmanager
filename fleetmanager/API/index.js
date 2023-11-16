import axios from 'axios';

function getSwagger() {
  return axios.get('http://localhost:5043/swagger/index.html');
}

function parseSwaggerConfig(swaggerConfig) {
  const swaggerObject = JSON.parse(swaggerConfig);
  return swaggerObject;
}

function saveSwaggerConfigToFile(swaggerConfig) {
  const swaggerFile = `${process.env.PUBLIC_URL}/swagger.json`;
  const fs = require('fs');

  fs.writeFileSync(swaggerFile, JSON.stringify(swaggerConfig, null, 2));
}

// Gebruik de functie getSwagger() om de swagger config op te halen.
const swaggerConfig = await getSwagger();

// Gebruik de functie parseSwaggerConfig() om de swagger config te parsen.
const swaggerObject = parseSwaggerConfig(swaggerConfig);

// Gebruik de functie saveSwaggerConfigToFile() om de swagger config als JSON file op te slaan.
saveSwaggerConfigToFile(swaggerObject);