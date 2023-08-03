//const jwt = require("jsonwebtoken");
//const { serialize } = require("cookie");
//const { SECRET_TOKEN } = process.env;

const logoutCustomers = async (req, res) => {
  const token = localStorage.getItem("token");
  return res.json(token);
  //   try {
  //   } catch (error) {
  //     return res.status(500).json({ error: "Error en el servidor" });
  //   }
};

module.exports = { logoutCustomers };
