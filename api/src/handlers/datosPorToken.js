const { config } = require("dotenv");
const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  //console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Token inválido");
  }
};

// export const tokenMiddlewareHeaders = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(400).json({
//       code: 400,
//       message: "El token es requerido.",
//     });
//   }
//   if (!(await verifyToken(token)))
//     return res.status(401).json({
//       code: 401,
//       message: "El token ha experidado o es inválido.",
//     });
//   next();
// };

// export const verifyToken = async (tokenJwt) => {
//   try {
//     return jwt.verify(tokenJwt, JWT_SECRET);
//   } catch (error) {
//     return null;
//   }
// };

module.exports = verificarToken;
