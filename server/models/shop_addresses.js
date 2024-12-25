"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ShopAddress extends Model {
    static associate(models) {
      // Define associations here if needed
      this.belongsTo(models.Shop, {
        foreignKey: "shop_id",
        as: "shop",
      });
      this.belongsTo(models.Ward, {
        foreignKey: "ward_code",
        as: "ward",
      });

      this.hasMany(models.Order, {
        foreignKey: "shop_address_id",
        as: "orders",
      });
    }
  }

  ShopAddress.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      shop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ward_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "ShopAddress",
      tableName: "shop_addresses",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return ShopAddress;
};
