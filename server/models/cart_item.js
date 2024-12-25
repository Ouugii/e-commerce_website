"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      this.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        as: "cart",
      });

      this.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  CartItem.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      unit_price: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "CartItem",
      tableName: "cart_items",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return CartItem;
};
