const axios = require("axios");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const { Customer } = require("../db");
//const secretToken = process.env.SECRET_TOKEN;

const verifyGoogleAccessToken = async (google_access_token) => {
  const tokenInfoUrl = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${google_access_token}`;
  const userInfoUrl = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${google_access_token}`;

  try {
    // Hacer la solicitud al endpoint de tokenInfo para obtener información básica del token
    const { data: tokenInfo } = await axios.get(tokenInfoUrl);

    // Hacer la solicitud al endpoint de userInfo para obtener más información del usuario, incluida la imagen
    const { data: userInfo } = await axios.get(userInfoUrl);

    const search = await Customer.findOne({
      where: { email: tokenInfo.email },
    });
    // Combinar la información del token y la información del usuario en un solo objeto
    if (!search) {
      const newUsuario = await Customer.create({
        name: "...",
        user: "...",
        contraseña: "contraseña de Google",
        image: userInfo.picture,
        telefono: "...",
        email: tokenInfo.email,
        user_banned: false,
        default_shipping_address: "...",
        is_Active: true,
      });
      console.log(newUsuario);
      return newUsuario;
    }
    return search;
  } catch (error) {
    console.error("Error al verificar el token de Google:", error);
    throw error;
  }
};

const googleLogin = async (req, res) => {
  const google_access_token = req.headers.authorization.split(" ")[1];
  const verifyToken = await verifyGoogleAccessToken(google_access_token);
  // const user = User.find({
  //   where:{
  //     googleId: verifyToken.user_id
  //   }
  // })
  // if(!user){
  //   return res.status(404).json({response: "la cuenta no esta registrada"});
  // }
  //console.log(verifyToken);
  const token = jwt.sign(
    {
      id: verifyToken.user_id,
      user: verifyToken.user,
      email: verifyToken.email,
      nombre: verifyToken.name,
      scope: verifyToken.scope,
      contraseña: verifyToken.contraseña,
      telefono: verifyToken.telefono,
      imagen: verifyToken.image,
      estado: verifyToken.user_banned,
      issued_to: verifyToken.issued_to,
      default_shipping_address: verifyToken.default_shipping_address,
      is_Active: verifyToken.is_Active,
    },
    "secret",
    {
      expiresIn: 7200,
    }
  );

  //console.log(token, "este es el token");
  res.status(200).json({ result: token });
};

const allProduts = (req, res) => {
  const user = req.body.user;
  console.log(user, "ya esta el user");

  return res.json({ user });
};

module.exports = {
  googleLogin,
  allProduts,
};
