const { Router } = require("express");
const {
  getCustomers,
  getCustomerId,
  createCustomer,
  modifyCustomer,
  deleteCustomer,
} = require("../handlers/getCustomers");
const router = Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerId);
router.post("/", createCustomer);
//router.post("/login", loginCustomers);
router.put("/:id", modifyCustomer);
router.delete("/:user", deleteCustomer);

module.exports = router;
