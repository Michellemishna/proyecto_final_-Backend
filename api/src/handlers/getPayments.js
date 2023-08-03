require("dotenv").config();
const LOCAL_BACK = "http://localhost:3001";
const URL_DEPLOY = "proyectofinal-production-83ce.up.railway.app";
const axios = require("axios");
const { ACCESS_TOKENC } = process.env;


// SDK MercadoPago
const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: ACCESS_TOKENC
    
});

const postPayments = async (req, res) => {
        const { items, email, CustomerUser } = req.body;   
    try{
    	const orden = (await axios.post(`${LOCAL_BACK}/order`, { CustomerUser, email, items })).data;
        console.log(orden);
        const items_md = items.map(item => ({
            title: item.title,
            quantity: item.quantity,
            unit_price: item.unit_price,
        }))
        console.log(items_md);
        let preference = {
            items:items_md,	
            CustomerUser: CustomerUser,
            email: email,
            back_urls: {
			success: `http://localhost:3001/payment/success/${orden.id}`,
			failure: `http://localhost:3001/payment/failure/${orden.id}`,
			pending: `http://localhost:3001/payment/pending/${orden.id}`
		    },	
             auto_return: "approved",
            // notification_url: "http://localhost:3001/webhook"
        }
    
    const response = await mercadopago.preferences.create(preference)
     res.status(200).send({id:response.body.id});
    }catch(error) {
        console.log(error);
        res.status(500).json({ error: "Error al crear la preferencia de pago" });
  }
    };

// const getState= (req, res) => {
//   res.status(200).send({
//     Payment: req.query.payment_id,
//     Status: req.query.status,
//     MerchantOrder: req.query.merchant_order_id,
// });

// console.log("Esto es payments ");

// };

// const getwebhook = async (req, res) => {
//     const payment =req.query;
//     try {
//     if(payment.type === "payment") {
//     const data = await mercadopago.payment.findById(payment["data.id"])
//     console.log(data)
// }
// res.sendStatus(204)
//     } catch(error) {
//         res.send({ error: error.message });
//     }}
 
const getSuccess = async (req, res) => {
    const {id} = req.params;

  try {
    await axios.put(`${LOCAL_BACK}/order/${id}`, {order: "realizada"})
    console.log(id)
    res.redirect(`http://localhost:5173/confirmacion/${id}`);
  } catch (error) {
    res.send({ error: error.message });
  }};
  
  const getFailure =async(req, res) => {
    const {id} = req.params;
  
    try {
      await axios.put(`${LOCAL_BACK}/order/${id}`, {order: "cancelada"})
      res.redirect(`http://localhost:5173/confirmacion/${id}`);
    } catch (error) {
      res.send({ error: error.message });
    }};

    const getPending = async (req, res) => {
        const {id} = req.params;
      
        try {
          await axios.put(`${LOCAL_BACK}/order/${id}`, {order: "pendiente"})
          res.redirect(`http://localhost:5173/confirmacion/${id}`);
        } catch (error) {
          res.send({ error: error.message });
        }
      };


      
   
 module.exports = { postPayments, getSuccess, getFailure, getPending};