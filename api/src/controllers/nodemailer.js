const nodemailer = require('nodemailer');
require('dotenv').config();
const { emailsend, password_gmail_client } = process.env;


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: emailsend, // generated ethereal user
        pass: password_gmail_client, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify().then(()=> {
    console.log("El envío de email funciona");
})



module.exports =  transporter 
