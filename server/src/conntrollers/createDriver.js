const { Driver, Team} = require ("../db");

async function createDriver(req, res) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { name, lastName, dob, nationality, teams, image, description } = req.body;

    // Crear el conductor en la base de datos
    const newDriver = await Driver.create({
      name,
      lastName,
      birthDate: dob,
      nationality,
      description,
      image
    });

    // Verificar si se proporcionaron equipos y asociarlos al conductor
    if (teams && teams.length > 0) {
      // Buscar los equipos en la base de datos
      const foundTeams = await Team.findAll({
        where: { id: teams } // Suponiendo que teams es un array de IDs de equipos
      });

      // Asociar los equipos encontrados al nuevo conductor
      await newDriver.addTeams(foundTeams);
    }

    // Devolver el nuevo conductor creado junto con los equipos asociados
    const driverWithTeams = await Driver.findByPk(newDriver.id, {
      include: Team // Incluir los equipos asociados en la respuesta
    });

    // Responder con el nuevo conductor y los equipos asociados
    return res.status(201).json(driverWithTeams);
  } catch (error) {
    console.error('Error creating driver:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {
  createDriver
};
