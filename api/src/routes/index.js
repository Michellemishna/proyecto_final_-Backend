const { Router } = require('express');

const router = Router();

// Importar todos los routers
const clientsRoute = require('../handlers/clientsRoute');
const adminRoute = require('../handlers/adminRoute')
const categoriesRouter = require("./categoriesRoute");
const productRouter = require("./productRoute");
const filterSortsRoute = require('../handlers/filterSortsRoute.js')


router.use('/products', productRouter);
router.use("/categories", categoriesRouter);
router.use('/clients', clientsRoute);
router.use('/admin', adminRoute);
router.use("/filter-sorts", filterSortsRoute)

router.use('*', function(req, res) {
    res.status(404).send('Page not found');
  });




module.exports = router;