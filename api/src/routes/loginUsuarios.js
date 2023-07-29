const { Router } = require("express");
const { loginCustomer } = require("../handlers/loginCustomer.js");
const router = Router();

router.post("/", loginCustomer);

module.exports = router;
