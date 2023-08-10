const { Customer } = require("../db");

const banearUser = async (email) => {
  //console.log(email, password);
  try {
    const customer = await Customer.findOne({ where: { email } });

    if (!customer) {
      console.log(`No se encontró ningún usuario con el email: ${email}`);
      return null;
    }

    customer.user_banned = !customer.user_banned; // Alternar el valor

    await customer.save();
    console.log(
      `Usuario baneado actualizado: ${customer.email}, user_banned: ${customer.user_banned}`
    );
    return customer;
  } catch (error) {
    console.log("Hubo un error al actualizar el estado del usuario:", error);
    return null;
  }
};

module.exports = { banearUser };
