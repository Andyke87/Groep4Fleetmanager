// Importeer de nodige modules.
import axios from 'axios';
import fs from 'fs';

// Definieer de functies.
function getSwagger() {
  return axios.get('http://localhost:5043/swagger/index.html');
}

function parseSwaggerConfig(swaggerConfig) {
  const swaggerObject = JSON.parse(swaggerConfig);
  return swaggerObject;
}

function saveSwaggerConfigToFile(swaggerConfig) {
  fs.writeFileSync(swaggerFile, JSON.stringify(swaggerConfig, null, 2));
}

// Gebruik de functie getSwagger() om de swagger config op te halen.
const swaggerConfig = await getSwagger();

// Gebruik de functie parseSwaggerConfig() om de swagger config te parsen.
const swaggerObject = parseSwaggerConfig(swaggerConfig);

// Gebruik de functie saveSwaggerConfigToFile() om de swagger config als JSON file op te slaan.
saveSwaggerConfigToFile(swaggerObject);