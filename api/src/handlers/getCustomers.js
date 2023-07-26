const { Customer, Order } = require("../db");

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
    const search = await Customer.findByPk(id, {
      include: { model: Order, throught: { attributes: [] } },
    });
    if (search) res.send(search);
    else res.status(404).send("No existe ID");
  } catch (error) {
    res.send({ error: error.message });
  }
};

const createCustomer = async (req, res) => {
  const { name, user, password, image, email, phone, address } =
    req.body;
    let isBaned = false;
  try {
    //validaciones
    if (!name || !user || !password || !email)
      return res
        .status(404)
        .send("No dejes ningun campo vacio");

    if (await Customer.findByPk(user))
      return res.status(304).send("Cliente registrado");
    const newCustomer = await Customer.create({
      name,
      user,
      password,
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
  }};


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
      customer.default_shipping_address = address ? address : customer.default_shipping_address;
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



module.exports = { getCustomers, getCustomerId, createCustomer, modifyCustomer, deleteCustomer };
