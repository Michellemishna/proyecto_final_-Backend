//const { EditCustomer } = require("../controllers/editCustomer.js");
const { banearUser } = require("../controllers/baneoController");

const baneoUsuarios = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const userBaneado = await banearUser(email);
    res.status(200).json(userBaneado);
  } catch (error) {
    console.log("no llego el id");
  }
};

module.exports = { baneoUsuarios };
