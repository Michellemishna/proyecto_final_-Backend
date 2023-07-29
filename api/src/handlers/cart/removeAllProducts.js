const {removeAllProducts} = require("../../controllers/cart/removeAllProducts");

const handlerRemoveAllProducts = async (req, res) => {
    try {
        const {cartId} = req.params;
        const emptyCart = await removeAllProducts(cartId);

        res.status(200).json(emptyCart);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error.message
        });
    };
};
module.exports = {
    handlerRemoveAllProducts
};