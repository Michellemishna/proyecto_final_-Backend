const axios = require("axios");
const { findCategoryDB, findDb } = require("../controllers/findAllApi");
const { Category } = require("../db");

const getCategories = async (req, res) => {
  try {
    const dbCategories = await findCategoryDB();
    if (!dbCategories.length) {
      // const URL = `https://api.mercadolibre.com/categories/`
      const id = [
        { id: "MLA6049", name: "Auriculares" },
        { id: "MLA3577", name: "Cargadores y Fuentes" },
        { id: "MLA7415", name: "Cartuchos de Tinta" },
        { id: "MLA1676", name: "Impresoras" },
        { id: "MLA14407", name: "Monitores" },
        { id: "MLA1716", name: "Mouse Pads" },
        { id: "MLA1652", name: "Notebooks" },
        { id: "MLA1649", name: "PC" },
        { id: "MLA3561", name: "Recargas de Tinta"}
    
      ].map((category) => {
        return {
          id: category.id,
          name: category.name,
        };
      });
      const createdCategories = await Category.bulkCreate(id);
      res.status(200).send(id);
    } else {
      res.send(dbCategories);
    }
  } catch (err) {
    console.log(err);
  }
};

const categoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const allProducts = await findDb();
    if (id) {
      let found = await allProducts.filter((product) =>
        product.category ? product.category === id : product.category.id === id
      );
      res.status(200).send(found);
    } else {
      res.status(400).send("error");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCategories, categoryId };
