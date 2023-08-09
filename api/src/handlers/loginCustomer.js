const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");
const { Customer } = require("../db");
//const { SECRET_TOKEN } = process.env;
// const brcypt = require("bcrypt");

const loginCustomer = async (req, res) => {
  const { password, email } = req.body;
  const search = await Customer.findOne({ where: { email, password } });
  try {
    if (search) {
      // const isPasswordValid = await brcypt.compare(password, search.password)

      // if (isPasswordValid) {
              // Autenticación exitosa, generar el token JWT
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // Expiración en 30 días
          email: search.email,
          nombre: search.name,
          usuario: search.user,
          imagen: search.image,
          telefono: search.phone,
          estado: search.user_banned,
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
          email: search.email,
          nombre: search.name,
          usuario: search.user,
          imagen: search.image,
          telefono: search.phone,
          estado: search.user_banned,
        },
      });
    // }
    } else {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = { loginCustomer };
