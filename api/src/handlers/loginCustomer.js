const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");
//const { SECRET_TOKEN } = process.env;

const loginCustomer = async (req, res) => {
  const { password, email } = req.body;

  try {
    if (email === "admin@email.com" && password === "admin") {
      // Autenticación exitosa, generar el token JWT
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // Expiración en 30 días
          email: "admin@email.com",
          username: "grupo19",
        },
        "secret" // Aquí deberías usar un secreto más seguro y almacenarlo en una variable de entorno
      );

      // Crear la cookie con el token JWT
      const serialized = serialize("myTokenName", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });

      // Enviar la cookie en la respuesta y retornar información del usuario
      res.setHeader("Set-Cookie", serialized);
      return res.json({
        token, // Puedes enviar el token en la respuesta si lo necesitas en el cliente
        user: {
          email: "admin@email.com",
          username: "grupo19",
          // Otros datos del usuario que desees incluir
        },
      });
    } else {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = { loginCustomer };
