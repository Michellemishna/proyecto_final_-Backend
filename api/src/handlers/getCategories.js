const axios = require("axios");
const {findCategoryDB, findDb} = require('../controllers/findAllApi');
const { Category } =require("../db");


const getCategories = async (req,res) => {
    try {
        const dbCategories = await findCategoryDB();
        if (!dbCategories.length) {
            const URL = `https://api.mercadolibre.com/sites/MLA/search?category=MLA430687`
            const apiUrlCategories = (await axios(URL)).data;
            const availableFilter =
            apiUrlCategories.available_filters[0].values.map((category) => {
              return {
                id: category.id,
                name: category.name,
              };
            });
          const createdCategories = await Category.bulkCreate(availableFilter);
          res.status(200).send(availableFilter);
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