"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    static associate(models) {
      //Define associations here if needed
      this.belongsToMany(models.Order, {
        through: models.OrderVoucher,
        foreignKey: "voucher_id",
        otherKey: "order_id",
        as: "orders",
      });
    }
  }

  Voucher.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      voucher_code: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      start_day: {
        type: DataTypes.DATE,
      },
      end_day: {
        type: DataTypes.DATE,
      },
      discount_amout: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      max_user: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      status: {
        type: DataTypes.ENUM("active", "expired", "pending"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Voucher",
      tableName: "vouchers",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Voucher;
};
