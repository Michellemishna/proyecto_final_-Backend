const { Cart } = require("../../models/Cart");
const { Product } = require("../../models/Product");

const getCartById = async (id) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: id },
      include: Product,
    });
    return cart;
  } catch (error) {
    throw error;
  }
};
module.exports = {
    getCartById
}