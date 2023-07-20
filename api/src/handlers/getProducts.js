const {findDb, findAllApi} = require("../controllers/findAllApi")
const { Product } = require("../db");
const { Op } = require("sequelize");

let cargo =false;
const getProducts =async (req, res) => {
    const { name } = req.query
    try {
        let result = cargo ? await Product.findAll({ include: { all: true } }) : await findAllApi()
        cargo = true;
    
        if (name) {
          let filtrado = await Product.findAll({ where: { title: { [Op.iLike]: `%${name}%` } }, include: { all: true } })
          filtrado.length ? res.send(filtrado) : res.status(404).send("Product not found")
        } else res.json(result);
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
    };


    module.exports = getProducts;
