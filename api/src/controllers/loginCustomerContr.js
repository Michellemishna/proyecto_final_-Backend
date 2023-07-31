// const { Product, Category } = require("../db");
// const jwt = require("jsonwebtoken");
// const { serialize } = require("cookie");

// const validarUser = async (email, password) => {
//   //console.log(email, password);
//   if (email === "admin@email.com" && password === "admin") {
//     const token = jwt.sign(
//       {
//         exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
//         email: "admin@email.com",
//         username: "grupo19",
//       },
//       "secret"
//     );

//     const serialized = serialize("myTokenName", token, {
//       httpOnly: true,

//       sameSite: "strict",
//       maxAge: 1000 * 60 * 60 * 24 * 30,
//       path: "/",
//     });

//     return serialized;
//   }
// };

// module.exports = { validarUser, jwt };
