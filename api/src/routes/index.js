const { Router } = require('express');
const getProducts = require('../handlers/getProducts');
// Importar todos los routers;
const router = Router();
// Configurar los routers


router.get('/', getProducts);




module.exports = router;