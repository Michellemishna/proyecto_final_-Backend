const { Product, Category } =require("../db");
const axios = require("axios");

const findDb = async () => {
    const foundData = await Product.findAll({include: { model: Category , attributes:["id","name"]}});
    return foundData;
  };


const findAllApi = async () => {
        const URL="https://api.mercadolibre.com/sites/MLA/search?category=";
        const ids = [
          "MLA1648&BRAND=49944", //HP
          // "MLA1648&BRAND=206", //SAMSUNG
          // "MLA1648&BRAND=8216", //DELL
          // "MLA1648&BRAND=7494",  //LENOVO
          // "MLA1648&BRAND=16360", //KINGSTON
          // "MLA1648&BRAND=12925415", //DEHUKA
          // "MLA1648&BRAND=7294334",  //ASSUS
          // "MLA1648&BRAND=7855833",  //INTEL
          // "MLA1648&BRAND=411113",  //SICA
          // "MLA1648&BRAND=410974", //GADNIC
          // "MLA1648&BRAND=47687",  //CRUCIAL
          // "MLA1648&BRAND=27222", //EXO
          // "MLA1648&BRAND=8233996", //NICTOM
          // "MLA1648&BRAND=8241451", //IQUAL
          // "MLA1648&BRAND=15720", //TDK
          // "MLA1648&BRAND=18034", //AMD
          // "MLA1648&BRAND=41057", //WACOM
          // "MLA1648&BRAND=9593", //WESTERN DIGITAL
        ].map((marca)=>URL + marca);

        const apiUrl = await Promise.all (
          ids.map(async (ruta)=> {
            return (await axios(ruta)).data.results;
    })
        );
            
    const clearProductsApi = apiUrl.flat().map((product) => ({
            id:product.id,
            title:product.title,
            image:product.thumbnail,
            price:product.price,
            stock:product.available_quantity,
            category:product.category_id,
            sold:product.sold_quantity,
            descripion:"",
        }));

    
//cargo los productos a db con categoría
await Promise.all(clearProductsApi.map(async (e) => {
      const foundCat = await Category.findByPk(e.category);
      const newProduct = await Product.create(e);
      await newProduct.addCategory(foundCat);
      return newProduct;
    })
);
  let dataDb = await Product.findAll({include: { all: true }});
  return dataDb;
};

const findCategoryDB = async () => {
  const searchCategory = await Category.findAll({include: { all:true}});
  return searchCategory;
}



module.exports = {findDb,findAllApi, findCategoryDB};