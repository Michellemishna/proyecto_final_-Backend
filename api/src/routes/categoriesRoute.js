const { Router } = require("express");
const {getCategories} = require("../handlers/getCategories");
const router = Router();


router.get("/", getCategories);

module.exports = router;