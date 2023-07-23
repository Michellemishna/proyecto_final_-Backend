const { Product, Review } = require("../db");

const postReview = async (req, res) => {
    const { comment, calification, customerId, ProductId } = req.body
    if (!comment || !calification || !customerId || !ProductId) {
        res.status(404).send("Por favor revisa que la información este completa");
    } else {
        const post = await Review.create({
            comment,
            calification,
            customerId: customerId,
            ProductId: ProductId,
        })
        const result = await Review.findAll({
            where: {
                ProductId: ProductId
            },

        })
        res.status(200).send(result);
    }
}

const getReview = async (req, res) => {
    const { id } = req.params
    const result = await Review.findAll({
        where: {
            ProductId: id
        }, 
    })
    res.status(200).send(result)
}


module.exports = {postReview, getReview};