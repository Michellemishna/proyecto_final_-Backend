const jwt = require("jsonwebtoken");
//const secretToken = process.env.SECRET_TOKEN;
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  //console.log(token);
  if (!token) {
    return res.status(403).json({ error: true, cause: "the token is missing" });
  }

  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.status(401).json({ cause: "No authorizated" });
    }
    //console.log(user, "ACA SE CONSOLOGEA EL USUARIO"); // El objeto del usuario decodificado
    req.body.user = user;
    //console.log(user, "responde de jwt");
    next();
  });
};

module.exports = {
  isAuthenticated,
};
