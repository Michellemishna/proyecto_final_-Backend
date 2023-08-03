const { Cart } = require("../../models/Cart");
const { Product } = require("../../models/Product");

const addProductToCart = async (id, productId) =>{
    try {
        const cart = await Cart.findAll({
            where: {UserId: id},
            include: product
        });
        if (!cart) {
            throw new Error("No se agregó nada al carrito");
        };
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error("El producto no fue encontrado");
        };

        await cart.addProduct(product);
        await cart.update({ current_state: "Pending"});

        return `Producto añadido correctamente al carrito`;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    addProductToCart
}