
const { Router } = require("express");
const { postPayments, getSuccess, getFailure, getPending, getwebhook} = require("../handlers/getPayments");
const router = Router();


router.post("/", postPayments);
router.get("/success/:id", getSuccess)
router.get("/failure/:id", getFailure)
router.get("/pending/:id", getPending)
// router.post("/webhook", getwebhook)





module.exports = router;