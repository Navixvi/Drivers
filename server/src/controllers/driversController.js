const axios = require('axios');
const { Driver, Team } = require("../db");

async function getDrivers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const team = req.query.team || '';
    const source = req.query.source || '';
    let nationality = req.query.nationality || '';

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Opciones de consulta para obtener conductores de la base de datos
    const dbOptions = {
      offset: startIndex,
      limit: limit,
      include: Team, // Incluir los equipos asociados
      where: {},
    };

    // Filtrar por equipo si se proporciona
    if (team) {
      dbOptions.where['$Teams.name$'] = team;
    }

    // Obtener conductores de la base de datos
    const driversFromDB = await Driver.findAll(dbOptions);

    // Obtener conductores de la API
    const response = await axios.get('http://localhost:5000/drivers');
    let driversFromAPI = response.data;

    // Asignar imagen por defecto a los conductores de la API si no tienen una definida
    driversFromAPI = driversFromAPI.map(driver => ({
      ...driver,
      image: driver.image || {
        url: 'https://media.istockphoto.com/id/1087022094/es/foto/piloto-de-carreras.jpg?s=2048x2048&w=is&k=20&c=xMaW128YdFBW-J6v2qp00Ubd7ERiB54_l4McbDgMZZo=',
        imageby: 'Autor Desconocido',
      }
    }));

    // Filtrar conductores por equipo si se proporciona
    if (team) {
      driversFromAPI = driversFromAPI.filter(driver => driver.teams.includes(team));    
    }
    
    if (nationality) {
      driversFromAPI = driversFromAPI.filter(driver => driver.nationality.toLowerCase() === nationality.toLowerCase());
    }

    let allDrivers;
    if (source === 'API') {
      allDrivers = driversFromAPI;
    } else if (source === 'DB') {
      allDrivers = driversFromDB;
    } else {
      allDrivers = [...driversFromDB, ...driversFromAPI];
    }

    const totalDrivers = allDrivers.length;
    const currentDrivers = allDrivers.slice(startIndex, endIndex);

    res.json({
      drivers: currentDrivers,
      totalPages: Math.ceil(totalDrivers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
}

module.exports = {
  getDrivers,
};
