const {findDb, findAllApi} = require("../controllers/findAllApi")
const { Product, Category } = require("../db");
const { Op } = require("sequelize");

let cargo =false;
const getAllProducts =async (req, res) => {
    const { name } = req.query;
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

const getProductId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const searchProduct = await Product.findByPk(id, { include: { all: true } });
      if (searchProduct) {
        res.status(200).send(searchProduct);
      } else {
        res.status(400).json("ID not found");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const postNewProduct = async (req, res) => {
  try {
    const { title, image, price, stock, category, sold } = req.body;
    console.log(req.body);
    if (!title || !image || !price || !stock || !category || !sold) {
      res.status(404).send("Solicitud incompleta");
    } else {
      const create = await Product.create({
        id: `MLA${Math.round(Math.random() * 1000000000)}`,
        title,
        image,
        price,
        stock,
        category,
        sold
      });
      const foundCategory = await Category.findOne({
        where: {
          id: category,
        },
      });
      await create.addCategory(foundCategory);
      
      res.status(200).send("Nuevo producto creado correctamente!");
    }
  } catch (error) {
    console.log(error);
  }
};

    module.exports = {getAllProducts, getProductId, postNewProduct};
