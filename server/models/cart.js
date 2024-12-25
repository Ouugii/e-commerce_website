"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "customer_id",
        as: "user",
      });

      this.hasMany(models.CartItem, {
        foreignKey: "cart_id",
        as: "items",
      });
    }
  }

  Cart.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.BIGINT.UNSIGNED,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("active", "checked_out"),
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Cart;
};
