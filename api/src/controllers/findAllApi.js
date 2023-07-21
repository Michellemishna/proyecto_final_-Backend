const { Product, Category } =require("../db");
const axios = require("axios");

const findDb = async () => {
    const foundDate = await Product.findAll({include: { model: Category , attributes:["id","name"],throught:{attributes:[]}}});
    return foundDate;
  };


const findAllApi = async () => {
    const URL="https://api.mercadolibre.com/sites/MLA/search?category=MLA1648";
    
    const apiUrl = (await axios.get(URL)).data.results;
    const responseAPI = await axios.all(apiUrl)


    const clearProductsApi = responseAPI.flat().map((product) => ({
            id:product.id,
            title:product.title,
            image:product.thumbnail,
            price:product.price,
            stock:product.available_quantity,
            category:product.category_id,
            sold:product.sold_quantity,
            descripion:"",
        }))

    
//cargo los productos a db con categoría
await Promise.all (clearProductsApi.map(async (e) => {
      const foundCat = await Category.findByPk(e.category);
      const newProduct = await Product.create(e);
      await newProduct.addCategory(foundCat);
      return newProduct;
    })
);
  let dataDb = await Product.findAll({include: { all: true }});
  return dataDb;

}

const findCategoryDB = async () => {
  const searchCategory = await Category.findAll({include: { all:true}});
  return searchCategory;
}


module.exports = {findDb,findAllApi, findCategoryDB};