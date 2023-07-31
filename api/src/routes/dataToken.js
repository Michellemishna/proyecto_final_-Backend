const { Router } = require("express");
const verificarToken = require("../handlers/datosPorToken");

const router = Router();

router.post("/", verificarToken);

module.exports = router;
