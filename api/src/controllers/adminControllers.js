const { Admin } = require("../db");


const createAdmin = async (admin) =>{
    try {
        const newAdmin = await Admin.create({
            name:admin.name,
            user: admin.user,
            password: admin.password,
            image: admin.image,
            email: admin.email,
            phone: admin.phone,
            user_banned: false,
            is_Active: true,
        });

        return newAdmin;
    } catch (error) {
        console.log("Hubo un error al crear el admin: " + error);
    }
};




module.exports = {
    createAdmin,
  };

