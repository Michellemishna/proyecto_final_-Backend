const { Product, Category } =require("../db");
const axios = require("axios");
const clearProductsApi = require("./clearProductsApi");

const findDb = async () => {
    const foundDate = await Product.findAll({include: { model: Category , attributes:["id","name"],throught:{attributes:[]}}});
    return foundDate;
  };


const findAllApi = async () => {
    const URL="https://api.mercadolibre.com/sites/MLA/search?category=MLA1648";
    
    const apiUrl = (await axios.get(URL)).data.results;
    const responseAPI = await axios.all(apiUrl)
    const ApiProducts = clearProductsApi(responseAPI);

//cargo los productos a db con categoría
await ApiProducts.map(async (e) => {
      const foundCategories = await Category.findByPk(e.category);
      const newProduct = await Product.create(e);
      await newProduct.addCategory(foundCategories);
      return newProduct;
    })
  

  let dataDb = await Product.findAll({include: { all: true }});
  return dataDb;

}



module.exports = {findDb,findAllApi};