const axios = require("axios");
const {findCategoryDB} = require('../controllers/findAllApi');
const { Category } =require("../db");


const getCategories = async (req,res) => {
    try {
        const dbCategories = await findCategoryDB();
        if (!dbCategories.length) {
            const URL = `https://api.mercadolibre.com/categories/MLA1648`
            const apiUrlCategories = (await axios.get(URL)).data;
            const availableFilter =
            apiUrlCategories.children_categories.map((category) => {
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

    module.exports = {getCategories} ;