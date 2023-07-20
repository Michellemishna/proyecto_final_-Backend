const { Router } = require("express");
const {getAllProducts, getProductId, postNewProduct} = require("../handlers/getProducts");
const getCategories = require("../handlers/getCategories");

const rout = Router();

rout.get("/", getAllProducts);
rout.get("/categories", getCategories);
rout.get("/:id", getProductId);
rout.post("/", postNewProduct)


module.exports = rout;