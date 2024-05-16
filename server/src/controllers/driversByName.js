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

    // Si se encuentran conductores en la API, devolver los resultados filtrados
    if (filteredApiDrivers.length > 0) {
      return res.json(filteredApiDrivers);
    }
    
    // Si no se encuentran conductores en la API, buscar en la base de datos
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

    // Devolver los conductores encontrados en la base de datos
    return res.json(dbDrivers);
  } catch (error) {
    console.error('Error in getDriversByName:', error);
    return res.status(500).json({ error: 'Error al buscar conductores por nombre' });
  }
};

module.exports = { getDriversByName };
