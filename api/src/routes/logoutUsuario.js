const { Router } = require("express");
const { logoutCustomers } = require("../handlers/logoutCustomer.js");
const router = Router();
// usuario logout
router.post("/", logoutCustomers);

module.exports = router;
