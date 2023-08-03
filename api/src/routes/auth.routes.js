const { Router } = require("express");
const {
  googleLogin,
  allProduts,
} = require("../controllers/auth.controller.js");
const { isAuthenticated } = require("../utils/index.js");
const authRouter = Router();

authRouter.post("/google/login", googleLogin);
authRouter.post("/productos", isAuthenticated, allProduts);

module.exports = authRouter;
