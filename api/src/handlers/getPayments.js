// const mercadopago = require("mercadopago");
// const LOCAL_BACK = "http://localhost:3001";
// const URL_DEPLOY = "https://deploy-backpf.onrender.com";
// const axios = require("axios");


// mercadopago.configure({
//     access_token: process.env.ACCESS_TOKEN,
// });
// const postPayments = async (req, res) => {
//     const { items, email, customer_User } = req.body;   
//     try{
// 	const orden = (await axios.post(`${URL_DEPLOY}/order`, { customer_User, email, items })).data;
//     const result = await createPayment(items, orden.id);
//     res.send(result);
//   } catch (error) {
//     console.log("Entra aca", error);
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
//             Authorization: `Bearer ${process.env.ACCES_TOKEN}`,
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
      
// module.exports = {postPayments, getSuccess, getFailure, getPending};