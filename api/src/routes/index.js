const { Router } = require('express');

const router = Router();

// Importar todos los routers
const clientsRoute = require('../handlers/clientsRoute');
const adminRoute = require('../handlers/adminRoute')
const rout = require('./product.router')

router.use('/products', rout);
router.use('/clients', clientsRoute);
router.use('/admin', adminRoute);

router.use('*', function(res) {
    res.status(404).send('Page not found');
  });



module.exports = router;