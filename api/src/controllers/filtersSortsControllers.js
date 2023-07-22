const { Product, Category } = require("../db");
const { Sequelize, DataTypes, Op } = require("sequelize");

const filtOrderProd = async (obj) => {
  try {
    const { category, price_min, price_max, sort_by, order } = obj;

    // Realiza la consulta de los productos según las opciones definidas
    let products2 = await Product.findAll();

    let products = [];
    if (category.length > 0) {
      products = products2.filter(
        (product) => product.dataValues.category === category
      );
    }

    // Filtrar por precio mínimo
    if (price_min) {
      products = products.filter(
        (product) => product.price >= parseInt(price_min)
      );
    }

    // Filtrar por precio máximo
    if (price_max) {
      products = products.filter(
        (product) => product.price <= parseInt(price_max)
      );
    }

    // Ordenar según el campo y orden proporcionado
    if (sort_by && order) {
      products.sort((a, b) => {
        const fieldA = a[sort_by];
        const fieldB = b[sort_by];
        if (order === "asc") {
          return fieldA - fieldB;
        } else {
          return fieldB - fieldA;
        }
      });
    }

    if (products.length === 0)
      return "No hay resultados para los filtros aplicados";
    return products;
  } catch (error) {
    console.log(
      "Hubo un error al aplicar los filtros y ordenamientos: " + error
    );
  }
};

module.exports = {
  filtOrderProd,
};
