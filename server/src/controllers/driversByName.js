const axios = require('axios');
const { Driver } = require('../db');
const { Op } = require('sequelize');

const getDriversByName = async (req, res) => {
  const { name } = req.query;

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
              [Op.substring]: name,
            },
          },
          {
            lastName: {
              [Op.substring]: name,
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
    return res.status(500).json({ error: 'Error al buscar conductores por nombre' });
  }
};

module.exports = { getDriversByName };
