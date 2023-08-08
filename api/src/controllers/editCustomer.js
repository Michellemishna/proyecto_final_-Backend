const { Customer } = require("../db");

const EditCustomer = async (input) => {
  const {
    id,
    nombre,
    contraseña,
    email,
    imagen,
    telefono,
    direccion,
    usuario,
  } = input;
  return input;
  // try {
  //   const customer = await Customer.findOne({ where: { id } });

  //   // Paso 2: Modificar las propiedades del objeto con los nuevos valores
  //   customer.name = nombre;
  //   customer.user = usuario;
  //   customer.password = contraseña;
  //   customer.image = imagen;
  //   customer.email = email;
  //   customer.phone = telefono;
  //   customer.default_shipping_address = direccion;

  //   await customer.save();
  // } catch (error) {
  //   console.log("Hubo un Editar al crear el usuario: " + error);
  // }
};

module.exports = {
  EditCustomer,
};
