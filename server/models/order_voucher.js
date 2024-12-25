"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderVoucher extends Model {
    static associate(models) {
      // Define associations here if needed
      this.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
      this.belongsTo(models.Voucher, {
        foreignKey: "voucher_id",
        as: "voucher",
      });
    }
  }

  OrderVoucher.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      voucher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderVoucher",
      tableName: "order_vouchers",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return OrderVoucher;
};
