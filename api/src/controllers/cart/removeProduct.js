const { Cart } = require("../../models/Cart");
const { Product } = require("../../models/Product");

const removeProduct = async(cartId, productId) => {
    try {
        const cart = await Cart.findAll({
            where: {UserId: cartId},
            include: Product
        });
        if (!cart) {
            throw new Error("El carito está vacío");
        };

        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error("El producto no fue encontrado");
        };

        const hasProduct = await cart.hasProduct(product);

        if(!hasProduct) {
            throw new Error("El producto no esta en el carrito");
        };

        await cart.removeProduct(product);
        
        return `El producto fue removido del carrito`;
    } catch (error) {
        throw error;
    };
};
module.exports = {
    removeProduct
};