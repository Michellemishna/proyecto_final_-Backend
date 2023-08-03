const { Customer, Order, Product } = require("../db");

const getOrder= async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      const result = await Order.findAll({ include: { all: true } })
      res.send(result)
    } else {
      const result = await Order.findAll({ where: { order_email: email }, include: { all: true } })
      res.send(result)
    }

  } catch (error) {
    res.status(404).send({ error: error.message })
  }};


const getOrderById = async (req, res) => {
  const { id } = req.params
  try {
    const found = await Order.findByPk(id, { include: { all: true } })
    if (found) res.send(found)
    else res.status(404).send("No exite Id")
  } catch (error) {
    res.send({ error: error.message })
  }};

// crear orden de compra
const createOrder = async (req, res) => {
  const { CustomerUser, email, items } = req.body;
  
// monto total a pagar 
  const precio = items.map(e => parseFloat(e.unit_price) * parseFloat(e.quantity)).reduce((a, b) => a + b)
  const date = new Date();
  const order_date = date.toISOString();
  const found = await Customer.findByPk(CustomerUser);

  try {
    const obj = {
      amount: precio, // monto 
      order_email: email,
      order_date: order_date,
      shipping_address: "", // 
    }

 const newOrder = await Order.create(obj)

   await newOrder.setCustomer(found)
   for (const item of items) {
    const product = await Product.findByPk(item.id);
    await newOrder.addProduct(product);
  }
  console.log(newOrder);
 res.send(newOrder);
} catch (error) {
 res.status(404).send({ error: error.message });
}
};


//modifica la orden
const modifyOrder = async (req, res) => {
  const { id } = req.params;
  const { order } = req.body;
  try {
    if (order) {
      const db = await Order.findOne({
        where: {
          id: id
        }
      })
      console.log(db)
      if (db) {
        await db.update({ order_status: order })
        res.status(200).send("Orden actualizada")
      }
    }
  } catch (error) {
    console.log(error.message)
  }};


//elimina la orden de compra
const deleteOrder = async (req, res) => {
  const { id } = req.params
  try {
    if (id) {
      const container = await Order.destroy({ where: { id: id } })
      container ? res.send("Orden eliminada") : res.status(404).send("No existe orden con ese ID")
    }
  } catch (error) {
    console.log(error)
  }
};

module.exports = {getOrder, getOrderById, createOrder, modifyOrder, deleteOrder};