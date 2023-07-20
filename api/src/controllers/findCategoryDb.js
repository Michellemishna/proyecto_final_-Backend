const {Category} =require("../db")

const findCategoryDB = async () => {
    const searchCategory = await Category.findAll({include: { all:true}});
    return searchCategory;
}

module.exports = findCategoryDB;