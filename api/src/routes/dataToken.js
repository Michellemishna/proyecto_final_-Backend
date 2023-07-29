const { Router } = require("express");
const verificarToken = require("../handlers/datosPorToken");

const router = Router();

router.get("/", verificarToken, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
