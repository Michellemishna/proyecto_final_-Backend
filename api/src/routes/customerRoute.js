const { Router } = require("express");
const {getCustomers, getCustomerId, createCustomer,deleteCustomer} = require("../handlers/getCustomers");
const router = Router();


router.get("/", getCustomers);
router.get("/:id", getCustomerId);
router.post("/", createCustomer);
router.delete("/:id", deleteCustomer);




module.exports = router;