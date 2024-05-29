const axios = require('axios');
const { Driver, Team } = require('../db'); 

// Controlador para obtener el detalle de un conductor por ID
async function getDriverById(req, res) {
  const driverId = req.params.idDriver;

  try {
    // Buscar el conductor en la base de datos por ID, incluyendo los equipos asociados
    const driverFromDB = await Driver.findByPk(driverId, {
      include: {
        model: Team,
        as: 'Teams',
        attributes: ['name']
      }
    });

    // Si el conductor se encuentra en la base de datos, devolverlo
    if (driverFromDB) {
      // Formatear equipos de la base de datos
      const teamsFromDB = driverFromDB.Teams.map(team => team.name);
      driverFromDB.dataValues.teams = teamsFromDB; // Agregar los equipos al objeto driver
      return res.json(driverFromDB);
    }

    // Si el conductor no se encuentra en la base de datos, obtenerlo de la API
    const response = await axios.get(`http://localhost:5000/drivers/${driverId}`);
    const driverFromAPI = response.data;

    // Desactivar la caché de la respuesta
    res.setHeader('Cache-Control', 'no-cache');

    // Devolver el conductor obtenido de la API
    res.json(driverFromAPI);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  getDriverById
};
