const axios = require('axios');
const { Driver } = require('../db');
const { Op, fn, col } = require('sequelize');

const getDriversByName = async (req, res) => {
  const { name } = req.query;

  // Validar que el nombre esté presente en la consulta
  if (!name) {
    return res.status(400).json({ error: 'El parámetro "name" es requerido' });
  }

  try {
    // Buscar en la API
    const apiUrl = `http://localhost:5000/drivers`;
    const response = await axios.get(apiUrl);
    const apiDrivers = response.data;

    // Filtrar los conductores de la API por nombre
    const filteredApiDrivers = apiDrivers.filter(driver =>
      driver.name.forename.toLowerCase().includes(name.toLowerCase()) ||
      driver.name.surname.toLowerCase().includes(name.toLowerCase())
    );

    // Buscar en la base de datos
    const dbDrivers = await Driver.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${name}%`, // Usar iLike para insensibilidad a mayúsculas/minúsculas
            },
          },
          {
            lastName: {
              [Op.iLike]: `%${name}%`, // Usar iLike para insensibilidad a mayúsculas/minúsculas
            },
          },
        ],
      },
    });

    // Combinar resultados de la API y la base de datos
    const combinedDrivers = [...filteredApiDrivers, ...dbDrivers];

    // Devolver todos los resultados combinados
    return res.json(combinedDrivers);
  } catch (error) {
    console.error('Error in getDriversByName:', error);

    // Manejar errores específicos de la API
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }

    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getDriversByName };
