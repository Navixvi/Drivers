const axios = require('axios');
async function getNationalities(req, res) {
    try {
      // Obtener conductores de la API
      const response = await axios.get('http://localhost:5000/drivers');
      const driversFromAPI = response.data;
      
      // Obtener todas las nacionalidades
      const allNationalities = driversFromAPI.map(driver => driver.nationality);
    
      // Eliminar duplicados
      const uniqueNationalities = [...new Set(allNationalities)];
    
      res.json(uniqueNationalities);
    } catch (error) {
      console.error('Error al obtener las nacionalidades:', error.message);
      res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Error interno del servidor' });
    }
  }
  
  module.exports = {
    getNationalities,
  };
  