const { Customer, Order, Product } = require("../db");

const createPay = async (req, res) => {
    const { CustomerUser , email, items, } = req.body;
    
  // monto total a pagar 
    const precio = items.map(e => parseFloat(e.unit_price) * parseFloat(e.quantity)).reduce((a, b) => a + b)
    // const quantity_total = items.map(e => parseFloat(e.quantity)).reduce((a, b) => a + b)

    const date = new Date();
    const order_date = date.toISOString();
    const found = await Customer.findByPk(CustomerUser);
  
    try {
      const obj = {
        amount: precio,
        // quantity: quantity_total, // monto 
        order_email: email,
        order_date: order_date,
        // shipping_address: default_shipping_address,
        order_status: "realizada", 
      }
      console.log(items);
      const newOrder = await Order.create(obj);
      newOrder.setCustomer(found);
      items.map(async (item) => await newOrder.addProduct(item.id));
      newOrder.addProduct();
      res.send(newOrder);
  
//    const newOrder = await Order.create(obj)
  
//      await newOrder.setCustomer(found)
//      for (const item of items) {
//       const product = await Product.findByPk(item.id);
//       await newOrder.addProduct(product);
//     }
//     console.log(newOrder);
//    res.send(newOrder);
} catch (error) {
    res.status(404).send({ error: error.message });
  }
  };

  module.exports = {createPay};