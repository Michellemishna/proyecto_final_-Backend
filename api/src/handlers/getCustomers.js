const { Customer, Order } = require("../db");
//const { validarUser, jwt } = require("../controllers/loginCustomerContr");
const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");
const bcrypt = require("bcrypt")

const getCustomers = async (req, res) => {
  const { name } = req.query;
  try {
    let result = await Customer.findAll();
    if (name)
      result = result.filter((customer) =>
        customer.name.toLowerCase().includes(name.toLowerCase())
      );
    res.send(result);
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getCustomerId = async (req, res) => {
  const { id } = req.params;
  try {
    const search = await Customer.findByPk(id, { include: { all: true }});
    if (search) res.send(search);
    else res.status(404).send("No existe ID");
  } catch (error) {
    res.send({ error: error.message });
  }
};

const createCustomer = async (req, res) => {
  const { name, user, password, image, email, phone, address } = req.body;

  try {
    //validaciones
    if (!name || !user || !password || !email || !phone || !address)
      return res.status(404).send("No dejes ningun campo vacio");

    if (await Customer.findByPk(user))
      return res.status(304).send("Cliente registrado");

    //##############   VALIDAR USUARIO   ################

    // const loginUser = await validarUser(password, email);
    // if (loginUser) {
    //   return res.json(loginUser);
    // }

    //HASH DE CONTRASEÑA A BCRYPT PARA PROTECCION
    const hashedPassword = await bcrypt.hash(password, 10)

    //##############   VALIDAR USUARIO   ################

    const newCustomer = await Customer.create({
      name,
      user,
      password: hashedPassword, //Contraseña protegida
      image,
      email,
      phone,
      user_banned: false,
      default_shipping_address: address,
      is_Active: true,
    });
    res.send("Cliente Creado con Exito!");
  } catch (error) {
    res.send({ error: error.message });
  }
};

const modifyCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, user, image, email, phone, address, baneado } = req.body;
  try {
    // busca al customer
    const customer = await Customer.findByPk(id);

    if (!customer) res.status(404).send("ID not found");
    //si existe actualizo dependiendo los datos
    customer.name = name ? name : customer.name;
    customer.user_banned = baneado;
    customer.user = user ? user : customer.user;
    customer.image = image ? image : customer.image;
    customer.email = email ? email : customer.email;
    customer.phone = phone ? phone : customer.phone;
    customer.default_shipping_address = address
      ? address
      : customer.default_shipping_address;
    await customer.save(); // guardamos los cambios
    res.send("Update");
  } catch (error) {
    res.send({ error: error.message });
  }
};

//eliminar customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Customer.destroy({ where: { id } });
    if (removed) return res.send("");
    res.send("No existe ID");
  } catch (error) {
    res.json({ error: error.message });
  }
};

// const loginCustomers = async (req, res) => {
//   const { password, email } = req.body;
//   console.log(password, email);

//   if (email === "admin@email.com" && password === "admin") {
//     const token = jwt.sign(
//       {
//         exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
//         email: "admin@email.com",
//         username: "grupo19",
//       },
//       "secret"
//     );

//     const serialized = serialize("myTokenName", token, {
//       httpOnly: true,

//       sameSite: "strict",
//       maxAge: 1000 * 60 * 60 * 24 * 30,
//       path: "/",
//     });
//     res.setHeader("Set-Cookie", serialized);
//     return res.json("Logeado Correctamente...!");
//   }

//   return res.status(401).json({ error: "Usuario no registrado" });
// };

module.exports = {
  getCustomers,
  getCustomerId,
  createCustomer,
  modifyCustomer,
  deleteCustomer,
};
