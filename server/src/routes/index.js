const { Router } = require("express");
const router = Router();

// Importa los controladores necesarios
const { getDrivers } = require("../controllers/driversController");
const { getDriverById } = require("../controllers/driversById");
const { getDriversByName } = require("../controllers/driversByName");
const { createDriver } = require("../controllers/createDriver");
const { getTeams } = require("../controllers/teamsController");


// Rutas para los conductores
router.get("/drivers", getDrivers);
router.get("/drivers/:idDriver", getDriverById);
router.get("/drivers/name", getDriversByName);
router.post("/drivers", createDriver);

// Ruta para los equipos
router.get("/teams", getTeams);

module.exports = router;
