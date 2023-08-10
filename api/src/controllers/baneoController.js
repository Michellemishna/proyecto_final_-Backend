const { Customer } = require("../db");

const banearUser = async (email) => {
  //console.log(email, password);
  try {
    const customer = await Customer.findOne({ where: { email } });
    customer.user_banned = customer.user_banned === false ? true : false;

    await customer.save();
    return customer;
  } catch (error) {
    console.log("Hubo un Editar al crear el usuario: " + error);
  }
  return email;
};

module.exports = { banearUser };
