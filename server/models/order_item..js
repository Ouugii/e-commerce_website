"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
      this.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  OrderItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
      },
      unit_price: {
        type: DataTypes.BIGINT,
      },
      total_amount: {
        type: DataTypes.BIGINT,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "order_items",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return OrderItem;
};
