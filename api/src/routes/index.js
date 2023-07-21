const { Router } = require('express');

const router = Router();

// Importar todos los routers
const clientsRoute = require('../handlers/clientsRoute');
const adminRoute = require('../handlers/adminRoute')
const productRoute = require("./productRoute");
const categoriesRoute = require("./categoriesRoute");
const customerRoute = require("./customerRoute");

router.use('/products', productRoute);
router.use("/categories", categoriesRoute);
router.use('/customer', customerRoute);
router.use('/clients', clientsRoute);
router.use('/admin', adminRoute);

router.use('*', function(res) {
    res.status(404).send('Page not found');
  });



module.exports = router;