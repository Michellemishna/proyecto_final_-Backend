const { Customer, Order } = require("../db");

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
    const found = await Order.findByPk(id, { include: { model: Customer, throught: { attributes: [] } } })
    if (found) res.send(found)
    else res.status(404).send("No exite Id")
  } catch (error) {
    res.send({ error: error.message })
  }};

// crear orden de compra
const createOrder = async (req, res) => {
  const { customerUser, shopping, email, order_status,
    default_shipping_address  } = req.body;
  
// monto total a pagar 
  const precio = items.map(e => parseFloat(e.unit_price) * parseFloat(e.quantity)).reduce((a, b) => a + b)
  try {
    const date = new Date()
    const newOrder = {
      amount: precio, // monto 
      shipping_address:  default_shipping_address, // direccion de envio
      order_address: "", // direccion de pedido
      order_email: email,
      order_date: date,
      order_status: order_status, 
      shopping: shopping, 
    }
    const searchCustomer = await Customer.findByPk(customerUser)
     searchCustomer.addOrder(newOrder)

    res.send(newOrder)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}

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