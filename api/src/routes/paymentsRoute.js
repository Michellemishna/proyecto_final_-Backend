
const { Router } = require("express");
const { postPayments, getState} = require("../handlers/getPayments");
const router = Router();


router.post("/", postPayments);
router.get("/feedback", getState)





module.exports = router;