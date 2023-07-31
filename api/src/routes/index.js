const { Router } = require("express");

const router = Router();

// Importar todos los routers
const clientsRoute = require("../handlers/clientsRoute");
const adminRoute = require("../handlers/adminRoute");
const productRoute = require("./productRoute");
const categoriesRoute = require("./categoriesRoute");
const customerRoute = require("./customerRoute");
const filterSortsRoute = require("../handlers/filterSortsRoute.js");
const reviewsRoute = require("./reviewsRoute");
const orderRoute = require("./orderRoute");
//const paymentsRoute = require("./paymentsRoute");
const loginUsuarios = require("./loginUsuarios.js");
const dataByToken = require("./dataToken.js");
const logoutUsuarios = require("./logoutUsuario.js");
const authRoutes = require("./auth.routes");

router.use("/products", productRoute);
router.use("/categories", categoriesRoute);
router.use("/customer", customerRoute);
router.use("/clients", clientsRoute);
router.use("/admin", adminRoute);
router.use("/filter-sorts", filterSortsRoute);
router.use("/review", reviewsRoute);
router.use("/order", orderRoute);

router.use("/login", loginUsuarios);
router.use("/logout", logoutUsuarios);
router.use("/token", dataByToken);
router.use("/auth", authRoutes);
// router.use("/payment", paymentsRoute);

router.use("*", function (req, res) {
  res.status(404).send("Page not found");
});

module.exports = router;
