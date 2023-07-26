const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Admin',
    {
      id: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING,
        unique:true,
      },
      password: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },user_banned:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
      is_Active:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
      }
      ,      
    }, { timestamps: false });
};