const axios = require('axios');
const { Driver } = require('../db');

async function getNationalities(req, res) {
  try {
    // Obtener conductores de la API
    const response = await axios.get('http://localhost:5000/drivers');
    const driversFromAPI = response.data;

    // Obtener todas las nacionalidades de la API
    const nationalitiesFromAPI = driversFromAPI.map(driver => driver.nationality);

    // Obtener todas las nacionalidades de la base de datos
    const driversFromDB = await Driver.findAll({ attributes: ['nationality'] });
    const nationalitiesFromDB = driversFromDB.map(driver => driver.nationality);

    // Combinar y eliminar duplicados
    const allNationalities = [...new Set([...nationalitiesFromAPI, ...nationalitiesFromDB])];

    res.json(allNationalities);
  } catch (error) {
    console.error('Error al obtener las nacionalidades:', error.message);
    res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Error interno del servidor' });
  }
}

module.exports = {
  getNationalities,
};
