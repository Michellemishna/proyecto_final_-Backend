const { Router } = require("express");
const router = Router();
const { filtOrderProd } = require('../controllers/filtersSortsControllers')


// GET:
router.get("/selection", async (req, res) => {
    try {    
        const { search, category, price_min, price_max, sort_by, order } = req.query;
        const products = await filtOrderProd({
            search: search,
            category: category, 
            price_min: price_min, 
            price_max: price_max, 
            sort_by: sort_by, 
            order: order, 
        });
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


module.exports = router;

