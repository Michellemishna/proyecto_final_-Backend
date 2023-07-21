const { Router } = require("express");
const {getAllProducts, getProductId, getPicture, getDescription, postNewProduct, deleteProduct} = require("../handlers/getProducts");

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductId);
router.get("/pictures/:id", getPicture);
router.get("/description/:id", getDescription);
router.post("/", postNewProduct);
router.delete("/", deleteProduct);



module.exports = router;