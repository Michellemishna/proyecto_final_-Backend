const { Product, Category } = require("../db");
const productos = require("../utils/product")
const { Op } = require("sequelize");


const findDb = async () => {
  const foundData = await Product.findAll({ include: { all: true } });
  return foundData;
}
  const findAllApi = async (title) => {
    const foundData = await Product.findAll({ include: { all: true } }); 
    
    if(foundData.length === 0)   {       
      // Carga los productos a la base de datos con la categoría
      await Promise.all(
        productos.map(async (e) => {
          const foundCat = await Category.findByPk(e.category);
          const newProduct = await Product.create(e);
          await newProduct.addCategory(foundCat);
          return newProduct;
        })
      );
      let dataDb = await Product.findAll({include: { all: true }});
      return dataDb;
      }
    if (title) {
      const productFoundOnDb = await Product.findAll({
         where: {
          title: {
            [Op.iLike]: `%${title}%`,
          },
        },
      });
      return productFoundOnDb;
    }
    return foundData;
  }
/* const findAllApi = async () => {
  const existingData = await findDb(); // Verifica si hay datos cargados en la base de datos

  if (existingData.length === 0) {
    // No hay datos en la base de datos, cargar desde la API
    // const URL = "https://api.mercadolibre.com/sites/MLA/search?category=";
    // const ids = [
    //   // ... lista de IDs de marcas
    //   "MLA1648&BRAND=49944", //HP
    // ].map((marca) => URL + marca);

    const apiUrl = await Promise.all(
      ids.map(async (ruta) => {
        return (await axios(ruta)).data.results;
      })
    );

    const clearProductsApi = apiUrl.flat().map((product) => ({
      id: product.id,
      title: product.title,
      image: product.thumbnail,
      price: product.price,
      stock: product.available_quantity,
      category: product.category_id,
      sold: product.sold_quantity,
      descripion: "",
    }));

    // Carga los productos a la base de datos con la categoría
    await Promise.all(
      clearProductsApi.map(async (e) => {
        const foundCat = await Category.findByPk(e.category);
        const newProduct = await Product.create(e);
        await newProduct.addCategory(foundCat);
        return newProduct;
      })
    );
  }

  let dataDb = await Product.findAll({ include: { all: true } });
  return dataDb;
}; */

const findCategoryDB = async () => {
  const searchCategory = await Category.findAll({ include: { all: true } });
  return searchCategory;
};

module.exports = { findDb, findCategoryDB, findAllApi };
