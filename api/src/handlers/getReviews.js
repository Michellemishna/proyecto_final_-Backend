const { Product, Review } = require("../db");

const postReview = async (req, res) => {
    const { comment, calification, customerUser, ProductId } = req.body
    try{
    if (!comment || !calification || !ProductId) {
        res.status(404).send("Por favor revisa que la información este completa");
    } else {
        const post = await Review.create({
            comment,
            calification,
            customerUser,
            ProductId,
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

const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
      const removed = await Review.destroy({  where: {
        ProductId: id
    } });
      if (removed) return res.send("Ya no existe review");
      res.send("No hay reviews");
    } catch (error) {
      res.json({ error: error.message });
    }
  };

module.exports = {postReview, getReview, deleteReview};