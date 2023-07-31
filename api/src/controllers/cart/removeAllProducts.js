const { Cart } = require("../../models/Cart");
const { Product } = require("../../models/Product");

const removeAllProducts = async (cartId) => {
  try {
    
    const cart = await Cart.findAll({
      where: { CustomerId: id },
      include: Product,
    });

    if (!cart) {
      throw new Error("El carrito esta vacío");
    }

    await cart.setProducts([]);
    await cart.update({ current_state: "Empty" });

    return `Todos los productos fueron removidos del carrito`;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  removeAllProducts,
};
