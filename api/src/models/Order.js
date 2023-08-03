const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      shipping_address: {
        type: DataTypes.TEXT,
      },
      order_email: {
        type: DataTypes.STRING,
      },
      order_date: {
        type: DataTypes.DATE,
      },
      order_status: {
        defaultValue: "pendiente",
        type: DataTypes.ENUM("realizada","cancelada", "pendiente"),
      }
      
    },
    { timestamps: false }
  );
};