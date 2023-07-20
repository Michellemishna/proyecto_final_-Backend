const { Router } = require("express");
const getProducts = require("../handlers/getProducts");
const getCategories = require("../handlers/getCategories");

const rout = Router();

rout.get("/", getProducts);
rout.get("/categories", getCategories);


module.exports = rout;