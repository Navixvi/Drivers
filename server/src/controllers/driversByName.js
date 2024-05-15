const axios = require('axios');
const { Op } = require('sequelize');
const { Driver } = require('../models/Driver');

async function getDriversByName(req, res) {
  try {
    const name = req.query; // Obtener el nombre de la consulta y convertirlo a minúsculas
    const searchString = name.toLowerCase();

    // Buscar conductores en la base de datos cuyos nombres coincidan con la consulta
    const dbDrivers = await Driver.findAll({
      where: {
        // Buscar el nombre del conductor que contenga la cadena de búsqueda, sin importar mayúsculas o minúsculas
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchString}%` } },
          { lastName: { [Op.iLike]: `%${searchString}%` } }
        ]
      },
      limit: 15 // Limitar a 15 resultados
    });

    // Si no se encuentran conductores en la base de datos, hacer una solicitud a la API
    if (dbDrivers.length === 0) {
      const apiUrl = `http://localhost:5000/drivers?forename=${searchString}`;
      const apiResponse = await axios.get(apiUrl);
      const apiDrivers = apiResponse.data;

      // Devolver los conductores encontrados en la API
      if (apiDrivers.length === 0) {
        return res.status(404).json({ message: "No se encontraron conductores" });
      }
      return res.json(apiDrivers.slice(0, 15)); // Limitar a 15 resultados
    }

    // Devolver los conductores encontrados en la base de datos
    return res.json(dbDrivers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  getDriversByName
};
