const axios = require('axios'); 
const { Driver } = require("../db");

// Controlador para obtener todos los conductores
async function getDrivers(req, res) {
  try {
    // Parámetros de consulta para paginación
    const page = parseInt(req.query.page) || 1; // Página solicitada (por defecto, página 1)
    const limit = parseInt(req.query.limit) || 10; // Tamaño de la página (por defecto, 10 conductores por página)

    // Calcular el índice de inicio y fin de los conductores a retornar
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Obtener conductores de la base de datos (solo para la página actual)
    const driversFromDB = await Driver.findAll({ offset: startIndex, limit: limit });

    // Obtener conductores de la API
    const response = await axios.get('http://localhost:5000/drivers');
    const driversFromAPI = response.data;

    // Asignar imagen por defecto a los conductores de la API si no tienen una definida
    const driversWithDefaultImageFromAPI = driversFromAPI.map(driver => ({
      ...driver,
      image: driver.image || {
        url: 'https://metro.co.uk/wp-content/uploads/2015/06/ad_174020392-e1487698550420.jpg?quality=80&strip=all',
        imageby: 'Autor Desconocido'
      }
    }));

    // Combinar conductores de la base de datos y de la API
    const allDrivers = [...driversFromDB, ...driversWithDefaultImageFromAPI];

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
