const { Router } = require("express");
const { baneoUsuarios } = require("../handlers/baneoRoute.js");

const router = Router();

router.post("/", baneoUsuarios);

module.exports = router;
