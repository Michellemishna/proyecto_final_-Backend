require("dotenv").config();
const LOCAL_BACK = "http://localhost:3001";
const URL_DEPLOY = "https://deploy-backpf.onrender.com";
const axios = require("axios");
const { ACCESS_TOKENC } = process.env;

// SDK MercadoPago
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: ACCESS_TOKENC,
});

const postPayments = async (req, res) => {
  const { items, email, CustomerUser } = req.body;
  try {
    const orden = (
      await axios.post(`${LOCAL_BACK}/order`, { CustomerUser, email, items })
    ).data;
    console.log(orden);
    const items_md = items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
    }));
    console.log(items_md);
    let preference = {
      items: items_md,
      CustomerUser: CustomerUser,
      email: email,
      back_urls: {
        success: "http://localhost:3001/payment/feedback",
        failure: "http://localhost:3001/paymentfeedback",
        pending: "",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).send({
      id: response.body.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la preferencia de pago" });
  }
};

const getState = (req, res) => {
  res.status(200).send({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
  console.log("Esto es payments ");
};

// const postPayments = async (req, res) => {
//     const { items, email, customeruser } = req.body;
//     try{
// 	const orden = (await axios.post(`${URL_DEPLOY}/order`, { customeruser, email, items })).data;

//     const result = await createPayment(items, orden.id);
//     res.send(result);
//     console.log("Entra aca", error);
// } catch (error) {
//     res.status(404).send({ error: error.message });
//   }
// }

// const getSuccess = async (req, res) => {
//     const {id} = req.params;

//   try {
//     await axios.put(`${URL_DEPLOY}/order/${id}`, {order: "realizada"})
//     res.redirect(`${URL_DEPLOY}/api/mercadopago/pagos`);
//   } catch (error) {
//     res.send({ error: error.message });
//   }};

//   const getFailure =async(req, res) => {
//     const {id} = req.params;

//     try {
//       await axios.put(`${URL_DEPLOY}/order/${id}`, {order: "cancelada"})
//       res.redirect(`${URL_DEPLOY}/api/mercadopago/pagos`);
//     } catch (error) {
//       res.send({ error: error.message });
//     }};

//     const getPending = async (req, res) => {
//         const {id} = req.params;

//         try {
//           await axios.put(`${URL_DEPLOY}/order/${id}`, {order: "pendiente"})
//           res.redirect(`${URL_DEPLOY}/api/mercadopago/pagos`);
//         } catch (error) {
//           res.send({ error: error.message });
//         }
//       };

//     async function createPayment(item, id) {
//         const url = "https://api.mercadopago.com/checkout/preferences";
//         const body = {
//           items: item,
//           back_urls: {
//             failure: `${URL_DEPLOY}/payments/failure/${id}`,
//             pending: `${URL_DEPLOY}/payments/pending/${id}`,
//             success: `${URL_DEPLOY}/payments/success/${id}`,
//           }
//         };
//         const payment = await axios.post(url, body, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//           },
//         });

//           const result = [
//             payment.data.init_point,
//             payment.data.id,
//             payment.data.items.map((e) => {
//             return e;
//             }),
//           ];
//           console.log("Esto es payments", payment);
//           return result;
//       }

module.exports = { postPayments, getState };
