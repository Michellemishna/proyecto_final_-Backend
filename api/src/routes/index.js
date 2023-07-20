const { Router } = require('express');
const getProducts = require('../handlers/getProducts');
const getCategories = require('../handlers/getCategories');
// Importar todos los routers;
const router = Router();

// Importar todos los routers
const getProducts = require('../handlers/getProducts');
const clientsRoute = require('../handlers/clientsRoute');
const adminRoute = require('../handlers/adminRoute')



// Configurar los routers


router.get('/products/categories', getCategories);
router.get('/', getProducts);
router.use('/clients', clientsRoute);
router.use('/admin', adminRoute);

router.use('*', function(res) {
    res.status(404).send('Page not found');
  });



module.exports = router;