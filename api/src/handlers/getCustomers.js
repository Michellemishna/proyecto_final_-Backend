const { Product, Customer, Order } = require("../db");

const getCustomers = async (req, res) => {
  const { name } = req.query;
  console.log("aca le llega el name:", name);
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
  const { name, user, password, image, email, phone, address, admin } =
    req.body;
  try {
    //validaciones
    if (!name || !user || !password || !email)
      return res
        .status(404)
        .send("These fields cannot be empty: [name,user,password,email]");

    if (await Customer.findByPk(user))
      return res.status(304).send("Cliente registrado");
    const newCustomer = await Customer.create({
      user,
      name,
      password,
      image,
      email,
      phone,
      default_shipping_address: address,
      is_Active: true,
    });
    res.send("Cliente Creado Exitosamente!");
  } catch (error) {
    res.send({ error: error.message });
  }};

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

module.exports = { getCustomers, getCustomerId, createCustomer, deleteCustomer };
