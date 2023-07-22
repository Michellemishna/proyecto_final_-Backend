const { Router } = require("express");
const router = Router();
const { createAdmin } = require('../controllers/adminControllers')


// GET:
router.get("/sales", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});



router.get("/orders", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});



router.get("/clients", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});



//POST

//crea nuevo admin
router.post("/create", async (req, res) => {
    try {
        const newAdmin = req.body;
        const create = await createAdmin(newAdmin);
        res.status(201).send(create)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});




//PUT
router.put("/update/product", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});



//DELETE
router.delete("/delete/product", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});



module.exports = router;
