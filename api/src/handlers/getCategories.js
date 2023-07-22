const axios = require("axios");
const {findCategoryDB, findDb} = require('../controllers/findAllApi');
const { Category } =require("../db");


const getCategories = async (req,res) => {
    try {
        const dbCategories = await findCategoryDB();
        if (!dbCategories.length) {
            // const URL = `https://api.mercadolibre.com/categories/`
    const id = [
    {"id": "MLA6049",
    "name": "Auriculares"},
    {"id": "MLA4980",
    "name": "Pendrives"},
    {"id": "MLA9729",
    "name": "Hubs USB"},
     {"id": "MLA1694",
    "name": "Memorias RAM"},
    {"id": "MLA1693",
    "name": "Procesadores"},
   {"id": "MLA83769",
    "name": "Otros"},
    {"id": "MLA430901",
    "name": "Routers"},
   {"id": "MLA1719",
    "name": "Estabilizadores"},
    {"id": "MLA1720",
    "name": "UPS"},
{"id": "MLA1676",
    "name": "Impresoras"},
   {"id": "MLA1652",
    "name": "Notebooks"},
    {"id": "MLA9276",
    "name": "Lectores de Código de Barras"},
      {"id": "MLA14407",
    "name": "Monitores"},
     {"id": "MLA416867",
    "name": "Fuentes"},
     {"id": "MLA418043",
    "name": "Soportes"},
    {"id": "MLA1649",
    "name": "PC"},
    {"id": "MLA126843",
    "name": "All In One"},
    {"id": "MLA1667",
    "name": "Webcams"},
     {"id": "MLA3378",
    "name": "Parlantes"},
     {"id": "MLA454380",
    "name": "Otros"},
     {"id": "MLA82085",
    "name": "Tablets"},
    ].map((category) => {
              return {
                id: category.id,
                name: category.name,
              };
            });
          const createdCategories = await Category.bulkCreate(id);
          res.status(200).send(id);
        } else {
          res.send(dbCategories)
        }
      } catch (err) {
        console.log(err);
      }
    }

    const categoryId= async (req, res) => {
      try {
        const { id } = req.params;
        const allProducts = await findDb()
        if (id) {
          let found = await allProducts.filter((product) => product.category ? product.category === id : product.category.id === id)
          res.status(200).send(found)
        } else {
          res.status(400).send('error')
        }
      } catch (error) {
        console.log(error)
      }};
    

    module.exports = {getCategories, categoryId} ;