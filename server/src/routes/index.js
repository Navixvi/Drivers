const { Router } = require("express");
const router = Router();

// Importa los controladores necesarios
const { getDrivers } = require("../conntrollers/driversController");
const { getDriverById } = require("../conntrollers/driversById");
const { getDriversByName } = require("../conntrollers/driversByName");
const { createDriver } = require("../conntrollers/createDriver");


// Rutas para los conductores
router.get("/drivers", getDrivers);
router.get("/drivers/:idDriver", getDriverById);
router.get("/drivers/name", getDriversByName);
router.post("/drivers", createDriver);

// Ruta para los equipos
//router.get("/teams", getTeams);

module.exports = router;
