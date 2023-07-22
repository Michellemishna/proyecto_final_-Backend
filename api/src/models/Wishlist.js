const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    'Wishlist',
    {
        userId: {
          type: DataTypes.STRING,
        },
      },
      {
        timestamps: false,
    }
  );
};