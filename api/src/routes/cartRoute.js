const { Router } = require("express");
const router = Router();

const { handlerAddProduct } = require("../handlers/cart/postProduct");
const { handlerGetCart } = require("../handlers/cart/getCartById");
const { handlerRemoveProduct } = require("../handlers/cart/removeProduct");
const { handlerRemoveAllProducts } = require("../handlers/cart/removeAllProducts");

router.get("/:id", handlerGetCart);
router.post("/:id/products", handlerAddProduct);
router.delete("/:cartId/products/", handlerRemoveAllProducts);
router.delete("/:cartId/products/:productId", handlerRemoveProduct);

module.exports = router;