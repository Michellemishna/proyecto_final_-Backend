const { Product, Review } = require("../db");

const postReview = async (req, res) => {
    const { comment, calification, CustomerUser, ProductId } = req.body
    try{
    if (!comment || !calification || !CustomerUser || !ProductId) {
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
} catch (err) {
    console.error(err)
};
}
const getReview = async (req, res) => {
    const { id } = req.params
    try{
    const result = await Review.findAll({
        where: {
            ProductId: id
        }, 
    })
    res.status(200).send(result)
} catch (err) {
    console.error(err)}
}

module.exports = {postReview, getReview};