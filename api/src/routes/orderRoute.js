const { Router } = require("express");
const {getOrder, getOrderById, createOrder, modifyOrder, deleteOrder} = require("../handlers/getOrders");
const router = Router();


router.get("/", getOrder);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", modifyOrder);
router.delete("/:id", deleteOrder);




module.exports = router;