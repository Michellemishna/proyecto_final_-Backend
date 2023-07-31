const axios = require("axios");
const { json } = require("express");
const jwt = require("jsonwebtoken");
//const secretToken = process.env.SECRET_TOKEN;

const verifyGoogleAccessToken = async (google_access_token) => {
  const { data } = await axios(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${google_access_token}`
  );
  console.log(data);
  return data;
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
  console.log(verifyToken);
  const token = jwt.sign(
    {
      id: verifyToken.user_id,
      email: verifyToken.email,
      name: verifyToken.name,
      scope: verifyToken.scope,
      audience: verifyToken.audience,
      issued_to: verifyToken.issued_to,
    },
    "secret",
    {
      expiresIn: 7200,
    }
  );

  console.log(token, "este es el token");
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
