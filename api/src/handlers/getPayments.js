require("dotenv").config();
const LOCAL_BACK = "http://localhost:3001";
const URL_DEPLOY = "proyectofinal-production-83ce.up.railway.app";
const axios = require("axios");
const { ACCESS_TOKENC, emailsend } = process.env;
const transporter = require("../controllers/nodemailer");
const { orderConfirmation } = require("../utils/Confirmation");
const { orderCancelation } = require("../utils/Cancelation");
const { orderPending } = require("../utils/Pending");
const {URL_FRONT, URL_BACK} = process.env

// SDK MercadoPago
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: ACCESS_TOKENC,
});

const postPayments = async (req, res) => {
  // ya puedo poner la camara - lo pongo?
  const { items, email, CustomerUser } = req.body;
  try {
    const orden = (
      await axios.post(`${URL_BACK}/order`, { CustomerUser, email, items })
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
        success: `${URL_BACK}/payment/success/${orden.id}`,
        failure: `${URL_BACK}/payment/failure/${orden.id}`,
        pending: `${URL_BACK}/payment/pending/${orden.id}`,
      },
      auto_return: "approved",
      // notification_url: "http://localhost:3001/webhook"
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).send({ id: response.body.id });
  } catch (error) {
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
  const { id } = req.params;

  try {
    // Actualizar el estado de la orden a "realizada"
    await axios.put(`${URL_BACK}/order/${id}`, { order: "realizada" });

    // Obtener la información de la orden
    const response = await axios.get(`${URL_BACK}/order/${id}`);
    const orderData = response.data;
    const orderemail = orderData.order_email;
    // Enviar el correo electrónico
    const template = orderConfirmation();
    await transporter.sendMail({
      from: `<Nueva notificación>, ${emailsend}`, // Remitente
      to: `${orderemail}`, // Destinatario
      subject: `Compra realizada con éxito!`, // Asunto del correo
      html: `${template}`, // Cuerpo del correo en formato HTML
    });

    // Redirigir al cliente a la página de confirmación con el ID de la orden
    res.redirect(`${URL_FRONT}/confirmacion/${id}`);
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getFailure = async (req, res) => {
  const { id } = req.params;

  try {
    await axios.put(`${URL_BACK}/order/${id}`, { order: "cancelada" });

    const response = await axios.get(`${URL_BACK}/order/${id}`);
    const orderData = response.data;
    const orderemail = orderData.order_email;

    const template = orderCancelation(); //
    await transporter.sendMail({
      from: `<Nueva notificación>, ${emailsend}`, // Remitente
      to: `${orderemail}`, // Destinatario
      subject: `Lo sentimos tu compra a sido cancelada!`, // Asunto del correo
      html: `${template}`, // Cuerpo del correo en formato HTML
    });

    res.redirect(`${URL_FRONT}/confirmacion/${id}`);
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getPending = async (req, res) => {
  const { id } = req.params;

  try {
    await axios.put(`${URL_BACK}/order/${id}`, { order: "pendiente" });

    const response = await axios.get(`${URL_BACK}/order/${id}`);
    const orderData = response.data;
    const orderemail = orderData.order_email;

    const template = orderPending(); //
    await transporter.sendMail({
      from: `<Nueva notificación>, ${emailsend}`, // Remitente
      to: `${orderemail}`, // Destinatario
      subject: `Tu compra esta casi lista!`, // Asunto del correo
      html: `${template}`, // Cuerpo del correo en formato HTML
    });

    res.redirect(`${URL_FRONT}/confirmacion/${id}`);
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = { postPayments, getSuccess, getFailure, getPending };
