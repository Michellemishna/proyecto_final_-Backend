const { Router } = require('express');
const getProducts = require('../handlers/getProducts');
const getCategories = require('../handlers/getCategories');
// Importar todos los routers;
const router = Router();
// Configurar los routers


router.get('/products', getProducts);
router.get('/products/categories', getCategories);





module.exports = router;