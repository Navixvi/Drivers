const axios = require('axios'); // Importa axios para hacer solicitudes HTTP
const { Driver } = require("../db");

// Controlador para obtener todos los conductores
async function getDrivers(req, res) {
  try {
    // Obtener conductores de la base de datos
    const driversFromDB = await Driver.findAll();

    // Obtener conductores de la API
    const response = await axios.get('http://localhost:5000/drivers');
    const driversFromAPI = response.data;

    // Asignar imagen por defecto a los conductores de la API si no tienen una definida
    const driversWithDefaultImageFromAPI = driversFromAPI.map(driver => ({
      ...driver,
      image: driver.image || {
        url: 'URL_IMAGEN_POR_DEFECTO',
        imageby: 'Autor Desconocido'
      }
    }));

    // Combinar conductores de la base de datos y de la API
    const allDrivers = [...driversFromDB, ...driversWithDefaultImageFromAPI];

    res.json(allDrivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  getDrivers
};
