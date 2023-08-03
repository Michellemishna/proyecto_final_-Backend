const getCartById = require("../../controllers/cart/getCartById");

const handlerGetCart = async(req, res) => {
    try {
        const {id} = req.params;
        const cart = await getCartById(id);

        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: error.message
        });
    }
};

module.exports = {
    handlerGetCart
};