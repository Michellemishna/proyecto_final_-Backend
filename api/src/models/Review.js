const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    'Review',
    {
      comment: {
        type: DataTypes.TEXT,
      },
      calification: {
        type: DataTypes.STRING,
      },
      customerId: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};