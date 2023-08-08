const { EditCustomer } = require("../controllers/editCustomer.js");

const editUsuarios = async (req, res) => {
  //const {name,user, phone, image, address, password} = req.body
  const { input } = req.body;

  console.log(input);
  if (!input) {
    return res
      .status(401)
      .json({ error: "No hay datos para editar el usuario" });
  }
  const userEditado = await EditCustomer(input);
  if (userEditado) {
    res.status(200).json(userEditado);
    return;
  }
  try {
    const decoded = jwt.verify(token, "secret");
    console.log(decoded);
    req.user = decoded;
  } catch (error) {
    console.log("Token inválido");
  }
};

module.exports = editUsuarios;
