const { Product, Category } =require("../db");
const axios = require("axios");
const clearProductsApi = require("./clearProductsApi");

const getDb = async () => {
    const foundDate = await Product.findAll({include: { model: Category , attributes:["id","name"],throught:{attributes:[]}}});
    return foundDate;
  };


const findAllApi = async () => {
    const apiUrl = (await axios.get("https://api.mercadolibre.com/sites/MLA/search?category=MLA1648")).data.results;
    const responseAPI = await axios.all(apiUrl)
    const ApiProducts = clearProductsApi(responseAPI);

//cargo los productos a db con categoría
return ApiProducts
}





  
 

module.exports = {getDb,findAllApi};