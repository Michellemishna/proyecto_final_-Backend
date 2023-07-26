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
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
     },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shipping_address: {
        type: DataTypes.TEXT,
      },
      order_address: {
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
      },
      shopping: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      }
    },
    { timestamps: false }
  );
};