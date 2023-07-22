const { Router } = require("express");
const {getCategories, categoryId} = require("../handlers/getCategories");
const router = Router();


router.get("/", getCategories);
router.get("/:id", categoryId);



module.exports = router;