const { DataTypes } = require("sequelize")

module.exports = buyModel = (sequelize) => {
	sequelize.define(
		"Cart",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			totalPrice: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isPositive(value) {
						if (value <= 0) {
							throw new Error("El precio total debe ser positivo.");
						}
					}
				},
			},
			purchaseDate: {
				type: DataTypes.DATE,
				allowNull: true,
				validate: {
					isDate: {
						msg: "La fecha de compra debe ser una fecha válida.",
					}
				}
			},
			current_state: {
				type: DataTypes.STRING,
				defaultValue: "Empty",
				allowNull: false,
			  },
		},
		{
			paranoid: true,
		}
	);
};