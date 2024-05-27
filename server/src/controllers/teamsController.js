const axios = require('axios');
const { Team } = require('../db');

async function getTeams(req, res) {
  try {
    // Verificar si hay equipos en la base de datos
    const existingTeams = await Team.findAll();

    if (existingTeams.length === 0) {
      // La base de datos está vacía, obtener equipos de la API y guardarlos
      const apiUrl = 'http://localhost:5000/drivers'; // URL de la API de conductores
      const response = await axios.get(apiUrl);
      const apiDrivers = response.data;

      // Extraer los nombres de los equipos de cada conductor y eliminar duplicados
      const teamsSet = new Set();
      apiDrivers.forEach(driver => {
        if (driver.teams) {
          const driverTeams = driver.teams.split(',').map(team => team.trim());
          driverTeams.forEach(team => teamsSet.add(team));
        }
      });

      // Convertir el conjunto de equipos de nuevo a un array
      const uniqueTeams = Array.from(teamsSet);

      // Guardar los equipos únicos en la base de datos
      const savedTeams = await Team.bulkCreate(uniqueTeams.map(name => ({ name })));

      // Devolver los equipos obtenidos de la API
      return res.json(savedTeams);
    } else {
      // La base de datos no está vacía, devolver los equipos almacenados en ella
      return res.json(existingTeams);
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {
  getTeams
};
