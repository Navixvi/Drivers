const axios = require('axios'); 
const { Driver } = require("../db");

// Controlador para obtener todos los conductores
async function getDrivers(req, res) {
  try {
    // Parámetros de consulta para paginación y filtrado
    const page = parseInt(req.query.page) || 1; // Página solicitada (por defecto, página 1)
    const limit = parseInt(req.query.limit) || 9; // Tamaño de la página (por defecto, 10 conductores por página)
    const team = req.query.team || ''; // Filtro por equipo
    const source = req.query.source || ''; // Filtro por origen (API o DB)

    // Calcular el índice de inicio y fin de los conductores a retornar
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Obtener conductores de la base de datos (con filtro por equipo si se proporciona)
    const dbOptions = {
      offset: startIndex,
      limit: limit,
      where: {}
    };
    if (team) {
      dbOptions.where.team = team;
    }
    const driversFromDB = await Driver.findAll(dbOptions);

    // Obtener conductores de la API
    const response = await axios.get('http://localhost:5000/drivers');
    let driversFromAPI = response.data;

    // Asignar imagen por defecto a los conductores de la API si no tienen una definida
    driversFromAPI = driversFromAPI.map(driver => ({
      ...driver,
      image: driver.image || {
        url: 'https://media.istockphoto.com/id/1087022094/es/foto/piloto-de-carreras.jpg?s=2048x2048&w=is&k=20&c=xMaW128YdFBW-J6v2qp00Ubd7ERiB54_l4McbDgMZZo=',
        imageby: 'Autor Desconocido'
      }
    }));

    // Filtrar conductores por equipo si se proporciona
    if (team) {
      driversFromAPI = driversFromAPI.filter(driver => driver.team === team);
    }

    // Combinar conductores de la base de datos y de la API según el filtro de origen
    let allDrivers;
    if (source === 'API') {
      allDrivers = driversFromAPI;
    } else if (source === 'DB') {
      allDrivers = driversFromDB;
    } else {
      allDrivers = [...driversFromDB, ...driversFromAPI];
    }

    // Calcular el número total de conductores (para la paginación)
    const totalDrivers = allDrivers.length;

    // Extraer los conductores de la página actual
    const currentDrivers = allDrivers.slice(startIndex, endIndex);

    // Enviar respuesta con los conductores de la página actual y metadatos de paginación
    res.json({
      drivers: currentDrivers,
      totalPages: Math.ceil(totalDrivers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  getDrivers
};
