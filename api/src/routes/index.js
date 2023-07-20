const { Router } = require('express');
const router = Router();

// Importar todos los routers
const getProducts = require('../handlers/getProducts');
const clientsRoute = require('../handlers/clientsRoute');
const adminRoute = require('../handlers/adminRoute')



// Configurar los routers
router.get('/', getProducts);
router.use('/clients', clientsRoute);
router.use('/admin', adminRoute);

router.use('*', function(res) {
    res.status(404).send('Page not found');
  });



module.exports = router;