const { Router } = require('express');

const router = Router();

// Importar todos los routers
const getProducts = require('../handlers/getProducts');
const getCategories = require('../handlers/getCategories');
const clientsRoute = require('../handlers/clientsRoute');
const adminRoute = require('../handlers/adminRoute')


router.get('/', getProducts);
router.get('/products/categories', getCategories);
router.use('/clients', clientsRoute);
router.use('/admin', adminRoute);

router.use('*', function(res) {
    res.status(404).send('Page not found');
  });



module.exports = router;