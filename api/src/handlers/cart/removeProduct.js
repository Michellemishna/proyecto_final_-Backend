const {removeProduct} = require("../../controllers/cart/removeProduct");

const handlerRemoveProduct = async (req, res) => {
    try {
        const {cartId, productId} = req.params;

        const removedProduct = await removeProduct(cartId, productId);
        
        res.status(200).json(removedProduct);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error.message
        });
    }
}
module.exports = {
    handlerRemoveProduct
};