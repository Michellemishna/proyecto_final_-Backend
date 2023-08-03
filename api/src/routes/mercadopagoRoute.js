const { Router } = require("express");
const { createPay} = require("../handlers/getMercadopago");
const router = Router();


router.post("/", createPay);




module.exports = router;
