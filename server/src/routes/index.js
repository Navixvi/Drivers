const { Router } = require("express");
const router = Router();

// Importa los controladores necesarios
const { getDrivers } = require("../controllers/driversController");
const { getDriverById } = require("../controllers/driversById");
const { getDriversByName } = require("../controllers/driversByName");
const { createDriver } = require("../controllers/createDriver");
const { getTeams } = require("../controllers/teamsController");
const {getNationalities} = require("../controllers/getNationalities");

// Rutas para los conductores

// Obtiene una lista de conductores con soporte para paginación y filtrado
router.get("/drivers", getDrivers);

// Obtiene un conductor específico por su ID
router.get("/drivers/:idDriver", getDriverById);

// Busca conductores por nombre
router.get("/name", getDriversByName);

// Crea un nuevo conductor
router.post("/drivers", createDriver);

// Ruta para los equipos

// Obtiene una lista de equipos, ya sea de la base de datos o de la API externa si la base de datos está vacía
router.get("/teams", getTeams);

// Ruta para las nacionalidades 
router.get('/nationalities', getNationalities);

module.exports = router;
